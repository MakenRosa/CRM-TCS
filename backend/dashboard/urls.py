from django.urls import path
from dashboard.views import OportunityTotals

urlpatterns = [
    path('', OportunityTotals.as_view()),
]