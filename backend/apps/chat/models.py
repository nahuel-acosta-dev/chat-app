from django.db import models
from apps.user_profile.models import UserProfile
from apps.messages.models import Messages
# Create your models here.


class ChatModel(models.Model):
    profile1 = models.ForeignKey(
        UserProfile, models.CASCADE, blank=False, related_name="chat_user1")
    profile2 = models.ForeignKey(
        UserProfile, models.CASCADE, blank=False, related_name="chat_user2")
    messages = models.ForeignKey(
        Messages, models.CASCADE, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def chat_name(self):
        if self.profile1.user_id > self.profile2.user_id:
            return f"chat_{self.profile1.user_id}_{self.profile2.user_id}"
        else:
            return f"chat_{self.profile2.user_id}_{self.profile1.user_id}"

    def __str__(self):
        return f"chat of {self.profile1.user_id} and {self.profile2.user_id}"
