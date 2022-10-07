from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from .models import ChatGroup
from apps.user.models import UserAccount
from apps.user_profile.models import UserProfile
from apps.user_in_chat_group.models import UserInChatGroup
from apps.user_in_chat_group.serializers import ListUserInChatGroupSerializer, UserInChatGroupSerializer
from .serializers import ChatGroupSerializer, ListChatGroupSerializer, CreateChatGroupSerializer
from rest_framework.response import Response
from core.authentication import get_user_data, unauthorized
# Create your views here.


class ChatGroupViewSet(viewsets.GenericViewSet):
    model = ChatGroup
    model_user_in_chat_group = UserInChatGroup
    model_user = UserAccount
    model_profile = UserProfile
    serializer_class = ChatGroupSerializer
    list_serializer_class = ListChatGroupSerializer
    create_serializer_class = CreateChatGroupSerializer
    user_in_chat_group_serializer_class = UserInChatGroupSerializer
    list_user_in_chat_group_serializer_class = ListUserInChatGroupSerializer
    queryset = None

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
            self.queryset = self.list_serializer_class().Meta.model.objects\
                .filter(profile=user_profile)
        return self.queryset

    def get_serializer_class(self):
        if self.action in ["create"]:
            return self.create_serializer_class
        return self.serializer_class

    def retrieve(self, request, pk=None):
        group = self.get_object(pk)
        users_in_chat_group = self.model_user_in_chat_group.objects.filter(
            chat_group=group)
        users_in_chat_group_serializer = self.list_user_in_chat_group_serializer_class(
            users_in_chat_group, many=True
        )
        group_serializer = self.serializer_class(
            group, context={'users': users_in_chat_group_serializer.data})
        return Response(group_serializer.data, status=status.HTTP_200_OK)

    def list(self, request):
        user_profile = self.get_user_profile(request)
        if user_profile:
            chat_groups = self.get_queryset(user_profile)
            chat_groups_serializer = self.list_serializer_class(
                chat_groups, many=True)
            return Response(chat_groups_serializer.data, status=status.HTTP_200_OK)
        else:
            return unauthorized()

    def create(self, request):
        user_profile = self.get_user_profile(request)
        data = request.data
        try:
            if user_profile:
                try:
                    chat_group = self.model.objects.create(creator_user=user_profile,
                                                           chat_group_name=data['chat_group_name'],
                                                           photo=data['photo'],
                                                           description=data['description'])
                except:
                    chat_group = self.model.objects.create(creator_user=user_profile,
                                                           chat_group_name=data['chat_group_name'],
                                                           description=data['description'])
                serializer_class = self.get_serializer_class()
                chat_group_serializer = serializer_class(
                    chat_group)
                return Response(
                    chat_group_serializer.data, status=status.HTTP_201_CREATED
                )

            else:
                return unauthorized()
        except:
            return Response({'error': 'Invalid data'}, status=status.HTTP_404_NOT_FOUND)
