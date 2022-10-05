from django.db import models
from apps.user_profile.models import UserProfile
# Create your models here.


class ChatGroup(models.Model):
    creator_user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    chat_group_name = models.TextField(max_length=100, blank=False)
    photo = models.ImageField(upload_to='photos/%Y/%m/', blank=True, null=True)
    description = models.TextField(
        blank=True, help_text="description of the group")

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('chat:room', args=[str(self.id)])

    def __str__(self):
        return f"{self.chat_group_name}"
