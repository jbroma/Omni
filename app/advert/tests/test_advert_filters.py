from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from core.tests.helpers import (
    sample_location, sample_category,
    sample_user, sample_ad_with_images
)


ADVERTS_URL = reverse('advert:advert-list')


class AdvertPriceFilterTests(TestCase):
    """Test the advert search API - price filters"""

    def setUp(self):
        self.client = APIClient()

        sample_ad_with_images(title='Test_1', price=3.50)
        sample_ad_with_images(title='Test_2', price=5.50)
        sample_ad_with_images(title='Test_3', price=2.50)

    def test_filter_price_gte(self):
        """Test filter ads by price greater or equal"""
        filtered_price = 3.50
        search_url = f'{ADVERTS_URL}?price__gte={filtered_price}'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)
        for result in res.data:
            self.assertGreaterEqual(float(result['price']), filtered_price)

    def test_filter_price_lte(self):
        """Test filter ads by price lower or equal"""
        filtered_price = 3.50
        search_url = f'{ADVERTS_URL}?price__lte={filtered_price}'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)
        for result in res.data:
            self.assertLessEqual(float(result['price']), filtered_price)

    def test_filter_price_range(self):
        """Test filter ads between price range"""
        lte_price = 4.00
        gte_price = 2.60
        search_url = f'{ADVERTS_URL}' \
            f'?price__lte={lte_price}' \
            f'&price__gte={gte_price}'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertLessEqual(float(res.data[0]['price']), lte_price)
        self.assertGreaterEqual(float(res.data[0]['price']), gte_price)


class AdvertCategoryFilterTests(TestCase):
    """Test the advert search API - category filters"""

    def setUp(self):
        self.client = APIClient()

        self.category_1 = sample_category(name='Test_Category_1')
        self.category_2 = sample_category(name='Test_Category_2')
        self.category_3 = sample_category(
            name='Test_Category_3', parent=self.category_2
        )
        self.category_4 = sample_category(
            name='Test_Category_4', parent=self.category_3
        )

        sample_ad_with_images(title='Test_1', category=self.category_1)
        sample_ad_with_images(title='Test_2', category=self.category_2)
        sample_ad_with_images(title='Test_3', category=self.category_3)
        sample_ad_with_images(title='Test_3', category=self.category_4)

    def test_filter_category_no_children(self):
        """Test filtering ads by category which has no child categories"""
        category_id = self.category_1.id
        search_url = f'{ADVERTS_URL}?category={category_id}'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data[0]['category'], category_id)

    def test_filter_category_children(self):
        """Test filtering ads by category should include child categories"""
        category_id = self.category_2.id
        search_url = f'{ADVERTS_URL}?category={category_id}'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 3)


class AdvertUserFilterTests(TestCase):
    """Test the advert search API - user filter"""

    def setUp(self):
        self.client = APIClient()

        self.user = sample_user(email='test_1@comapny.com')
        self.user_2 = sample_user(email='test_2@company.com')

        sample_ad_with_images(user=self.user, title='Test_1')
        sample_ad_with_images(user=self.user_2, title='Test_2')
        sample_ad_with_images(user=self.user, title='Test_3')

    def test_filter_user(self):
        """Test filtering ads by user whose ad it is"""
        user_id = self.user.id
        search_url = f'{ADVERTS_URL}?user={user_id}'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)


class AdvertTitleFilterTests(TestCase):
    """Test the advert search API - title filter"""

    def setUp(self):
        self.client = APIClient()

        self.ad_1, _ = sample_ad_with_images(title='Test_1')
        self.ad_2, _ = sample_ad_with_images(title='Test_2')
        self.ad_3, _ = sample_ad_with_images(title='Test_3')

    def test_filter_title_exact_match(self):
        """Test filtering ads by title, with an exact match"""
        title = self.ad_1.title
        search_url = f'{ADVERTS_URL}?title={title}'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['title'], title)

    def test_filter_title_inexact_match(self):
        """Test filtering ads by title, providing only part of a title"""
        title = 'Test'
        search_url = f'{ADVERTS_URL}?title={title}'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 3)
        for advert in res.data:
            self.assertIn(title, advert['title'])

    def test_filter_title_case_insensitive(self):
        """Test filtering ads by title is case-insensitive"""
        title = 'test'
        search_url = f'{ADVERTS_URL}?title={title}'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 3)
        for advert in res.data:
            self.assertIn(title, advert['title'].lower())


class AdvertLocationFilterTests(TestCase):
    """Test the advert search API - location filter"""

    def setUp(self):
        self.client = APIClient()

        self.location_1 = sample_location(name='New York')
        self.location_2 = sample_location(name='Chicago')
        self.location_3 = sample_location(name='New Orlean')

        sample_ad_with_images(title='Test_1', location=self.location_1)
        sample_ad_with_images(title='Test_2', location=self.location_2)
        sample_ad_with_images(title='Test_3', location=self.location_3)

    def test_filter_location_exact_match(self):
        """Test filtering ads by location, with an exact match"""
        location_name = self.location_1.name
        location_id = self.location_1.id
        search_url = f'{ADVERTS_URL}?location={location_name}'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(int(res.data[0]['location']), location_id)

    def test_filter_location_inexact_match(self):
        """Test filtering ads by location, providing only part of a location"""
        location_name = 'New'
        search_url = f'{ADVERTS_URL}?location={location_name}'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)

    def test_filter_location_case_insensitive(self):
        """Test filtering ads by location is case-insensitive"""
        location_name = 'new'
        search_url = f'{ADVERTS_URL}?location={location_name}'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)


class AdvertOrderingFilterTests(TestCase):
    """Test the advert search API - title filter"""

    def setUp(self):
        self.client = APIClient()

        sample_ad_with_images(title='Test_1', price=1.50)
        sample_ad_with_images(title='Test_2', price=15.00)
        sample_ad_with_images(title='Test_3', price=0.50)
        sample_ad_with_images(title='Test_4', price=5.00)
        sample_ad_with_images(title='Test_5', price=9.99)
        sample_ad_with_images(title='Test_6', price=1.99)

    def test_filter_ordering_price(self):
        """Test ordering ads by price(descending)"""
        search_url = f'{ADVERTS_URL}?ordering=-price'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 6)

        expected_sequence = [15.00, 9.99, 5.00, 1.99, 1.50, 0.50]
        for price, advert in zip(expected_sequence, res.data):
            self.assertEqual(price, float(advert['price']))

    def test_filter_ordering_date(self):
        """Test ordering ads by date(newest first)"""
        search_url = f'{ADVERTS_URL}?ordering=-date'

        res = self.client.get(search_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 6)

        expected_sequence = [
            'Test_6', 'Test_5', 'Test_4', 'Test_3', 'Test_2', 'Test_1'
        ]
        for title, advert in zip(expected_sequence, res.data):
            self.assertEqual(title, advert['title'])
