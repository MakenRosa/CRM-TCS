from django.urls import path
from .views import PropostaView, PropostaDetails, TarefaView, VendaView, PerdidoView, TarefaDetails

urlpatterns = [
    path('', PropostaView.as_view()),
    path('<int:id>/', PropostaDetails.as_view()),
    path('tarefa/', TarefaView.as_view()),
    path('tarefa/<int:id>/', TarefaDetails.as_view()),
    path('venda/', VendaView.as_view()),
    path('perdido/', PerdidoView.as_view()),
]
