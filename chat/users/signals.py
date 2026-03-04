from django.dispatch import receiver
from django.db.models.signals import post_save,pre_save
from allauth.account.models import EmailAddress
from django.contrib.auth.models import User
from .models import Profile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

    else:
        try:
            email_address=EmailAddress.objects.get_primary(user=instance)
            if email_address.email != instance.email:
                email_address.email=instance.email
                email_address.save()
        except:
            EmailAddress.objects.create(user=instance,email=instance.email,primary=True,verified=False)

@receiver(pre_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.username = instance.username.lower()

