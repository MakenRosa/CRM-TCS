from django.urls import path
from .views import ProspeccaoView, ProspeccaoDetails

urlpatterns = [
    path('', ProspeccaoView.as_view()),
    path('<int:id>/', ProspeccaoDetails.as_view()),
]
