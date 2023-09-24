from django.utils import timezone
from django.db import models
from lead.models import Lead

class Prospeccao(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE , default=1) 
    nome_negocio = models.CharField(max_length=255)
    segmento = models.CharField(max_length=255)
    servicos_produtos = models.CharField(max_length=255)
    participacao_comercial = models.CharField(max_length=255)
    participacao_efetiva = models.CharField(max_length=255)
    consultor = models.CharField(max_length=255)
    comissao = models.BooleanField(null=True)
    data_inicio_prospeccao = models.DateField()
    data_contato_incial= models.DateField()
    data_proxima_acao = models.DateField()
    preferencia_contato = models.CharField(max_length=255)
    horario_contato = models.CharField(max_length=255)
    observacao = models.CharField(max_length=255, null=True)
    status = models.CharField(max_length=255)
    