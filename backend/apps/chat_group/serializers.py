from dataclasses import field
from .models import ChatGroup
from rest_framework import serializers
from apps.user_profile.serializers import UserProfileSerializer
from apps.user_in_chat_group.models import UserInChatGroup
from apps.user_in_chat_group import serializers as UserInChatSerializers


class ListUsersInChatGroupSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField('get_users_group')
    creator_user = UserProfileSerializer(read_only=True)

    def get_users_group(self, obj):
        users_in_chat_group = UserInChatGroup.objects.filter(
            chat_group=obj)
        users_in_chat_group_serializer = UserInChatSerializers.ListUserInChatGroupSerializer(
            users_in_chat_group, many=True
        )
        users = users_in_chat_group_serializer.data
        return users
        # do something with request and obj

    class Meta:
        model = ChatGroup
        fields = ('id', 'creator_user', 'chat_group_name',
                  'photo', 'description', 'users')


class ChatGroupSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField('get_users_group')
    creator_user = UserProfileSerializer(read_only=True)

    def get_users_group(self, obj):
        users = self.context.get('users')
        return users

    class Meta:
        model = ChatGroup
        fields = ('creator_user', 'chat_group_name',
                  'photo', 'description', 'users', )


class CreateChatGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGroup
        fields = ('chat_group_name', 'photo', 'description')


class ListChatGroupSerializer(serializers.ModelSerializer):
    chat_group = ListUsersInChatGroupSerializer(read_only=True)

    class Meta:
        model = UserInChatGroup
        fields = ('chat_group', )
