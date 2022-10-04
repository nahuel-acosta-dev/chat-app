from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.decorators import (api_view, permission_classes, action)
from rest_framework import status
from rest_framework import viewsets
from core.authentication import get_user_data, access_user_data
from .serializers import UserInChatGroupSerializer
from apps.user_profile.serializers import UserProfileSerializer
from .models import UserInChatGroup
from apps.user_profile.models import UserProfile
from apps.user.models import UserAccount
# Create your views here.


class ChatGroupViewSet(viewsets.GenericViewSet):
    pass


class UserInChatGroupViewSet(viewsets.GenericViewSet):
    model = UserInChatGroup
    model_user = UserAccount
    model_profile = UserProfile
    serializer_class = UserInChatGroupSerializer
    queryset = None

    def get_user_profile(self, request):
        user_id = get_user_data(request)
        if user_id:
            user = self.model_user.objects.get(id=user_id)
            user_profile = self.model_profile.objects.get(user=user)
            return user_profile
        else:
            return False

    def get_object(self, pk):
        print(pk)
        print(self.model.objects.all())
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self, user_profile):
        if self.queryset is None:
            self.queryset = self.serializer_class().Meta.model.objects\
                .filter(profile=user_profile)
        return self.queryset

    def retrieve(self, request, pk=None):
        group = self.get_object(pk)
        print(group.id)
        group_serializer = self.serializer_class(group)
        return Response(group_serializer.data, status=status.HTTP_200_OK)

    def list(self, request):
        user_profile = self.get_user_profile(request)
        if user_profile:
            groups = self.get_queryset(user_profile)
            groups_serializer = self.serializer_class(groups, many=True)
            return Response(groups_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {
                    'error': 'Unauthorized'
                }, status=status.HTTP_401_UNAUTHORIZED
            )

    def update(self, request, pk):
        data = request.data
        profile_authenticate = self.get_user_profile(request)
        # obtenemos el user_grupo que deseamos modificar en el grupo
        user_group = self.get_object(pk)
        # ahora obtenemos el perfil de quien desea hacer ese cambio
        # comprobamos si se encuentra en el grupo la persona que desea hacer ese cambio y si es admin
        if self.model.objects.filter(
                chat_group=user_group.chat_group, profile=profile_authenticate, admin=True).exists():
            user_group.admin = data['admin']
            user_group.save()
            user_group_serializer = self.serializer_class(user_group)
            return Response({
                'message': 'Updated user permissions',
                'data': user_group_serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'does not have the permissions to perform this action',
                'data': user_group_serializer.data
            }, status=status.HTTP_406_NOT_ACCEPTABLE)
