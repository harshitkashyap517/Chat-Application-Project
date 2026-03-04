from django.db import models
from django.contrib.auth.models import User
import shortuuid
# Create your models here.
class Chatgroup(models.Model):
    name = models.CharField(max_length=255,unique=True,default=shortuuid.uuid)
    users_online=models.ManyToManyField(User, related_name='online_in_groups', blank=True)
    members=models.ManyToManyField(User, related_name='chatgroups', blank=True)
    is_private=models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Groupmessage(models.Model):
    group=models.ForeignKey(Chatgroup,related_name='chatmessages',on_delete=models.CASCADE)
    author=models.ForeignKey(User,on_delete=models.CASCADE)
    body=models.CharField(max_length=300)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f'{self.author.username}: {self.body}'

    class Meta:
        ordering = ['-created_at']