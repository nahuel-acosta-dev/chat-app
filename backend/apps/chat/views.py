from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.decorators import (api_view, permission_classes, action)
from rest_framework import viewsets, status
from .models import ChatModel
from apps.user.models import UserAccount
from apps.user_profile.models import UserProfile
from .serializers import (
    ChatSerializer, ListChatSerializer, ChatListSerSerializer)
from rest_framework.response import Response
from core.authentication import get_user_data, unauthorized
# Create your views here.


class ChatViewSet(viewsets.GenericViewSet):
    model = ChatModel
    model_user = UserAccount
    model_profile = UserProfile
    serializer_class = ChatSerializer
    list_serializer_class = ListChatSerializer
    chat_list_serializer_class = ChatListSerSerializer
    queryset = None

    def get_serializer_class(self):
        if self.action in ["chat_list"]:
            return self.chat_list_serializer_class
        return self.serializer_class

    def get_user_profile(self, request):
        user_id = get_user_data(request)
        try:
            if user_id:
                user = self.model_user.objects.get(id=user_id)
                user_profile = self.model_profile.objects.get(user=user)
                return user_profile
            else:
                return False
        except:
            return False

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self, user_profile=None):
        if self.queryset is None:
            messages = []
            chat_names = []
            for chat in self.list_serializer_class().Meta.model.objects\
                    .filter(Q(send=user_profile) | Q(receive=user_profile)):
                if chat.chat_name() not in chat_names:
                    messages.append(chat.id)
                    chat_names.append(chat.chat_name())
            self.queryset = self.list_serializer_class().Meta.model.objects\
                .filter(id__in=messages)
        return self.queryset

    def get_queryset_chat_list(self, chat_name=None):
        if self.queryset is None:
            messages_chat_name = []
            for chat in self.model.objects.all():
                if chat.chat_name() == chat_name:
                    messages_chat_name.append(chat.id)
            self.queryset = self.list_serializer_class().Meta.model.objects\
                .filter(id__in=messages_chat_name)
        return self.queryset

    def list(self, request):
        user_profile = self.get_user_profile(request)
        if user_profile:
            chats = self.get_queryset(user_profile)
            chats_serializer = self.list_serializer_class(
                chats, many=True)
            return Response(chats_serializer.data, status=status.HTTP_200_OK)
        return unauthorized()

    @action(detail=False, methods=['POST'])
    def chat_list(self, request):
        data = request.data
        chat_name = data['chat_name']
        user_profile = self.get_user_profile(request)
        if user_profile:
            chats = self.get_queryset_chat_list(chat_name)
            serializer_class = self.get_serializer_class()
            chats_serializer = self.list_serializer_class(
                chats, many=True)
            return Response(chats_serializer.data, status=status.HTTP_200_OK)
        return unauthorized()
