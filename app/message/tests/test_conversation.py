from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.db.models import Q
from django.utils.dateparse import parse_datetime

from rest_framework.test import APIClient
from rest_framework import status

from core.models import Conversation
from core.tests.helpers import sample_conversation, sample_message, \
    sample_user, sample_ad

from message.serializers import ConversationsSerializer


CONVERSATIONS_URL = reverse('message:conversation-list')


def conversation_detail_url(conversation_id):
    return reverse('message:conversation-detail', args=[conversation_id])


class PublicConversationsApiTests(TestCase):
    """Test the conversation public API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        res = self.client.get(CONVERSATIONS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateConversationsApiTests(TestCase):
    """Test the conversation API for authorized users"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email='test@company.com',
            password='RandomPass123$',
            name='Conversation Starter'
        )
        self.client.force_authenticate(self.user)

        user_2 = sample_user(email='user2@test.com')
        ad = sample_ad(self.user)
        self.conversation = sample_conversation(self.user, user_2, ad)
        self.messages = [
            sample_message(self.user, self.conversation),
            sample_message(user_2, self.conversation),
            sample_message(self.user, self.conversation)
        ]

    def test_list_all_conversations(self):
        """Test listing all user's conversations"""
        res = self.client.get(CONVERSATIONS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)

    def test_list_conversations_only_own(self):
        """
        Test that listing conversations returns only ones where user is
        involved and not conversations of other users.
        """
        user_1 = sample_user(email='test_user1@test.com')
        user_2 = sample_user(email='test_user2@test.com')
        ad = sample_ad(user_1)
        conversation = sample_conversation(user_1, user_2, ad)
        sample_message(user_1, conversation)
        sample_message(user_2, conversation)
        sample_message(user_1, conversation)

        res = self.client.get(CONVERSATIONS_URL)
        user_conversations = Conversation.objects.filter(
            Q(user_1=self.user) | Q(user_2=self.user)
        )
        serializer = ConversationsSerializer(user_conversations, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data, serializer.data)

    def test_list_conversations_owner_and_customer(self):
        """
        Test that listing conversations returns all conversations where
        user performs the role of an ad-owner and customer
        """
        user_1 = sample_user(email='test_user1@test.com')
        ad = sample_ad(user_1)
        conversation = sample_conversation(user_1, self.user, ad)
        sample_message(user_1, conversation)
        sample_message(self.user, conversation)
        sample_message(user_1, conversation)

        res = self.client.get(CONVERSATIONS_URL)
        user_conversations = Conversation.objects \
            .filter(Q(user_1=self.user) | Q(user_2=self.user)) \
            .order_by('-last_updated')
        serializer = ConversationsSerializer(user_conversations, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)
        self.assertEqual(res.data, serializer.data)

    def test_list_conversations_sorted_by_newest(self):
        """
        Test that listed conversations returns list that is sorted by
        newest conversations first
        """
        user_1 = sample_user(email='test_user1@test.com')
        ad = sample_ad(user_1)
        conversation = sample_conversation(user_1, self.user, ad)
        sample_message(user_1, conversation)
        sample_message(self.user, conversation)
        sample_message(user_1, conversation)

        res = self.client.get(CONVERSATIONS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)

        newer_date = parse_datetime(res.data[0]['last_updated'])
        older_date = parse_datetime(res.data[1]['last_updated'])
        self.assertGreater(newer_date, older_date)

    def test_retrieve_conversation(self):
        """Test that user can retrieve specific conversation"""
        res = self.client.get(conversation_detail_url(self.conversation.id))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['messages']), 3)

    def test_retrieve_conversation_only_own(self):
        """Test that user can't retrieve conversation of other users"""
        user_1 = sample_user(email='test_user1@test.com')
        user_2 = sample_user(email='test_user2@test.com')
        ad = sample_ad(user_1)
        conversation = sample_conversation(user_1, user_2, ad)
        sample_message(user_1, conversation)
        sample_message(user_2, conversation)
        sample_message(user_1, conversation)

        res = self.client.get(conversation_detail_url(conversation.id))
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

        user_2_client = APIClient()
        user_2_client.force_authenticate(user_2)

        res_user_2 = user_2_client.get(
            conversation_detail_url(conversation.id)
        )
        self.assertEqual(res_user_2.status_code, status.HTTP_200_OK)

    def test_retrieve_conversation_messages_sorted(self):
        """Test that messages within conversation are sorted oldest-first"""
        res = self.client.get(conversation_detail_url(self.conversation.id))

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        msg_1_date = parse_datetime(res.data['messages'][0]['date'])
        msg_2_date = parse_datetime(res.data['messages'][1]['date'])
        msg_3_date = parse_datetime(res.data['messages'][2]['date'])

        self.assertLess(msg_1_date, msg_2_date)
        self.assertLess(msg_1_date, msg_3_date)
        self.assertLess(msg_2_date, msg_3_date)
