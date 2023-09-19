from django.utils import timezone
from django.db import models
from lead.models import Lead

class Prospeccao(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE , default=1)  
    segmento = models.CharField(max_length=255)
    situacao = models.CharField(max_length=255)
    perfil = models.CharField(max_length=255)
    data_cadastro = models.DateField()
    data_ultimo_contato = models.DateField()
    desc_ultimo_contato = models.TextField()
    data_proxima_acao = models.DateField()
    informacoes_do_produto = models.TextField()
    comissao = models.BooleanField()
    modalidade = models.CharField(max_length=255)
    numero_versao = models.IntegerField()
    data_ultima_alteracao = models.DateField()
    