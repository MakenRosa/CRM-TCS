from rest_framework import views
from rest_framework.response import Response

from lead.models import Lead
from prospeccao.models import Prospeccao

from .serializers import HistoricoSerializer

class HistoricoView(views.APIView):
    def get(self, request):
        user_id = request.GET.get("user_id")
        lead = self.get_leads(user_id)
        prospeccao = self.get_prospeccao(user_id)
        historico_data= {
            "lead_historico": lead,
            "prospeccao_historico": prospeccao
            }
        print(historico_data)
        results = HistoricoSerializer(historico_data).data
        return Response(results)
    

    def get_leads(self, user_id):
        lead = Lead.objects.filter(user=user_id).first()
        if lead:
            lead_data = {
                "data_cadastro_lead": lead.data_cadastro,
                "data_ultima_alteracao_lead": lead.data_ultima_alteracao,
                "nome_empresa": lead.nomeEmpresa
            }
            return lead_data
        else:
            return None
    
    def get_prospeccao(self, user_id):
        leads = Lead.objects.filter(user=user_id)[0]
        prospeccao = Prospeccao.objects.filter(lead=leads.id)[0]
        prospeccao_data = {
            "data_contato_inicial": prospeccao.data_contato_inicial,
            "data_proxima_acao": prospeccao.data_proxima_acao,
            "versao": prospeccao.versao,
            "nome_negocio": prospeccao.nome_negocio,
            "segmento": prospeccao.segmento,
            "participacao_comercial": prospeccao.participacao_comercial,
            "participacao_efetiva": prospeccao.participacao_efetiva
        }
        return prospeccao_data
