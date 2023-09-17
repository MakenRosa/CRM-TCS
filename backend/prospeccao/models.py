from django.db import models

class Prospeccao(models.Model):
    segmento = models.CharField(max_length=255)
    situacao = models.CharField(max_length=255)
    perfil = models.CharField(max_length=255)
    data_cadastro = models.DateField()
    data_ultimo_contato = models.DateField()
    desc_ultimo_contato = models.TextField()
    data_proxima_acao = models.DateField()
    informacoes_do_produto = models.TextField()
    comissao = models.FloatField()
    modalidade = models.CharField(max_length=255)
    numero_versao = models.IntegerField()
    