from django.db import models
from apps.chat_group.models import ChatGroup
from apps.user_profile.models import UserProfile


class MessageInChatGroup(models.Model):
    chat_group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    message = models.TextField(blank=False, max_length=500)

    def __str__(self):
        return f"{self.chat_group.chat_group_name}"
