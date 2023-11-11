from django.urls import path
from .views import criar_relatorio_excel

urlpatterns = [
    path('', criar_relatorio_excel),
    ]
