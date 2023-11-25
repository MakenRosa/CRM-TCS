from rest_framework import views
from rest_framework.response import Response

from lead.models import Lead
from prospeccao.models import Prospeccao

from .serializers import HistoricoSerializer
from .models import Historico
from django.db.models import Q

class HistoricoView(views.APIView):
    serializer_class = HistoricoSerializer

    def get(self, request):
        prospeccao_id = request.GET.get("prospeccao_id")
        lead_id = Prospeccao.objects.get(id=prospeccao_id).lead.id

        # Filtra por lead e por prospeccao_id ou onde prospeccao é nula
        dados_historico = Historico.objects.filter(
            Q(lead=lead_id),
            Q(prospeccao=prospeccao_id) | Q(prospeccao__isnull=True)
        )
        serializer = self.serializer_class(dados_historico, many=True)
        return Response({
            "data": {"message": "Historico found",
                     "dados_historico": serializer.data}
        },)
    
    
