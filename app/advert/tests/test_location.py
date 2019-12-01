from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from core.tests.helpers import sample_location

LOCATIONS_URL = reverse('locations')


class PublicLocationsAPITests(TestCase):
    """Test the locations API (unauthenticated users)"""

    def setUp(self):
        self.client = APIClient()

    def test_list_all_locations(self):
        """Test listing all available locations"""
        sample_location(name='TestLocation_1')
        sample_location(name='TestLocation_2')
        res = self.client.get(LOCATIONS_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_list_categories_format(self):
        """Test listing all locations returns id, name and url"""
        sample_location(name='TestLocation_1')
        sample_location(name='TestLocation_2')
        res = self.client.get(LOCATIONS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        for result in res.data:
            self.assertIn('id', result)
            self.assertIn('name', result)
            self.assertIn('url', result)
