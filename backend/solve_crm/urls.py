from django.urls import path, include
from usuario.views import InviteView, ativacao, exclusao_membro
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Snippets API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


#rotas

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('send_email/', InviteView.as_view(), name='send_email'),
    path('activation/', ativacao, name='ativacao'),
    path('api/leads/', include('lead.urls')),
    path('auth/', include('usuario.urls')),
    path('api/prospeccao/', include('prospeccao.urls')),
    path('api/proposta/', include('proposta.urls')),
    path('api/totals/', include('dashboard.urls')),
    path('api/grupo/', include('grupo.urls')),
    path('api/grupo/excluir/', exclusao_membro, name='exclusao'),
    path('api/historico/', include('historico.urls')),
   
]

#djoser
urlpatterns += [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

# swagger
urlpatterns += [
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'), 
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),  
   
]