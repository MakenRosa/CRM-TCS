from rest_framework import serializers
from datetime import date
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'



Usuario = get_user_model()

class UsersGroupSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = Usuario
        fields = ('id', 'email', 'first_name')

