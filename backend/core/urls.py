"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
#from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework import permissions
from rest_framework import routers
from rest_framework_extensions.routers import ExtendedSimpleRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from apps.user_profile.views import UserProfileView
from apps.user_in_chat_group.views import UserInChatGroupViewSet
from apps.chat_group.views import ChatGroupViewSet
from apps.chat.views import ChatViewSet
from apps.message_in_chat_group.views import MessageInChatGroupViewSet

router: ExtendedSimpleRouter = ExtendedSimpleRouter()
router = routers.DefaultRouter()

router.register(r'profile', UserProfileView, basename='profile')
router.register(r'user_in_group', UserInChatGroupViewSet,
                basename='user_in_group')
router.register(r'chat', ChatViewSet, basename='chat')
router.register(r'chat_group', ChatGroupViewSet, basename='chat_group')
router.register(r'messages_in_group', MessageInChatGroupViewSet,
                basename='messages_in_group')

schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="brianacostanahuelmails@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    # Swagger
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger',
            cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc',
            cache_timeout=0), name='schema-redoc'),
    ############

    # Authentication
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    ############
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
