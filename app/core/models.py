import uuid
import os

from django.utils import timezone
from django.conf import settings
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

from django_cryptography.fields import encrypt

from phonenumber_field.modelfields import PhoneNumberField

from core.utils import EmailNotUniqueError, make_thumbnail
from core.signals import TITLE_CHANGED, USER_DELETED


def advert_image_file_path(instance, filename):
    """Generate file path for a new ad image"""
    return image_file_path(instance, filename, 'advert')


def profile_image_file_path(instance, filename):
    """Generate file path for profile image"""
    return image_file_path(instance, filename, 'profile')


def advert_thumbnail_file_path(instance, filename):
    """Generate file path for a thumbnail of an advert image"""
    return image_file_path(instance, filename, 'thumbnails')


def image_file_path(instance, filename, subdir):
    """Generate file path for a new image"""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'
    return os.path.join(f'uploads/{subdir}/', filename)


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError('Users must have an email address')

        # normalize first, then check for uniqueness
        norm_email = self.normalize_email(email)
        if get_user_model().objects.filter(email=norm_email):
            raise EmailNotUniqueError(
                "This e-mail is already in use by another user"
            )

        user = self.model(email=norm_email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, **extra_fields):
        """Creates and saves a new super user"""
        super_user = self.create_user(email, password, **extra_fields)
        super_user.is_staff = True
        super_user.is_superuser = True
        super_user.save(using=self._db)

        return super_user

    def deactivate(self, user):
        """Deactivates the specified user"""
        user.is_active = False
        user.save()

    def activate(self, user):
        """Activates the specified user"""
        user.is_active = True
        user.save()


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports emails instead of username"""
    email = models.EmailField()
    name = models.CharField(max_length=255)
    phone = PhoneNumberField(blank=True)
    location = models.ForeignKey(
        'Location', on_delete=models.PROTECT, null=True, blank=True
    )
    picture = models.ImageField(upload_to=profile_image_file_path, blank=True)
    date_created = models.DateTimeField(default=timezone.now, editable=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def delete(self, *args, **kwargs):
        """Remove personal data and send signal for other models"""
        self.email = ''
        self.name = f'user#{self.pk}'
        self.phone = ''
        self.location = None
        self.picture.delete()

        self.set_unusable_password()
        self.is_active = False

        USER_DELETED.send(self)
        self.save()


class Location(models.Model):
    """Location object"""
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Category(models.Model):
    """Category object to be used to an advert"""
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True
    )

    def __str__(self):
        return self.name


class Advert(models.Model):
    """Advertisment object"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT
    )
    title = models.CharField(max_length=60)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=11, decimal_places=2)
    phone = PhoneNumberField()
    location = models.ForeignKey(Location, on_delete=models.PROTECT)
    content = models.TextField(max_length=10000)
    date_created = models.DateTimeField(default=timezone.now, editable=False)
    date_refreshed = models.DateTimeField(default=timezone.now, editable=False)

    __original_title = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__original_title = self.title

    def __str__(self):
        return f'AD#{self.pk}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.__original_title != self.title:
            TITLE_CHANGED.send(self, new_title=self.title)


class AdvertImage(models.Model):
    """Images associated to an ad"""
    image = models.ImageField(upload_to=advert_image_file_path)
    thumbnail = models.ImageField(upload_to='', editable=False, default=None)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        make_thumbnail(self.thumbnail, self.image, (200, 200), 'thumb')
        super().save(force_update=True, using='default')

    def __str__(self):
        return os.path.basename(self.image.name)


class AdvertImageLink(models.Model):
    """Link between AdvertImage and Advert"""
    advert = models.ForeignKey(Advert, on_delete=models.CASCADE)
    image = models.ForeignKey(AdvertImage, on_delete=models.CASCADE)
    slot = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = ('advert', 'slot',)

    def __str__(self):
        return f'ImageLink:{self.advert}:{self.slot}'


class Conversation(models.Model):
    """Conversation object"""
    user_1 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='owner'
    )
    user_2 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='customer'
    )
    advert = models.ForeignKey(Advert, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=60, editable=False)
    last_updated = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return f'CONVERSATION#{self.pk}'

    def save(self, *args, **kwargs):
        if self.advert is not None:
            self.title = self.advert.title
        super().save(*args, **kwargs)


class Message(models.Model):
    """Message object"""
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='sender'
    )
    date = models.DateTimeField(default=timezone.now, editable=False)
    content = encrypt(models.TextField(max_length=10000))
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name='messages'
    )

    def __str__(self):
        return f'MSG#{self.pk}'

    class Meta:
        ordering = ['date']
