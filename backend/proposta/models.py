from django.db import models
from django.contrib.auth import get_user_model
from lead.models import Lead
from prospeccao.models import Prospeccao

User = get_user_model()

class Proposta(models.Model):
    nome_proposta = models.CharField(max_length=255)
    data_cadastro = models.DateField()
    desc_proposta = models.CharField()
    consultor_prop = models.ForeignKey(User, on_delete=models.CASCADE)
    tipo_projeto = models.CharField(max_length=255)
    influenciador_decisor = models.CharField(max_length=255)
    perfil_orcamento = models.CharField(max_length=255)
    prob_fechamento = models.CharField(max_length=255)
    status_proposta = models.CharField(max_length=255)
    valor_proposta = models.FloatField()
    material_insumo = models.CharField(max_length=500)
    servicos = models.CharField()
    somatorio = models.FloatField()
    tipo_contato = models.CharField()
    versao = models.CharField()
    ativa = models.BooleanField()

    prospeccao = models.ForeignKey(Prospeccao, on_delete=models.CASCADE, related_name='propostas')