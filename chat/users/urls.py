from django.urls import path,include
from users.views import *
from rest_framework import routers, serializers, viewsets
from .serializer import userdataSerializer

router=routers.DefaultRouter()
router.register(r'users',userViewSet)

urlpatterns = [
    path('', profile, name='profile'),    
    path('@<username>', profile, name='profile_by_username'),   
    path('settings/',profile_settings,name='profile_settings'),
    path('api/', include(router.urls)),
    path('api/user/', ProfileView.as_view(), name='api_profile'),
    path('api/register/', userRegisterAPIView.as_view(), name='api_register'),
    path('api/login/', userLoginAPIView.as_view(), name='api_login'),
]

