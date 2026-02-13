from django.urls import path,include
from users.views import *
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('', profile, name='profile'),    
    path('/edit', edit_profile_view, name='edit_profile'),    
]
urlpatterns+=static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
