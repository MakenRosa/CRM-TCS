from django.db import models

class Usuario(models.Model):
    email = models.CharField(max_length=256)
    senha = models.CharField(max_length=100)
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=11)

    def __str__(self):
        return self.nome
