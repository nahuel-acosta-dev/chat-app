from django.db import models
from apps.user_profile.models import UserProfile
# Create your models here.


class ChatModel(models.Model):
    send = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, blank=False, related_name="chat_user1")
    receive = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, blank=False, related_name="chat_user2")
    message = models.TextField(max_length=500, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def chat_name(self):
        if self.send.user_id > self.receive.user_id:
            return f"chat_{self.receive.user_id}_{self.send.user_id}"
        else:
            return f"chat_{self.send.user_id}_{self.receive.user_id}"

    def __str__(self):
        return self.chat_name()
