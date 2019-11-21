from django.contrib.auth import get_user_model

from core import models


def sample_user(email='test@company.com', password='test1234',
                name='Test User'):
    """Create a sample user"""
    return get_user_model().objects.create_user(email, password, name=name)


def sample_category(name='Samochody'):
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


def sample_conversation(user_1, user_2=None, ad=None):
    """Create a sample conversation for testing purposes"""
    if not user_2:
        user_2 = sample_user(email='recipient@company.com')
    if not ad:
        ad = sample_ad(user_1)
    return models.Conversation.objects.create(
        user_1=user_1,
        user_2=user_2,
        advert=ad,
        title=ad.title
    )


def sample_message(sender, conversation):
    """Create a sample message"""
    return models.Message.objects.create(
        sender=sender,
        conversation=conversation,
        content="Sample message content"
    )
