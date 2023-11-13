from django.urls import path
from .views_excel import criar_relatorio_excel
from .views_pdf import criar_relatorio_pdf

urlpatterns = [
    path('excel/', criar_relatorio_excel),
    path('pdf/', criar_relatorio_pdf),
    ]
