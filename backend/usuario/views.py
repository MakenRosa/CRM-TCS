from django.shortcuts import render
from rest_framework import viewsets
from .models import Usuario
from .serializers import UsuarioSerializer, InviteSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail


#Acoes relacionadas aos usuarios do sistema:

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class InviteView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = InviteSerializer(data=request.data)
        if serializer.is_valid():
            to = serializer.validated_data['to']
            subject = serializer.validated_data['subject']
            message = serializer.validated_data['message']

            send_mail(subject, message, 'your@example.com', [to])

            return Response({'message': 'E-mail sent successfully'})
        return Response(serializer.errors, status=400)
