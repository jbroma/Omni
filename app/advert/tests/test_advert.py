import tempfile

from datetime import timedelta

from PIL import Image

from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.utils.dateparse import parse_datetime

from rest_framework.test import APIClient
from rest_framework import status

from core.tests.helpers import (
    sample_ad, sample_location, sample_category,
    sample_user, sample_ad_with_images, sample_image
)
from core.models import Advert, AdvertImage, AdvertImageLink

from advert.serializers import (
    AdvertRetrieveSerializer, AdvertCreateUpdateSerializer
)


ADVERTS_URL = reverse('advert:advert-list')
OWNED_ADVERTS_URL = reverse('advert:advert-owned')
UPLOAD_IMAGE_ADVERT_URL = reverse('advert:image-list')


def advert_detail_url(advert_id):
    return reverse('advert:advert-detail', args=[advert_id])


def advert_refresh_url(advert_id):
    return reverse('advert:advert-refresh', args=[advert_id])


def upload_valid_test_image(client):
    """Upload a single image with provided APIClient"""
    url = UPLOAD_IMAGE_ADVERT_URL
    with tempfile.NamedTemporaryFile(suffix='.jpg') as ntf:
        img = Image.new('RGB', (300, 300))
        img.save(ntf, format='JPEG')
        ntf.seek(0)
        res = client.post(url, {'image': ntf}, format='multipart')

    return res


