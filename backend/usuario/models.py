from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth.models import Group

class UserAccountManager(BaseUserManager):
    def create_user(self, email, nm_grupo, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError('Usuario precisa de um e-mail')

        email = self.normalize_email(email)
        admin = False
        if nm_grupo == 'novo_grupo':
            nm_grupo = Group.objects.create(name=f"grupo_{email.split('@')[0]}") 
            admin = True
        else:
            nm_grupo = Group.objects.get(name=nm_grupo)
        
        user = self.model(
            email=email, cd_grupo=nm_grupo,  nm_grupo=nm_grupo.name, is_staff=admin, first_name=first_name, last_name=last_name, **extra_fields)

        user.set_password(password)
        user.save()

        return user

class Usuario(AbstractBaseUser, PermissionsMixin):
    cd_grupo = models.ForeignKey(Group, on_delete=models.DO_NOTHING)
    nm_grupo = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    cpf = models.CharField(max_length=11)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nm_grupo', 'first_name', 'last_name']

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return self.email