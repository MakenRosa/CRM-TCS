from django.urls import path
from .views import PropostaView, PropostaDetails, TarefaView

urlpatterns = [
    path('', PropostaView.as_view()),
    path('<int:id>/', PropostaDetails.as_view()),
    path('tarefa/', TarefaView.as_view()),
]
