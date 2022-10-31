from rest_framework import serializers
from apps.user_profile.serializers import UserProfileSerializer
from .models import ChatModel
from django.db.models import Q


class ChatListSerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatModel
        fields = ['chat_name']


class ListChatSerializer(serializers.ModelSerializer):
    send = UserProfileSerializer(read_only=True)
    receive = UserProfileSerializer(read_only=True)

    class Meta:
        model = ChatModel
        fields = [
            'id', 'send', 'receive',
            'message', 'timestamp', 'chat_name']


class MessageInChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatModel
        fields = ('message',)


class ChatSerializer(serializers.ModelSerializer):
    send = UserProfileSerializer(read_only=True)
    receive = UserProfileSerializer(read_only=True)
    messages = serializers.SerializerMethodField('get_messages_group')

    def get_messages_group(self, obj):
        messages_in_chat = ChatModel.objects.filter(
            Q(send=obj) | Q(receive=obj))
        messages_in_chat_serializer = MessageInChatSerializer(
            messages_in_chat, many=True)
        messages = messages_in_chat_serializer.data
        return messages

    class Meta:
        model = ChatModel
        fields = ('send', 'receive', 'messages', 'timestamp',)
