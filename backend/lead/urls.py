from django.urls import path
from lead.views import Leads, LeadsDetails

urlpatterns = [
    path('', Leads.as_view()),
    path('<str:cnpj>', LeadsDetails.as_view())
]
