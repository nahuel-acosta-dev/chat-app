from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from .models import ChatGroup
from apps.user.models import UserAccount
from apps.user_profile.models import UserProfile
from .serializers import ChatGroupSerializer
from rest_framework.response import Response
from core.authentication import get_user_data, unauthorized
# Create your views here.


class ChatGroupViewSet(viewsets.GenericViewSet):
    model = ChatGroup
    model_user = UserAccount
    model_profile = UserProfile
    serializer_class = ChatGroupSerializer
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
            self.queryset = self.serializer_class().Meta.model.objects\
                .filter(profile=user_profile)
        return self.queryset

    def retrieve(self, request, pk=None):
        group = self.get_object(pk)
