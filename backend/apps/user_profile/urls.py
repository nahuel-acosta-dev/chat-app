from django.urls import path, include
from rest_framework import routers
from rest_framework_extensions.routers import ExtendedSimpleRouter
from .views import UserProfileView
from core.urls import router

app_name = "user_profile"

urlpatterns = [
]
