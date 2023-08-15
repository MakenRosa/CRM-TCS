from django.db import models

class Usuario(models.Model):
    email = models.CharField(max_length=256, unique=True)
    senha = models.CharField(max_length=100)
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=11)

    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    def __str__(self):
        return self.nome
