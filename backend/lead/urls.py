from django.urls import path
from lead.views import Leads, LeadsDetails, LeadsID

urlpatterns = [
    path('', Leads.as_view()),
    path('<str:cnpj>', LeadsDetails.as_view()),
    path('<int:id>/', LeadsID.as_view())
]
