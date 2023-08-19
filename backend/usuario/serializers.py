from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model


Usario = get_user_model()

#Faz o link entre o que está na base e transforma em JSON
class UsuarioSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = Usario
        fields = ('id', 'email', 'password', 'first_name', 'cpf')