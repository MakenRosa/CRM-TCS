from lead.models import Lead
from prospeccao.models import Prospeccao
from proposta.models import Proposta, Venda, Perdido


class ProcessamentoBi:
    def indice_prospeccoes_por_leads(self, user_id):
        total_leads = Lead.objects.filter(user=user_id).count()
        total_prospeccoes = self.get_prospecoes(user_id).count()
        return total_prospeccoes, total_leads
    
    def indice_proposta_por_prospeccoes(self, user_id):
        total_prospeccoes = self.get_prospecoes(user_id).count()
        total_propostas = Proposta.objects.filter(consultor_prop=user_id).count()
        return  total_propostas, total_prospeccoes
    
    def indice_vendas_por_propostas(self, user_id):
        propostas = Proposta.objects.filter(consultor_prop=user_id)
        return  propostas.count(), propostas
    
    def indice_vendas_por_prospeccoes(self, user_id):
        prospeccoes = self.get_prospecoes(user_id)
        propostas = self.get_propostas_por_prospeccao(user_id)
        return prospeccoes.count(), prospeccoes, propostas
    
    def funil(self, user_id):
        total_leads = Lead.objects.filter(user=user_id).count()
        total_prospeccoes = self.get_prospecoes(user_id).count()
        total_propostas = Proposta.objects.filter(consultor_prop=user_id).count()
        total_venda = self.get_vendas(user_id).count()
        return total_leads, total_prospeccoes, total_propostas, total_venda


    def get_prospecoes(self, user_id):
        leads_id = []
        leads = Lead.objects.filter(user=user_id)
        for lead in leads:
            leads_id.append(lead.id)
        return Prospeccao.objects.filter(lead__in=leads_id)
    
    def get_vendas(self, user_id):
        propostas_id = []
        propostas = Proposta.objects.filter(consultor_prop=user_id)
        for proposta in propostas:
            propostas_id.append(proposta.id)
        return Venda.objects.filter(proposta__in=propostas_id)
    
    def get_propostas_por_prospeccao(self, user_id):
        prospeccoes_id = []
        prospeccoes = self.get_prospecoes(user_id)
        for prospeccao in prospeccoes:
            prospeccoes_id.append(prospeccao.id)
        return Proposta.objects.filter(prospeccao__in=prospeccoes_id)



