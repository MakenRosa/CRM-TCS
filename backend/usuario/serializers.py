from rest_framework import  serializers
from .models import Usuario

#Faz o link entre o que está na base e transforma em JSON
class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'email', 'senha', 'nome', 'cpf']