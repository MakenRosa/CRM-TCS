from django.urls import path
from .views import HistoricoView

urlpatterns = [
    path('', HistoricoView.as_view()),
]
