from .serializers import UserProfileSerializer, UserProfileListSerializer
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.decorators import (api_view, permission_classes,
                                       action)
from rest_framework.generics import GenericAPIView
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from .models import UserProfile
from apps.user.models import UserAccount
# Create your views here.


class UserProfileView(viewsets.GenericViewSet):
    model = UserProfile
    model_user = UserAccount
    serializer_class = UserProfileSerializer
    list_serializer_class = UserProfileListSerializer
    permission_classes = (IsAuthenticated,)
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        # la barra \ significa que el punto de abajo pertenece arriba(borrar barra para comprobar)
        if self.queryset is None:
            self.queryset = self.serializer_class().Meta.model.objects\
                .all()
        return self.queryset

    def list(self, request):
        profile = self.get_queryset()
        profiles_serializer = self.serializer_class(profile, many=True)
        return Response(profiles_serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        profile = self.get_object(pk)
        profile_serializer = self.serializer_class(profile)
        return Response(profile_serializer.data, status=status.HTTP_200_OK)
