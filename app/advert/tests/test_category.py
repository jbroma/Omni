from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from core.tests.helpers import sample_category


CATEGORIES_URL = reverse('categories')


def sample_category_tree():
    """Create a category tree with nested categories"""
    cat_top_1 = sample_category(name='TestCategory_1')
    cat_top_2 = sample_category(name='TestCategory_2')
    cat_mid_1_1 = sample_category(name='TestCategory_1_1', parent=cat_top_1)
    sample_category(name='TestCategory_1_2', parent=cat_top_1)
    sample_category(name='TestCategory_1_3', parent=cat_top_1)
    cat_mid_2_1 = sample_category(name='TestCategory_2_1', parent=cat_top_2)
    sample_category(name='TestCategory_1_1_1', parent=cat_mid_1_1)
    sample_category(name='TestCategory_2_1_1', parent=cat_mid_2_1)


class PublicCategoryAPITests(TestCase):
    """Test the category API (unauthenticated users)"""

    def setUp(self):
        self.client = APIClient()

    def test_list_all_categories(self):
        """Test listing all available categories"""
        sample_category(name='TestCategory_1')
        sample_category(name='TestCategory_2')
        res = self.client.get(CATEGORIES_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_list_categories_nested(self):
        """Test listing all categories including nested ones"""
        sample_category_tree()
        res = self.client.get(CATEGORIES_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)
        self.assertEqual(len(res.data[0]['subcategories']), 3)
        self.assertEqual(len(res.data[1]['subcategories']), 1)

        subcategories_1 = res.data[0]['subcategories']
        subcategories_2 = res.data[1]['subcategories']
        self.assertEqual(len(subcategories_1[0]['subcategories']), 1)
        self.assertEqual(len(subcategories_2[0]['subcategories']), 1)

    def test_list_categories_format(self):
        """Test listed categories should have id,name and url"""
        sample_category(name='TestCategory_1')
        res = self.client.get(CATEGORIES_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('id', res.data[0])
        self.assertIn('name', res.data[0])
        self.assertIn('url', res.data[0])
