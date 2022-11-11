from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from apps.chat_group.models import ChatGroup
from apps.user_in_chat_group.models import UserInChatGroup
from .models import MessageInChatGroup
from .serializers import MessageInChatGroupSerializer
from apps.user.models import UserAccount
from apps.user_profile.models import UserProfile
from rest_framework.response import Response
from core.authentication import get_user_data, unauthorized
# Create your views here.


class MessageInChatGroupViewSet(viewsets.GenericViewSet):
    model = MessageInChatGroup
    model_chat_group = ChatGroup
    model_user_in_chat_group = UserInChatGroup
    model_user = UserAccount
    model_profile = UserProfile
    serializer_class = MessageInChatGroupSerializer
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model_chat_group, pk=pk)

    def get_queryset(self, user_profile=None):
        if self.queryset is None:
            self.queryset = self.serializer_class().Meta.model.objects\
                .all()
        return self.queryset

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

    def retrieve(self, request, pk=None):
        chat_group = self.get_object(pk)
        user_profile = self.get_user_profile(request)
        if user_profile and self.model_user_in_chat_group.objects.filter(
            chat_group=chat_group, profile=user_profile
        ).exists():
            messages_in_chat_group = self.model.objects.filter(
                chat_group=chat_group)
            messages_in_chat_group_serializer = self.serializer_class(
                messages_in_chat_group, many=True
            )
            return Response(messages_in_chat_group_serializer.data, status=status.HTTP_200_OK)
        return unauthorized()
