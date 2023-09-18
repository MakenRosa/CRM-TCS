from rest_framework import viewsets
from .models import Usuario
from .serializers import UsuarioSerializer, InviteSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from urllib.parse import unquote
import requests
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
import json


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
        return response
        

class InviteView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = InviteSerializer(data=request.data)
        if serializer.is_valid():
            to = serializer.validated_data['to']
            subject = "Invite Solve CRM"
            message = "Participe do time: http://localhost:3000/register"

            send_mail(subject, message, 'solvecrmconfig@gmail.com', [to])

            return Response({'message': 'E-mail sent successfully'})
        return Response(serializer.errors, status=400)
    


def ativacao(request):
    activation_url = request.GET.get('url', '')
    if activation_url:
        decoded_url = unquote(activation_url)
        parts = decoded_url.split('/')
        token = parts[-1]
        uid = parts[-2]

        # Montar os dados para a requisição POST
        post_data = {
            'uid': uid,
            'token': token
        }

        headers = {'Content-Type': 'application/json'}
        response = requests.post('http://127.0.0.1:8000/auth/users/activation/', data=json.dumps(post_data), headers=headers)

        if response.ok:
            return JsonResponse({'deu boa': 'TOMA SOCIEDADE'})
        else:
            return JsonResponse({'error': 'Erro na requisição JWT'}, status=500)
    else:
        return JsonResponse({'error': 'URL de ativação não fornecida.'}, status=400)

