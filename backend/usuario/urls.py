
from django.urls import path
from .views import CustomTokenObtainPairView, comissao

urlpatterns = [
    path('jwt/create/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('comissao/', comissao),

]
