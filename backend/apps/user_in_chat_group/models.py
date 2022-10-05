from django.db import models
from apps.user_profile.models import UserProfile
from apps.chat_group.models import ChatGroup
# Create your models here.


class UserInChatGroup(models.Model):
    chat_group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    admin = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.profile.user.email} in group: {self.chat_group}"
    # cuando queramos obtener todos los participantes del grupo simplemente filtramos por todos
    # los usuario que pertenescan a dicho grupo, es decir obtenemos todos los usuarios relacionados
    # a el id del grupo
