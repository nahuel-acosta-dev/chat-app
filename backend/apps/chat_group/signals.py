from django.db.models.signals import post_save
from .models import ChatGroup
from apps.user_in_chat_group.models import UserInChatGroup
from django.dispatch import receiver


@receiver(post_save, sender=ChatGroup)
def add_user_in_group(sender, instance, created, **kwargs):
    if created:
        UserInChatGroup.objects.create(
            chat_group=instance, profile=instance.creator_user, admin=True)
