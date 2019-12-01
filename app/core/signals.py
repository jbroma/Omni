from django.dispatch import receiver, Signal


TITLE_CHANGED = Signal(providing_args=['new_title'])
USER_DELETED = Signal()


@receiver(TITLE_CHANGED)
def update_conversation_title(sender, **kwargs):
    """Update conversations title on Advert title change"""
    from core.models import Conversation
    new_title = kwargs.get('new_title', None)
    if new_title:
        conversations = Conversation.objects.filter(advert=sender)
        for conv in conversations:
            conv.title = new_title
            conv.save()


@receiver(USER_DELETED)
def destroy_remains_of_user(sender, **kwargs):
    """Delete adverts and notifications that belonged to the deleted user"""
    from core.models import Advert
    advert_qs = Advert.objects.filter(user=sender)
    for advert in advert_qs:
        advert.delete()
