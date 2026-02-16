from django.db import models
from django.contrib.auth.models import User
from django.templatetags.static import static
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    displayname=models.CharField(max_length=255, null=True, blank=True) 
    info=models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.user.username

    @property
    def name(self):
        return self.displayname if self.displayname else self.user.username

        
    @property   
    def profile_picture_url(self):
        if self.profile_picture:
            return self.profile_picture.url
        else:
            return static('images/avatar.svg')


