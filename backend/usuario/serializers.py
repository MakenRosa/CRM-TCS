from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

from rest_framework import serializers


Usuario = get_user_model()

#Faz o link entre o que está na base e transforma em JSON
class UsuarioSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = Usuario
        fields = ('id', 'email', 'password', 'first_name', 'cpf', 'last_name', 'is_staff')

class InviteSerializer(serializers.Serializer):
    to = serializers.EmailField()

