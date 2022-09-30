from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL
# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(User, models.CASCADE)
    photo = models.ImageField(upload_to='photos/%Y/%m/')

    def __str__(self):
        return f'{self.user.email}'
