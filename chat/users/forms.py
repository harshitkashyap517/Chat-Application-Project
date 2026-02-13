from django.forms import ModelForm
from .models import Profile 
from django import forms
class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        exclude = ['user']
        widgets = {
                'image':forms.FileInput(),
                'displayname':forms.TextInput(attrs={'placeholder':'Add display name'}),
                'info':forms.Textarea(attrs={'placeholder':'Add information','rows':3})
        }     