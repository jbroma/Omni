from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db import connection

from core import models


def sample_user(email='test@company.com', password='test1234'):
    """Create a sample user"""
    return get_user_model().objects.create_user(email, password)


def sample_category(name='Nieruchomości'):
    """Create a sample category"""
    return models.Category.objects.create(name=name)


def sample_ad(user=None, title='Sprzedam Opla',
              category=None, price=1000.00, content='Nowy Opel na sprzedaz'):
    """Create a sample advert"""
    if not user:
        user = sample_user()
    if not category:
        category = sample_category()

    return models.Advert.objects.create(
        user=user,
        title=title,
        category=category,
        price=price,
        content=content
    )


def retrieve_msg_content(msg_id):
    with connection.cursor() as cursor:
        cursor.execute(
            'SELECT content '
            'FROM core_message '
            'WHERE id = %s',
            str(msg_id)
        )
        msg_content = cursor.fetchone()[0]

    return msg_content


class ModelTests(TestCase):

    def test_create_user_with_email_succesful(self):
        """Test creating a user with an email is succesful"""
        email = 'test123@corporate.com'
        password = 'TestPassword123'
        user = get_user_model().objects.create_user(
            email=email,
            password=password)

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test the email for a new user is normalized"""
        email = 'test@UPPERCASEDOMAIN.COM'
        user = get_user_model().objects.create_user(email, 'test123')

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test creating user with no email raises error"""
        with self.assertRaises(ValueError):
            email = None
            get_user_model().objects.create_user(email, 'test123')

    def test_create_new_superuser(self):
        """Test creating a super user is succesful"""
        email = 'test@company.com'
        user = get_user_model().objects.create_superuser(email, 'test123')

        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

    def test_category_str(self):
        """Test the category string representation"""
        category = models.Category.objects.create(
            name='Elektronika'
        )

        self.assertEqual(str(category), category.name)

    # def test_advert_image_str(self):
    #     """Test the advert image string representation"""
    #     image = models.AdvertImage.objects.create(
    #         #TODO
    #         #Need to create sample image for this to work...
    #     )

    def test_message_str(self):
        """Test the message string representation"""
        user1 = sample_user(email='test1@company.com')
        user2 = sample_user(email='test2@company.com')
        advert = sample_ad(user=user1)
        msg = models.Message.objects.create(
            sender=user1,
            recipient=user2,
            advert=advert,
            content='abcd'
        )

        self.assertEqual(str(msg), f'MSG#{msg.pk}')

    def test_message_encrypted(self):
        """Test that message content is stored encrypted in the DB"""
        msg_content = 'Nie oddam Panu Opla'
        user1 = sample_user(email='test1@company.com')
        user2 = sample_user(email='test2@company.com')
        advert = sample_ad(user=user1)
        msg = models.Message.objects.create(
            sender=user1,
            recipient=user2,
            advert=advert,
            content=msg_content
        )

        # raw query to extract msg content from a given message
        msg_encrypted_db = retrieve_msg_content(msg.id)
        self.assertFalse(isinstance(msg_encrypted_db, str))
        self.assertNotEqual(msg_encrypted_db.tobytes(), msg.content)

        msg_decrypted_db = models.Message.objects.get(pk=msg.id)

        self.assertEqual(msg_decrypted_db.content, msg.content)
