from django.db import models
from apps.user_profile.models import UserProfile
# Create your models here.


class ChatModel(models.Model):
    send = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, blank=False, related_name="chat_send")
    receive = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, blank=False, related_name="chat_receive")
    message = models.TextField(max_length=500, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def chat_name(self):
        # aca es punto clave
        if self.send.id > self.receive.id:
            return f"chat_{self.receive.id}_{self.send.id}"
        else:
            return f"chat_{self.send.id}_{self.receive.id}"

    def __str__(self):
        return self.chat_name()
