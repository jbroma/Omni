import tempfile

from PIL import Image

from django.contrib.auth import get_user_model

from core import models


def sample_user(email='test@company.com', password='test1234',
                name='Test User'):
    """Create a sample user"""
    return get_user_model().objects.get_or_create(
        email=email, password=password, name=name
    )[0]


def sample_category(name='Samochody', parent=None):
    """Create a sample category"""
    return models.Category.objects.get_or_create(name=name, parent=parent)[0]


def sample_location(name='Motoryzacja'):
    """Create a sample location"""
    return models.Location.objects.get_or_create(name=name)[0]


def sample_image(width=300, height=300):
    """Create a sample image and return it"""
    image = models.AdvertImage()
    image_path = models.image_file_path(None, 'test.jpg', 'test')
    with tempfile.NamedTemporaryFile(suffix='.jpg') as ntf:
        img = Image.new('RGB', (300, 300))
        img.save(ntf, format='JPEG')
        ntf.seek(0)
        image.image.save(image_path, ntf, save=True)

    image.save()
    return image


def sample_ad(user=None, title='Sprzedam Opla',
              category=None, location=None, price=1000.00,
              content='Nowy Opel na sprzedaz'):
    """Create a sample advert"""
    if not user:
        user = sample_user()
    if not category:
        category = sample_category()
    if not location:
        location = sample_location()

    return models.Advert.objects.get_or_create(
        user=user,
        title=title,
        category=category,
        location=location,
        price=price,
        content=content
    )[0]


def sample_ad_with_images(user=None, title='Example Ad', category=None,
                          location=None, price=1.00, image_ids=None,
                          content='Sample content'):
    """Create a sample advert with 3 images"""
    if not user:
        user = sample_user()
    if not category:
        category = sample_category()
    if not location:
        location = sample_location()
    if not image_ids:
        image_ids = []
        for x in range(3):
            image_ids.append(sample_image().id)

    advert = models.Advert.objects.get_or_create(
        user=user,
        title=title,
        category=category,
        location=location,
        price=price,
        content=content
    )[0]

    # Create AdvertImageLinks
    for index, image_id in enumerate(image_ids):
        models.AdvertImageLink.objects.create(
            advert=advert,
            image_id=image_id,
            slot=index
        )

    return advert, image_ids


def sample_conversation(user_1, user_2=None, ad=None):
    """Create a sample conversation for testing purposes"""
    if not user_2:
        user_2 = sample_user(email='recipient@company.com')
    if not ad:
        ad = sample_ad(user_1)
    return models.Conversation.objects.get_or_create(
        user_1=user_1,
        user_2=user_2,
        advert=ad
    )[0]


def sample_message(sender, conversation):
    """Create a sample message"""
    return models.Message.objects.create(
        sender=sender,
        conversation=conversation,
        content="Sample message content"
    )