class PublicAdvertApiTests(TestCase):
    """Test the message public API"""

    def setUp(self):
        self.client = APIClient()

    def test_list_all_ads(self):
        """Test listing all ads"""
        sample_ad(title='Test1')
        sample_ad(title='Test2')
        sample_ad(title='Test3')
        res = self.client.get(ADVERTS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 3)

    def test_list_all_ads_default_order(self):
        """Test that listed ads are ordered by refreshed date by default"""
        sample_ad(title='Test1')
        sample_ad(title='Test2')
        sample_ad(title='Test3')
        res = self.client.get(ADVERTS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 3)

        newest = parse_datetime(res.data[0]['date_refreshed'])
        mid = parse_datetime(res.data[1]['date_refreshed'])
        oldest = parse_datetime(res.data[2]['date_refreshed'])

        self.assertGreater(newest, mid)
        self.assertGreater(newest, oldest)
        self.assertGreater(mid, oldest)

    def test_list_all_ads_thumbnails(self):
        """Test that listed ads contain thumbnail url"""
        _, ad_1_image_ids = sample_ad_with_images(title='Test1')
        _, ad_2_image_ids = sample_ad_with_images(title='Test2')
        _, ad_3_image_ids = sample_ad_with_images(title='Test3')

        res = self.client.get(ADVERTS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 3)

        main_thumbnail_ids = [
            ad_1_image_ids[0], ad_2_image_ids[0], ad_3_image_ids[0]
        ]

        thumbnails = AdvertImage.objects.filter(id__in=main_thumbnail_ids)
        thumbnails_urls = [
            f'http://testserver{img.thumbnail.url}' for img in thumbnails
        ]

        for entry in res.data:
            self.assertIn(entry['thumbnail'], thumbnails_urls)

    def test_retrieve_specific_ad(self):
        """Test retrieving a specified ad"""
        advert = sample_ad()
        res = self.client.get(advert_detail_url(advert.id))
        serializer = AdvertRetrieveSerializer(advert)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_disallowed(self):
        """Test that unauthenticated users cant make new ads"""
        category = sample_category()
        location = sample_location()
        payload = {
            'title': 'AdTitle',
            'category': category.id,
            'price': 10.50,
            'location': location.id,
            'content': 'Example Advert Content',
        }
        res = self.client.post(ADVERTS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_disallowed(self):
        """Test that unauthenticated users cant update any ads"""
        advert = sample_ad()
        payload = {
            'title': 'NewTitle'
        }
        res = self.client.patch(advert_detail_url(advert.id), payload)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_destory_disallowed(self):
        """Test that unauthenticated users cant delete any ads"""
        advert = sample_ad()
        res = self.client.delete(advert_detail_url(advert.id))

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateAdvertApiTests(TestCase):
    """Test the message API for authorized users"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email='advert_test@company.com',
            password='RandomPass123$',
            name='Conversation Starter'
        )
        self.client.force_authenticate(self.user)

    def test_list_owned_ads(self):
        """Test listing ads owned by user is succesful"""
        user_2 = sample_user()
        sample_ad(user=self.user)
        sample_ad(user=self.user)
        sample_ad(user=user_2)

        res = self.client.get(OWNED_ADVERTS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)

    def test_list_owned_ads_ordered(self):
        """Test listing owned ads returns them ordered by refreshed date"""
        user_2 = sample_user()
        sample_ad(user=self.user)
        sample_ad(user=self.user)
        sample_ad(user=user_2)

        res = self.client.get(OWNED_ADVERTS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)

        newest = parse_datetime(res.data[0]['date_refreshed'])
        oldest = parse_datetime(res.data[1]['date_refreshed'])

        self.assertGreater(newest, oldest)

    def test_upload_image_success(self):
        """Test that user can upload an image"""
        res = upload_valid_test_image(self.client)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', res.data)
        self.assertIn('image', res.data)

    def test_upload_image_thumbnail(self):
        """Test that for every upload image, thumbnail is generated"""
        res = upload_valid_test_image(self.client)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIn('thumbnail', res.data)

    def test_create_new_advert(self):
        """Test creating basic Advert"""
        category = sample_category()
        location = sample_location()
        payload = {
            'title': 'AdTitle',
            'category': category.id,
            'price': 10.50,
            'location': location.id,
            'content': 'Example Advert Content',
        }
        res = self.client.post(ADVERTS_URL, payload)
        new_advert = Advert.objects.get(id=res.data['id'])

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        payload['category'] = category
        payload['location'] = location

        for key in payload.keys():
            self.assertEqual(payload[key], getattr(new_advert, key))

        new_advert.title = 'Changed Title'
        new_advert.save()

    def test_create_advert_with_images(self):
        """Test creating advert with images attached"""
        category = sample_category()
        location = sample_location()
        image_1 = upload_valid_test_image(self.client).data
        image_2 = upload_valid_test_image(self.client).data
        payload = {
            'title': 'AdTitle',
            'category': category.id,
            'price': 10.50,
            'location': location.id,
            'content': 'Example Advert Content',
            'images': [image_1['id'], image_2['id']]
        }
        res = self.client.post(ADVERTS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        new_advert = Advert.objects.get(id=res.data['id'])
        new_advert_images = AdvertImage.objects.filter(
            advertimagelink__advert=new_advert
        )

        payload_images = payload.pop('images')
        payload['category'] = category
        payload['location'] = location
        for key in payload.keys():
            self.assertEqual(payload[key], getattr(new_advert, key))

        for advert_image in new_advert_images:
            self.assertIn(advert_image.id, payload_images)

    def test_update_advert(self):
        """Test updating simple advert with no images"""
        advert = sample_ad(user=self.user)
        payload = {
            'title': 'Updated Title',
            'price': 555.55,
        }

        res = self.client.patch(advert_detail_url(advert.id), payload)
        old_title = advert.title
        old_price = advert.price

        advert.refresh_from_db()
        serializer = AdvertCreateUpdateSerializer(advert)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertNotEqual(advert.title, old_title)
        self.assertNotEqual(advert.price, old_price)

        self.assertEqual(res.data, serializer.data)

    def test_update_advert_invalid_payload(self):
        """Test updating advert with invalid payload"""
        advert = sample_ad(user=self.user)
        payload = {
            'title': 'Updated Title',
            'category': 9999
        }

        res = self.client.patch(advert_detail_url(advert.id), payload)
        old_title = advert.title

        advert.refresh_from_db()

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(res.data['category'][0].code, 'does_not_exist')
        self.assertEqual(advert.title, old_title)

    def test_update_advert_with_images(self):
        """Test updating an advert with images"""
        advert, _ = sample_ad_with_images(user=self.user)
        new_image_1 = sample_image()
        new_image_2 = sample_image()

        payload = {
            'title': 'New Title',
            'images': [new_image_1.id, new_image_2.id]
        }

        res = self.client.patch(advert_detail_url(advert.id), payload)
        old_title = advert.title
        advert.refresh_from_db()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertNotEqual(advert.title, old_title)

        new_links = AdvertImageLink.objects \
            .filter(advert=advert) \
            .order_by('slot')

        self.assertEqual(len(new_links), 2)
        self.assertEqual(new_links[0].image, new_image_1)
        self.assertEqual(new_links[1].image, new_image_2)

    def test_update_advert_images_reorder(self):
        """Test upadting an advert with reordering of images"""
        advert, image_ids = sample_ad_with_images(user=self.user)

        payload = {
            'images': [image_ids[2], image_ids[1], image_ids[0]]
        }

        existing_links = AdvertImageLink.objects \
            .filter(advert=advert) \
            .order_by('slot')

        for index, link in enumerate(existing_links):
            self.assertEqual(link.image.id, image_ids[index])

        res = self.client.patch(advert_detail_url(advert.id), payload)
        advert.refresh_from_db()

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        new_links = AdvertImageLink.objects \
            .filter(advert=advert) \
            .order_by('slot')

        self.assertEqual(len(new_links), 3)
        for index, link in enumerate(new_links):
            self.assertEqual(link.image.id, image_ids[2 - index])

    def test_destroy_advert(self):
        """Test deleting an advert"""
        advert = sample_ad(user=self.user)
        ad_id = advert.id
        res = self.client.delete(advert_detail_url(ad_id))

        advert_image_links = AdvertImageLink.objects.filter(advert=ad_id)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(len(advert_image_links), 0)

    def test_refresh_advert(self):
        """Test refreshing an advert"""
        advert = sample_ad(user=self.user)
        advert.date_refreshed -= timedelta(days=7)
        advert.save()
        old_date = advert.date_refreshed

        res = self.client.patch(advert_refresh_url(advert.id))
        advert.refresh_from_db()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertGreater(advert.date_refreshed, old_date)

    def test_refresh_advert_too_soon(self):
        """Test that user must wait 7 days before refreshing an ad"""
        advert = sample_ad(user=self.user)

        res = self.client.patch(advert_refresh_url(advert.id))

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
