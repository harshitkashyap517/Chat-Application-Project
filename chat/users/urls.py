from django.urls import path,include
from users.views import *
urlpatterns = [
    path('', profile, name='profile'),    
    path('/edit', edit_profile_view, name='edit_profile'),  
    path('/onboarding', edit_profile_view, name='onboarding_profile'),
    path('@<username>', profile, name='profile_by_username'),   
    path('settings/',profile_settings,name='profile_settings'),
    path('emailchanger/',email_changer,name='email-changer'),
]

