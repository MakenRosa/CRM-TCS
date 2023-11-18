from lead.models import Lead
from prospeccao.models import Prospeccao
from proposta.models import Proposta, Venda, Perdido
from django.db.models import Sum
from collections import defaultdict
from datetime import datetime
import json





class ProcessamentoBi:
    def indice_prospeccoes_por_leads(self, user_id):
        leads = Lead.objects.filter(user=user_id)
        prospeccoes = self.get_prospecoes(user_id)
        total_leads = leads.count()
        total_prospeccoes = prospeccoes.count()
        if total_leads == 0:
            razao = 0
        else:
            razao = total_prospeccoes/total_leads
        mes_lead = self.contar_ocorrencias_por_mes_cadastro(leads) 
        mes_prospeccao = self.contar_ocorrencias_por_mes_prospeccao(prospeccoes) 
        return {'total_prospeccoes': total_prospeccoes, 'total_leads': total_leads, 'razao': razao, 'analise_quantidade_lead': mes_lead, 'analise_quantidade_prospeccao': mes_prospeccao}
    
    def indice_proposta_por_prospeccoes(self, user_id):
        prospeccoes = self.get_prospecoes(user_id)
        propostas = Proposta.objects.filter(consultor_prop=user_id)
        total_prospeccoes = prospeccoes.count()
        total_propostas = propostas.count()
        if total_prospeccoes == 0:
            razao = 0
        else:
            razao = total_propostas/total_prospeccoes
        mes_propostas = self.contar_ocorrencias_por_mes_cadastro(propostas)
        mes_prospeccao = self.contar_ocorrencias_por_mes_prospeccao(prospeccoes)
        return  {'total_propostas': total_propostas, 'total_prospeccoes': total_prospeccoes, 'razao': razao, 'analise_quantidade_propostas': mes_propostas, 'analise_quantidade_prospeccao': mes_prospeccao}
    
    def indice_vendas_por_propostas(self, user_id):
        propostas = Proposta.objects.filter(consultor_prop=user_id)
        total_propostas = propostas.count()
        vendas = self.get_vendas(user_id)
        total_vendas = vendas.count()
        valor_vendas = vendas.aggregate(Sum('valor_proposta'))['valor_proposta__sum'] or 0
        if total_propostas == 0:
            razao = 0
        else:
            razao = total_vendas/total_propostas
        mes_propostas = self.contar_ocorrencias_por_mes_cadastro(propostas)
        mes_venda = self.contar_ocorrencias_por_mes_fechamento(vendas)
        return  {'total_propostas': total_propostas, 'total_vendas': total_vendas, 'razao': razao, 'valor_vendas': valor_vendas, 'analise_quantidade_propostas': mes_propostas, 'analise_quantidade_venda': mes_venda}
    
    def indice_vendas_por_prospeccoes(self, user_id):
        prospeccoes = self.get_prospecoes(user_id)
        total_prospeccoes = prospeccoes.count()
        vendas = self.get_vendas(user_id)
        total_vendas = vendas.count()
        valor_vendas = vendas.aggregate(Sum('valor_proposta'))['valor_proposta__sum'] or 0
        if total_prospeccoes == 0:
            razao = 0
        else:
            razao = total_vendas/total_prospeccoes
        mes_prospeccoes = self.contar_ocorrencias_por_mes_prospeccao(prospeccoes)
        mes_venda = self.contar_ocorrencias_por_mes_fechamento(vendas)
        return {'total_prospeccoes': total_prospeccoes, 'total_vendas': total_vendas, 'razao': razao, 'valor_vendas': valor_vendas, 'analise_quantidade_prospeccoes': mes_prospeccoes, 'analise_quantidade_venda': mes_venda}
    
    def funil(self, user_id):
        total_leads = Lead.objects.filter(user=user_id).count()
        total_prospeccoes = self.get_prospecoes(user_id).count()
        total_propostas = Proposta.objects.filter(consultor_prop=user_id).count()
        total_venda = self.get_vendas(user_id).count()
        return {'total_leads': total_leads, 'total_prospeccoes': total_prospeccoes, 'total_propostas': total_propostas, 'total_venda': total_venda}
    

    def contar_ocorrencias_por_mes_cadastro(self, objetos):
        ocorrencias = {mes: 0 for mes in [
            "janeiro", "fevereiro", "marco", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ]}
        
        for obj in objetos:
            mes = self.mes_em_portugues(obj.data_cadastro.month)
            ocorrencias[mes] += 1

        return ocorrencias
    
    def contar_ocorrencias_por_mes_prospeccao(self, objetos):
        ocorrencias = {mes: 0 for mes in [
            "janeiro", "fevereiro", "marco", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ]}
        
        for obj in objetos:
            mes = self.mes_em_portugues(obj.data_inicio_prospeccao.month)
            ocorrencias[mes] += 1

        return ocorrencias
    
    def contar_ocorrencias_por_mes_fechamento(self, objetos):
        ocorrencias = {mes: 0 for mes in [
            "janeiro", "fevereiro", "marco", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ]}
        
        for obj in objetos:
            mes = self.mes_em_portugues(obj.data_fechamento.month)
            ocorrencias[mes] += 1

        return ocorrencias

    def mes_em_portugues(self, mes_numero):
        meses = {
            1: "janeiro",
            2: "fevereiro",
            3: "marco",
            4: "abril",
            5: "maio",
            6: "junho",
            7: "julho",
            8: "agosto",
            9: "setembro",
            10: "outubro",
            11: "novembro",
            12: "dezembro"
        }
        return meses[mes_numero]



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
    
    def get_perdidos(self, user_id):
        propostas_id = []
        propostas = Proposta.objects.filter(consultor_prop=user_id)
        for proposta in propostas:
            propostas_id.append(proposta.id)
        return Perdido.objects.filter(proposta__in=propostas_id)
    
    def get_propostas_por_prospeccao(self, user_id):
        prospeccoes_id = []
        prospeccoes = self.get_prospecoes(user_id)
        for prospeccao in prospeccoes:
            prospeccoes_id.append(prospeccao.id)
        return Proposta.objects.filter(prospeccao__in=prospeccoes_id)



