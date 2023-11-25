import django
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Historico(models.Model):
    lead = models.IntegerField()
    prospeccao = models.IntegerField(null=True)
    etapa = models.CharField(max_length=25)
    data_ocorrencia =  models.DateTimeField(default=django.utils.timezone.now)
    ocorrencia =  models.CharField(max_length=25)
    informacoes = models.CharField(max_length=255, null=True)