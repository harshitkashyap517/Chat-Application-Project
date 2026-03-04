from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

class userdataSerializer(serializers.HyperlinkedModelSerializer):
    id=serializers.ReadOnlyField()
    class Meta:
        model = User
        fields = ['id','username']
        

class userRegister(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username','email','password','confirm_password']
    def validate(self, data):
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Email already exists")
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user