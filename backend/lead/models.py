from django.db import models
from django.contrib.auth import get_user_model
from solve_crm import settings

User = get_user_model()

class Lead(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cnpj = models.CharField(max_length=14, unique=True)
    nomeEmpresa = models.CharField(max_length=255)
    responsavel = models.CharField(max_length=255)
    telefone = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    origem = models.CharField(max_length=500)
    cargo = models.CharField(max_length=255)
    descricao = models.CharField(max_length=500)
    data_cadastro = models.DateField()
    data_ultima_alteracao = models.DateField()
    

