from .models import ChatGroup, UserInChatGroup
from rest_framework import serializers
from apps.user_profile.serializers import UserProfileSerializer


class ChatGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGroup
        fields = '__all__'


class UserInChatGroupSerializer(serializers.ModelSerializer):
    chat_group = ChatGroupSerializer(read_only=True)
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = UserInChatGroup
        fields = '__all__'
