from .models import UserInChatGroup
from rest_framework import serializers
from apps.user_profile.serializers import UserProfileSerializer
from apps.chat_group.serializers import ChatGroupSerializer


class CreateUserInChatGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInChatGroup
        fields = ('chat_group', 'profile', )


class UpdateUserInChatGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInChatGroup
        fields = ('admin',)


class UserInChatGroupSerializer(serializers.ModelSerializer):
    chat_group = ChatGroupSerializer(read_only=True)
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = UserInChatGroup
        fields = '__all__'
