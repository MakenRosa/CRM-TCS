from django.shortcuts import render
from rest_framework import viewsets
from .models import Usuario
from .serializers import UsuarioSerializer


#Acoes relacionadas aos usuarios do sistema:

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
