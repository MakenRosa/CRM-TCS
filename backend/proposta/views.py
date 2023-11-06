import math
from rest_framework import generics, status
from rest_framework.response import Response


from .models import Proposta, Tarefa, Venda, Perdido
from .serializers import PropostaSerializerInsert, PropostaSerializerUpdate, TarefaSerializerInsert, VendaSerializer, PerdidoSerializer
from django.db.models import Q
from django.db.models import Max
from .utils import Versionamento


class PropostaView(generics.GenericAPIView):
    serializer_class = PropostaSerializerInsert

    def get(self, request):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        search_param = request.GET.get("search")
        user_id = request.GET.get("user_id")
        propostas = Proposta.objects.filter(consultor_prop=user_id)
        if search_param:
            propostas = propostas.filter(criar_filtro_pesquisa_proposta(search_param))

        propostas_agrupadas = organizar_propostas(propostas)
        total_propostas = len(propostas_agrupadas)
        propostas_paginadas = list(propostas_agrupadas.values())[start_num:end_num]


        return Response({
                "message": "Propostas encontradas",
                "total": total_propostas,
                "page": page_num,
                "last_page": math.ceil(total_propostas / limit_num),
                "propostas": propostas_paginadas
        })

    def post(self, request):
        serializer = self.serializer_class(data=gerar_versao(request.data))
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"message": "Proposta registrada com sucesso", "proposta": serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "fail", "data": {"message": serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

class PropostaDetails(generics.GenericAPIView):
    serializer_class = PropostaSerializerUpdate

    def get_proposta(self, id):
        try:
            return Proposta.objects.get(id=id)
        except Proposta.DoesNotExist:
            return None

    def get(self, request, id):
        proposta = self.get_proposta(id=id)
        if proposta is None:
            return Response({"status": "fail", "data": {"message": f"Proposta com ID: {id} não encontrada"}}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(proposta)
        return Response({"status": "success", "data": {"message": "Proposta encontrada", "proposta": serializer.data}})

    def patch(self, request, id):
        proposta = self.get_proposta(id=id)
        if proposta is None:
            return Response({"status": "fail", "data": {"message": f"Proposta com ID: {id} não encontrada"}}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(
            proposta, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"message": "Proposta atualizada com sucesso", "proposta": serializer.data}})
        return Response({"status": "fail", "data": {"message": serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        proposta = self.get_proposta(id=id)
        if proposta is None:
            return Response({"status": "fail", "data": {"message": f"Proposta com ID: {id} não encontrada"}}, status=status.HTTP_404_NOT_FOUND)

        proposta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
def criar_filtro_pesquisa_proposta(search_param):
    search_conditions = Q()
    search_conditions |= Q(nome_proposta__icontains=search_param)
    search_conditions |= Q(tipo_projeto__icontains=search_param)
    search_conditions |= Q(influenciador_decisor__icontains=search_param)
    search_conditions |= Q(perfil_orcamento__icontains=search_param)
    search_conditions |= Q(status_proposta__icontains=search_param)
    search_conditions |= Q(tipo_contato__icontains=search_param)
    search_conditions |= Q(data_cadastro__icontains=search_param)
    search_conditions |= Q(data_tarefa__icontains=search_param)
    search_conditions |= Q(material_insumo__icontains=search_param)


    return search_conditions

def gerar_versao(data):
    id = data.get('id')
    versao = Versionamento.incrementar_versao(id)
    data['versao'] = str(versao)
    maior_id = Proposta.objects.aggregate(maior_id=Max('id'))['maior_id']
    data['id'] = maior_id + 1
    return data

def organizar_propostas(propostas):
    propostas = propostas.order_by('versao', 'id')
    propostas_agrupadas = {}
    for proposta in propostas:
        versao = proposta.versao.split('-')[0]  # Obter a parte antes do hífen
        if versao not in propostas_agrupadas:
            propostas_agrupadas[versao] = {"proposta": None, "subPropostas": []}
        if '-' in proposta.versao:
            propostas_agrupadas[versao]["subPropostas"].append(PropostaSerializerInsert(proposta).data)
        else:
            propostas_agrupadas[versao]["proposta"] = PropostaSerializerInsert(proposta).data
    
    return propostas_agrupadas

class TarefaView(generics.GenericAPIView):
    serializer_class = TarefaSerializerInsert

    def get(self, request):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        proposta_id = request.GET.get("proposta_id")
        tarefas = Tarefa.objects.filter(proposta=proposta_id)
        total_tarefas = len(tarefas)
        tarefas_paginadas = list(tarefas.values())[start_num:end_num]


        return Response({
                "message": "Tarefas encontradas",
                "total": total_tarefas,
                "page": page_num,
                "last_page": math.ceil(total_tarefas / limit_num),
                "tarefas": tarefas_paginadas
        })

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"message": "Tarefa registrada com sucesso", "tarefa": serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "fail", "data": {"message": serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)


class VendaView(generics.GenericAPIView):

    serializer_class = VendaSerializer

    def get(self, request):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        proposta_id = request.GET.get("proposta_id")
        vendas = Venda.objects.filter(proposta=proposta_id)
        total_vendas = len(vendas)
        vendas_paginadas = list(vendas.values())[start_num:end_num]


        return Response({
                "message": "vendas encontradas",
                "total": total_vendas,
                "page": page_num,
                "last_page": math.ceil(total_vendas / limit_num),
                "vendas": vendas_paginadas
        })

    def post(self, request):
        proposta = Proposta.objects.get(id=request.data.get('proposta'))
        request.data['valor_proposta'] = proposta.valor_proposta
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"message": "Venda registrada com sucesso", "venda": serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "fail", "data": {"message": serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
        
class PerdidoView(generics.GenericAPIView):
    serializer_class = PerdidoSerializer

    def get(self, request):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        proposta_id = request.GET.get("proposta_id")
        perdidos = Perdido.objects.filter(proposta=proposta_id)
        total_perdidos = len(perdidos)
        perdidos_paginadas = list(perdidos.values())[start_num:end_num]


        return Response({
                "message": "perdidos encontradas",
                "total": total_perdidos,
                "page": page_num,
                "last_page": math.ceil(total_perdidos / limit_num),
                "perdidos": perdidos_paginadas
        })

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"message": "Perdido registrada com sucesso", "perdido": serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "fail", "data": {"message": serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)