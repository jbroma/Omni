from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from pytz import timezone as TZone
from core.models import Location

CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
PROFILE_URL = reverse('user:profile')
PASS_URL = reverse('user:password')


def create_user(**kwargs):
    return get_user_model().objects.create_user(**kwargs)


class PublicUserApiTests(TestCase):
    """Test the users API (unauthenticated users)"""

    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """Test creating user with valid payload is successful"""
        payload = {
            'email': 'test@company.com',
            'password': 'SuperRandomTest1234%',
            'confirm_password': 'SuperRandomTest1234%',
            'name': 'Doug Kempinsky'
        }
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        res.data.pop('picture')
        user = get_user_model().objects.get(**res.data)
        # this will fail because UserSerializer cant set passwords.....
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', res.data)

    def test_email_required(self):
        """Test creating user without email should fail"""
        payload = {
            'email': '',
            'password': 'SuperRandomTest1234%',
            'confirm_password': 'SuperRandomTest1234%',
            'name': 'Doug Kempinsky'
        }
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_exists(self):
        """Test creating user that already exists should fail"""
        payload = {
            'email': 'test@company.com',
            'password': 'SuperRandomTest1234%',
            'confirm_password': 'SuperRandomTest1234%',
            'name': 'Doug Kempinsky'
        }
        create_user(
            email='test@company.com',
            password='SuperRandomTest1234%'
        )
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short(self):
        """Test that the password must be at least 8 characters long"""
        payload = {
            'email': 'test@company.com',
            'password': 'Sxd123$',
            'confirm_password': 'Sxd123$',
            'name': 'Doug Kempinsky'
        }
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = get_user_model().objects.filter(
            email=payload['email']
        ).exists()
        self.assertFalse(user_exists)

    def test_create_token_for_user(self):
        """Test that the token is created for the user"""
        payload = {
            'email': 'test@company.com',
            'password': 'test1234'
        }
        create_user(**payload)
        res = self.client.post(TOKEN_URL, payload)

        self.assertIn('token', res.data)
        self.assertIn('user_id', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_invalid_credentials(self):
        """Test that token is not created if invalid credentials are given"""
        create_user(email='test@company.com', password='test1234')
        payload = {
            'email': 'test@company.com',
            'password': 'wrongpass'
        }
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_no_user(self):
        """Test that token is not created if user doesn't exist"""
        payload = {
            'email': 'test@company.com',
            'password': 'test1234'
        }
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_missing_field(self):
        """Test that both email and password are required"""
        create_user(email='test@company.com', password='test1234')
        payload = {
            'email': 'test@company.com',
            'password': ''
        }
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_user_deactivated(self):
        """Test that token is not created for inactive user"""
        user = create_user(email='test@company.com', password='test1234')
        get_user_model().objects.deactivate(user)
        payload = {
            'email': 'test@company.com',
            'password': 'test1234'
        }
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_user_unauthorized(self):
        """Test that authentication is required for users"""
        res = self.client.get(PROFILE_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserApiTests(TestCase):
    """Test API requests that require authentication"""

    def setUp(self):
        self.user = create_user(
            email='test@company.com',
            password='Pass#215',
            name='Doug Kempinsky'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_profile_success(self):
        """Test retrieving profile for logged in user"""
        res = self.client.get(PROFILE_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertDictEqual(res.data, {
            'id': self.user.id,
            'name': self.user.name,
            'email': self.user.email,
            'phone': '',
            'location': None,
            'picture': None,
            'date_created': self.user.date_created
                .astimezone(tz=TZone('Europe/London'))
                .isoformat(),
        })

    def test_post_profile_not_allowed(self):
        """Test that POST request is not allowed on the profile url"""
        res = self.client.post(PROFILE_URL)
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_user_profile(self):
        """Test that updating the profile for authorized user is successful"""
        location_name = 'Test Location'
        location = Location.objects.create(name=location_name)
        payload = {
            'phone': '+447701900774',
            'location': location.id
        }
        res = self.client.patch(PROFILE_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        self.user.refresh_from_db()
        self.assertEqual(self.user.phone, '+447701900774')
        self.assertEqual(self.user.location, location)

    def test_update_user_profile_disabled_fields(self):
        """
        Test user can't change email, name or password via PROFILE endpoint
        """
        location_name = 'Test Location'
        location = Location.objects.create(name=location_name)
        payload = {
            'name': 'Andrew Kempinsky',
            'password': 'test1234',
            'location': location.id,
            'email': 'other_test@company.com'
        }
        res = self.client.patch(PROFILE_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        self.user.refresh_from_db()
        self.assertFalse(self.user.check_password('test1234'))
        self.assertNotEqual(self.user.name, 'Andrew Kempinsky')
        self.assertNotEqual(self.user.email, 'other_test@company.com')
        self.assertEqual(self.user.location, location)

    def test_change_user_password(self):
        """Test that user can change his password"""
        payload = {
            'old_password': 'Pass#215',
            'new_password_1': 'SuperRandomTest1234%',
            'new_password_2': 'SuperRandomTest1234%'
        }
        res = self.client.patch(PASS_URL, payload)

        self.user.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(self.user.check_password(payload['new_password_1']))

    def test_change_password_old_invalid(self):
        """Test that old password must match before changing password"""
        payload = {
            'old_password': 'wrongoldpassword',
            'new_password_1': 'SuperRandomTest1234%',
            'new_password_2': 'SuperRandomTest1234%'
        }
        res = self.client.patch(PASS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_change_password_different_new(self):
        """Test that new password and confirmation are the same"""
        payload = {
            'old_password': 'Pass#215',
            'new_password_1': 'SuperRandomWrong1234%',
            'new_password_2': 'SuperRandomTest1234%'
        }
        res = self.client.patch(PASS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_user(self):
        """
        Test that user can delete his account. Deletion should be equal to
        account deactivation and removal of personal data associated with it
        """
        payload = {
            'password': 'Pass#215',
            'confirm_password': 'Pass#215'
        }
        res = self.client.delete(PROFILE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

        self.user.refresh_from_db()
        self.assertFalse(self.user.is_active)
        self.assertNotEqual(self.user.name, 'Doug Kempinsky')
        self.assertNotEqual(self.user.email, 'test@company.com')
