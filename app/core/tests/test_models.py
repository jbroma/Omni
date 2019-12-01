import os

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db import connection

from core import models
from core.tests.helpers import (
    sample_user, sample_ad, sample_conversation, sample_image
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

    def test_location_str(self):
        """Test the location string representation"""
        location_name = 'Wrocław'
        location = models.Location.objects.create(name=location_name)

        self.assertEqual(str(location), location_name)

    def test_category_str(self):
        """Test the category string representation"""
        category_name = 'Elektronika'
        category = models.Category.objects.create(name=category_name)

        self.assertEqual(str(category), category.name)

    def test_advert_image_str(self):
        """Test the advert image string representation"""
        image = sample_image()

        self.assertEqual(str(image), os.path.basename(image.image.path))

    def test_advert_image_thumbnail(self):
        """Test thumbnail is created on creation of an image object"""
        image = sample_image()

        self.assertIsNotNone(image.thumbnail)

    def test_conversation_str(self):
        """Test the conversation string representation"""
        advert = sample_ad(title='Example Title')
        conversation = sample_conversation(advert.user, ad=advert)

        self.assertEqual(str(conversation), f'CONVERSATION#{conversation.id}')

    def test_conversation_title_created(self):
        """Test that conversation title is set on creation"""
        advert = sample_ad(title='Example Title')
        conversation = sample_conversation(advert.user, ad=advert)

        self.assertEqual(conversation.title, advert.title)

    def test_conversation_title_updated(self):
        """Test that conversation title is updated after ad title changes"""
        advert = sample_ad(title='Example Title')
        conversation = sample_conversation(advert.user, ad=advert)

        advert.title = 'Changed Title'
        advert.save()
        conversation.refresh_from_db()

        self.assertEqual(conversation.title, advert.title)

    def test_message_str(self):
        """Test the message string representation"""
        user1 = sample_user(email='test1@company.com')
        user2 = sample_user(email='test2@company.com')
        advert = sample_ad(user=user1)
        conversation = sample_conversation(user1, user2, advert)
        msg = models.Message.objects.create(
            sender=user1,
            conversation=conversation,
            content='abcd'
        )

        self.assertEqual(str(msg), f'MSG#{msg.pk}')

    def test_message_encrypted(self):
        """Test that message content is stored encrypted in the DB"""
        msg_content = 'Nie oddam Panu Opla'
        user1 = sample_user(email='test1@company.com')
        user2 = sample_user(email='test2@company.com')
        advert = sample_ad(user=user1)
        conversation = sample_conversation(user1, user2, advert)
        msg = models.Message.objects.create(
            sender=user1,
            conversation=conversation,
            content=msg_content
        )

        # raw query to extract msg content from a given message
        msg_encrypted_db = retrieve_msg_content(msg.id)
        self.assertFalse(isinstance(msg_encrypted_db, str))
        self.assertNotEqual(msg_encrypted_db.tobytes(), msg.content)

        msg_decrypted_db = models.Message.objects.get(pk=msg.id)

        self.assertEqual(msg_decrypted_db.content, msg.content)
