from rest_framework import serializers
from apps.chat_group.serializers import CreateChatGroupSerializer
from apps.user_profile.serializers import UserProfileSerializer
from .models import MessageInChatGroup


class MessageInChatGroupSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = MessageInChatGroup
        fields = '__all__'
