from rest_framework import serializers
from .models import UserProfile
from apps.user.models import UserAccount


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'first_name', 'last_name')


class UserProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'


class UserProfileListSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile

    def to_representation(self, instance):
        return{
            'id': instance['id'],
            'photo': instance['photo'],
            'user': instance['user']
        }
