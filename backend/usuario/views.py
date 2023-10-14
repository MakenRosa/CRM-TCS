from rest_framework import viewsets
from .models import Usuario
from .serializers import UsuarioSerializer, InviteSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from urllib.parse import unquote
import requests
from django.contrib.auth.models import Group
from rest_framework_simplejwt.views import TokenObtainPairView
import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse


#Acoes relacionadas aos usuarios do sistema:

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        try:
            user = Usuario.objects.get(email=email)
        except Usuario.DoesNotExist:
            user = None
        print(user)
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200 and user:
            user_id = user.id
            response.data['user_id'] = user_id
            response.data['is_admin'] = user.is_staff
        return response
        

class InviteView(APIView):
    def post(self, request, *args, **kwargs):

        serializer = InviteSerializer(data=request.data)
        if serializer.is_valid():
            user = Usuario.objects.get(id=request.GET.get("user_id"))

            to = serializer.validated_data['to']
            subject = "Invite Solve CRM"
            message = f"Participe do time: http://localhost:3000/register?cd_grupo={user.cd_grupo}"

            send_mail(subject, message, user.email, [to])

            return Response({'message': 'E-mail sent successfully'})
        return Response(serializer.errors, status=400)
    


def ativacao(request):
    activation_url = request.GET.get('url', '')
    if activation_url:
        decoded_url = unquote(activation_url)
        parts = decoded_url.split('/')
        token = parts[-1]
        uid = parts[-2]

        post_data = {
            'uid': uid,
            'token': token
        }

        headers = {'Content-Type': 'application/json'}
        response = requests.post('http://127.0.0.1:8000/auth/users/activation/', data=json.dumps(post_data), headers=headers)

        if response.ok:
            return render(request, 'sucesso.html', {'fechar_pagina': True})
        else:
            return render(request, 'erro.html', {'message': 'Erro na requisição JWT'})
    else:
        return render(request, 'erro.html', {'message': 'URL de ativação não fornecida.'})
    
@csrf_exempt 
def exclusao_membro(request):
    usuario_excluido = Usuario.objects.get(id=request.GET.get("id_excluido"))
    usuario_excluido.nm_grupo = None
    usuario_excluido.cd_grupo = None
    usuario_excluido.save()
    return HttpResponse(status=204)
    


