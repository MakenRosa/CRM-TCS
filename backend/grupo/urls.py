from django.urls import path
from grupo.views import Grupo, GrupoDetails

urlpatterns = [
    path('', Grupo.as_view()),
    path('<str:nm_grupo>', GrupoDetails.as_view())
]
