from django.contrib import admin
from .models import ChatGroup, UserInChatGroup
# Register your models here.
admin.site.register(ChatGroup)
admin.site.register(UserInChatGroup)
