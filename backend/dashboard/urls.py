from django.urls import path
from dashboard.views import OportunityTotalsView

urlpatterns = [
    path('', OportunityTotalsView.as_view()),
]