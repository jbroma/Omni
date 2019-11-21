from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from core.tests.helpers import sample_conversation, sample_message, \
    sample_user, sample_ad


MESSAGE_URL = reverse('message:new_message')


class PublicMessageApiTests(TestCase):
    """Test the message public API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        res = self.client.get(MESSAGE_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateMessageApiTests(TestCase):
    """Test the message API for authorized users"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email='test@company.com',
            password='RandomPass123$',
            name='Conversation Starter'
        )
        self.client.force_authenticate(self.user)

        self.user_2 = sample_user(email='user2@test.com')
        self.ad = sample_ad(self.user)
        self.conversation = sample_conversation(
            self.user, self.user_2, self.ad
        )
        self.messages = [
            sample_message(self.user, self.conversation),
            sample_message(self.user_2, self.conversation),
            sample_message(self.user, self.conversation)
        ]

    def test_create_new_message_conversation_success(self):
        """Test that user can send a message to an existing conversation"""
        payload = {
            'conversation': self.conversation.id,
            'content': 'example content'
        }
        res = self.client.post(MESSAGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['content'], payload['content'])

    def test_create_new_message_new_conversation_success(self):
        """Test user can send a message to a new conversation"""
        advert = sample_ad(self.user_2)
        payload = {
            'advert': advert.id,
            'content': 'Hi there!'
        }
        res = self.client.post(MESSAGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['content'], payload['content'])

    def test_new_message_conversation_or_advert_required(self):
        """Test user must provide an advert or conversation to post to"""
        payload = {
            'content': 'This wont work'
        }
        res = self.client.post(MESSAGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            res.data['non_field_errors'][0].code,
            'message_missing_data'
        )

    def test_new_message_content_required(self):
        """Test user can't send an empty message"""
        payload = {
            'conversation': self.conversation.id,
            'content': ''
        }
        res = self.client.post(MESSAGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(res.data['content'][0].code, 'blank')

    def test_new_message_send_to_self_disabled(self):
        """Test that user can't send a message to himself"""
        payload = {
            'advert': self.ad.id,
            'content': 'abcd'
        }
        res = self.client.post(MESSAGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(res.data['advert'][0].code, 'message_user_loop')

    def test_new_message_user_not_part_of_conversation(self):
        """Test that user can't send a message to other user's conversation"""
        user_3 = sample_user(email='test_user_3@company.com')
        advert = sample_ad(user_3)
        conversation = sample_conversation(
            user_3, self.user_2, advert
        )
        payload = {
            'conversation': conversation.id,
            'content': 'valid message'
        }
        res = self.client.post(MESSAGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            res.data['conversation'][0].code,
            'message_forbidden_conversation'
        )

    def test_new_message_non_existent_conversation(self):
        """Test that user can't post to a conversation that doesn't exist"""
        payload = {
            'conversation': self.conversation.id,
            'content': 'Non existing conversation'
        }
        self.conversation.delete()
        res = self.client.post(MESSAGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            res.data['conversation'][0].code,
            'does_not_exist'
        )

    def test_new_message_non_existent_advert(self):
        """Test user can't send message to owner of a non-existent advert"""
        payload = {
            'advert': self.ad.id,
            'content': 'example message'
        }
        self.ad.delete()
        res = self.client.post(MESSAGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(res.data['advert'][0].code, 'does_not_exist')

    def test_new_message_conversation_and_advert_in_payload(self):
        """
        Test including both conversation and advert in payload
        ignores advert and posts to conversation
        """
        advert = sample_ad(user=self.user_2)
        conversation = sample_conversation(self.user_2, self.user, advert)
        payload = {
            'advert': advert.id,
            'conversation': conversation.id,
            'content': 'example message'
        }
        res = self.client.post(MESSAGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
