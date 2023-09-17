from django.urls import path
from .views import Prospeccao, ProspeccaoDetails

urlpatterns = [
    path('', Prospeccao.as_view()),
    path('<int:id>/', ProspeccaoDetails.as_view()),
]
