from lead.models import Lead
from prospeccao.models import Prospeccao
from rest_framework import generics
from rest_framework.response import Response


class OportunityTotals(generics.GenericAPIView):

    def get(self, request):
        total_lead = self.get_leads(request)
        total_prospeccao, total_negociacao = self.get_prospeccao(request)
        return Response({
            "data": {"message": "Total found",
                     "total_lead": total_lead,
                     "total_prospeccao": total_prospeccao,
                     "total_negociacao": total_negociacao}
        },)
    
    def get_leads(self, request):
        user_id = request.GET.get("user_id")
        leads = Lead.objects.filter(user=user_id)
        total_leads = leads.count()
        return total_leads
    
    def get_prospeccao(self, request):
        total_negociacao = 0
        total_prospeccao = 0
        leads_id = []
        user_id = request.GET.get("user_id")
        leads = Lead.objects.filter(user=user_id)
        for lead in leads:
            leads_id.append(lead.id)
        prospeccoes = Prospeccao.objects.filter(lead__in=leads_id)
        for prospeccao in prospeccoes:
            if prospeccao.status == 'Em negociação':
                total_negociacao += 1
            elif prospeccao.status == 'Em prospecção':
                total_prospeccao += 1
        return total_prospeccao, total_negociacao
