from .models import ChatGroup
from rest_framework import serializers
from apps.user_profile.serializers import UserProfileSerializer


class ChatGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGroup
        fields = '__all__'
