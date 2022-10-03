from django.contrib import admin
from .models import ChatModel
# Register your models here.


class ChatAdmin(admin.ModelAdmin):
    list_per_page = 10


admin.site.register(ChatModel, ChatAdmin)
