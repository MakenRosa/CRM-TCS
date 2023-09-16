from django.db import models
from solve_crm import settings

class Lead(models.Model):
    cnpj = models.CharField(max_length=14, unique=True)
    nomeEmpresa = models.CharField(max_length=255)
    responsavel = models.CharField(max_length=255)
    telefone = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    origem = models.CharField(max_length=500)
    cargo = models.CharField(max_length=255)
    descricao = models.CharField(max_length=500)
    data_cadastro = models.DateField(null=False)
    

