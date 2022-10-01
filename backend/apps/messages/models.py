from django.db import models

# Create your models here.


class Message(models.Model):
    message = models.TextField(max_length=500)


class Messages(models.Model):
    chat_name = models.CharField(max_length=255)
    messages = models.ManyToManyField(Message)

    def __str__(self):
        return f"{self.chat_name}"
