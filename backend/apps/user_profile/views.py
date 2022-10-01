from .serializers import UserProfileSerializer, UpdateUserProfileSerializer
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.decorators import (api_view, permission_classes,
                                       action)
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from .models import UserProfile
from apps.user.models import UserAccount
from .authentication import get_user_data, access_user_data
# Create your views here.


class UserProfileView(viewsets.GenericViewSet):
    model = UserProfile
    model_user = UserAccount
    serializer_class = UserProfileSerializer
    update_serializer_class = UpdateUserProfileSerializer
    permission_classes = (IsAuthenticated,)
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.serializer_class().Meta.model.objects\
                .all()
        return self.queryset

    def retrieve(self, request, pk=None):
        profile = self.get_object(pk)
        profile_serializer = self.serializer_class(profile)
        return Response(profile_serializer.data, status=status.HTTP_200_OK)

    def list(self, request):
        profile = self.get_queryset()
        profiles_serializer = self.serializer_class(profile, many=True)
        return Response(profiles_serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        permission = access_user_data(request, int(pk) - 1)
        if permission != True:
            return permission
        data = request.data

        profile = self.get_object(pk)
        profile.photo = data['photo']
        profile.save()
        profile_serializer = self.update_serializer_class(
            profile, data=request.data)
        if profile_serializer.is_valid():
            return Response({
                'message': 'Updated user correctly',
                'data': profile_serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'There are errors in the update',
            'error': profile_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
