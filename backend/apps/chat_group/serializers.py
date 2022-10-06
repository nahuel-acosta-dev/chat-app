from .models import ChatGroup
from rest_framework import serializers
from apps.user_profile.serializers import UserProfileSerializer


class ChatGroupSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField('get_users_group')
    creator_user = UserProfileSerializer(read_only=True)

    def get_users_group(self, obj):
        users = self.context.get('users')
        return users
        # do something with request and obj

    class Meta:
        model = ChatGroup
        fields = ('creator_user', 'chat_group_name',
                  'photo', 'description', 'users', )
