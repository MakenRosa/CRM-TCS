from django.urls import path
from .views import PropostaView, PropostaDetails

urlpatterns = [
    path('', PropostaView.as_view()),
    path('<int:id>/', PropostaDetails.as_view()),
]
