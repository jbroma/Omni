import uuid
import os

from django.apps import apps
from django.utils import timezone
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser, \
                                        BaseUserManager, \
                                        PermissionsMixin
from django.conf import settings

from django_cryptography.fields import encrypt

from .utils import EmailNotUniqueError


def advert_image_file_path(instance, filename):
    """Generate file path for a new ad image"""
    return image_file_path(instance, filename, 'advert')


def profile_image_file_path(instance, filename):
    """Generate file path for profile image"""
    return image_file_path(instance, filename, 'profile')


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
    email = models.EmailField(max_length=255)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=17, blank=True)
    address = models.CharField(max_length=255, blank=True)
    zipcode = models.CharField(max_length=6, blank=True)
    city = models.CharField(max_length=255, blank=True)
    picture = models.ImageField(upload_to=profile_image_file_path, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def delete(self, *args, **kwargs):
        """Remove personal data and associated adverts"""
        advert_qs = apps.get_model('core', 'Advert').objects.filter(user=self)
        for advert in advert_qs:
            advert.delete()

        self.email = ''
        self.name = f'user#{self.pk}'
        self.phone = ''
        self.address = ''
        self.zipcode = ''
        self.city = ''
        self.picture.delete()

        self.set_unusable_password()
        self.is_active = False

        self.save()


class Category(models.Model):
    """Category to be used to an advert"""
    name = models.CharField(max_length=255)
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
    title = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    content = models.TextField(max_length=10000)
    date_created = models.DateTimeField(default=timezone.now, editable=False)
    date_refreshed = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return f'AD#{self.pk}'


class AdvertImage(models.Model):
    """Images associated to an ad"""
    advert = models.ForeignKey(Advert, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=advert_image_file_path)

    def __str__(self):
        return os.path.basename(self.image.name)


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
    title = models.CharField(max_length=100, editable=False)
    last_updated = models.DateTimeField(default=timezone.now, editable=False)

    def __str__(self):
        return f'CONVERSATION#{self.pk}'


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
