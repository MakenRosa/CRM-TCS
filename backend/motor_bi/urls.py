from django.urls import path
from .views import proposta_por_prospeccoes, prospeccoes_por_leads, vendas_por_propostas, vendas_por_prospeccoes, grafico_funil, graficos_combinados, gerar_dados_bi

urlpatterns = [
    path('proposta-prospeccoes/', proposta_por_prospeccoes),
    path('prospeccoes-leads/', prospeccoes_por_leads),
    path('vendas-proposta/', vendas_por_propostas),
    path('vendas-prospeccao/', vendas_por_prospeccoes),
    path('vendas-prospeccao/', vendas_por_prospeccoes),
    path('funil/', grafico_funil),
    path('menu/', gerar_dados_bi),
]
