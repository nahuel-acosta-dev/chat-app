from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.decorators import (api_view, permission_classes, action)
from rest_framework import status
from rest_framework import viewsets
from core.authentication import get_user_data, access_user_data
from .serializers import (UserInChatGroupSerializer, CreateUserInChatGroupSerializer,
                          UpdateUserInChatGroupSerializer)
from apps.user_profile.serializers import UserProfileSerializer
from .models import UserInChatGroup
from apps.chat_group.models import ChatGroup
from apps.user_profile.models import UserProfile
from apps.user.models import UserAccount
# Create your views here.


class UserInChatGroupViewSet(viewsets.GenericViewSet):
    model = UserInChatGroup
    model_user = UserAccount
    model_profile = UserProfile
    model_chat_group = ChatGroup
    serializer_class = UserInChatGroupSerializer
    create_serializer_class = CreateUserInChatGroupSerializer
    update_serializer_class = UpdateUserInChatGroupSerializer
    queryset = None

    def get_serializer_class(self):
        if self.action in ["create"]:
            return self.create_serializer_class
        elif self.action in ["update"]:
            return self.update_serializer_class
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

    # @action(detail=False, methods=["post"], serializer_class=create_serializer_class)
    def create(self, request):
        data = request.data
        profile_authenticate = self.get_user_profile(request)

        if profile_authenticate == False:
            return Response({
                'error': 'You are not authorized to perform this action'
            }, status=status.HTTP_401_UNAUTHORIZED)

        chat_group = self.model_chat_group.objects.get(
            id=int(data['chat_group']))

        # si el usuario que desea agregar a otra persona es administrador dejamos que continue
        if self.model.objects.filter(chat_group=chat_group,
                                     profile=profile_authenticate, admin=True).exists():

            profile = self.model_profile.objects.get(id=int(data['profile']))

            # si el usuario que se desea agregar ya se encuentra en el grupo retornamos un conflicto
            if self.model.objects.filter(chat_group=chat_group, profile=profile).exists():
                return Response({
                    'error': 'the user is already in the group'
                }, status=status.HTTP_409_CONFLICT)
            else:
                user_in_group = self.model.objects.create(
                    chat_group=chat_group, profile=profile)
                serializer_class = self.get_serializer_class()
                user_in_group_serializer = serializer_class(
                    user_in_group)
                return Response(
                    {
                        'message': 'user added to the group successfully',
                        'data': user_in_group_serializer.data
                    },
                    status=status.HTTP_201_CREATED
                )
        else:
            return Response({
                'error': 'does not have the permissions to perform this action'
            }, status=status.HTTP_406_NOT_ACCEPTABLE)

    def update(self, request, pk):
        data = request.data

        # perfil de la persona que en teoria tendia que ser administrador y tener los permisos
        # de modificar el grupo
        profile_authenticate = self.get_user_profile(request)

        if profile_authenticate == False:
            return Response({
                'error': 'You are not authorized to perform this action'
            }, status=status.HTTP_401_UNAUTHORIZED)
        # obtenemos el user_grupo que deseamos modificar en el grupo
        user_group = self.get_object(pk)

        # ahora obtenemos el perfil de quien desea hacer ese cambio
        # comprobamos si se encuentra en el grupo la persona que desea hacer ese cambio y si es admin
        if self.model.objects.filter(
                chat_group=user_group.chat_group, profile=profile_authenticate, admin=True).exists():
            user_group.admin = data['admin']
            user_group.save()

            serializer_class = self.get_serializer_class()  # cambiamos el serializer_class

            user_group_serializer = serializer_class(user_group)

            return Response({
                'message': 'Updated user permissions',
                'data': user_group_serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'does not have the permissions to perform this action'
            }, status=status.HTTP_406_NOT_ACCEPTABLE)

    def destroy(self, request, pk):
        profile_authenticate = self.get_user_profile(request)

        if profile_authenticate == False:
            return Response({
                'error': 'You are not authorized to perform this action'
            }, status=status.HTTP_401_UNAUTHORIZED)

        try:
            user_in_group = self.model.objects.get(id=int(pk))
            if self.model.objects.filter(
                    chat_group=user_in_group.chat_group, profile=profile_authenticate, admin=True).exists():
                user_in_group.delete()
                return Response({'success': 'User removed from the group'}, status=status.HTTP_200_OK)
            else:
                return Response({
                    'error': 'You are not authorized to perform this action'
                }, status=status.HTTP_406_NOT_ACCEPTABLE)

        except:
            return Response({
                'error': 'not found user in the group'
            }, status=status.HTTP_404_NOT_FOUND)
