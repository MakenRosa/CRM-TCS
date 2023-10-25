import math
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Proposta
from .serializers import PropostaSerializerInsert, PropostaSerializerUpdate
from django.db.models import Q
from usuario.models import Usuario
from lead.models import Lead


class PropostaView(generics.GenericAPIView):
    serializer_class = PropostaSerializerInsert

    def get(self, request):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        search_param = request.GET.get("search")

        propostas = Proposta.objects.all()

        if search_param:
            propostas = propostas.filter(criar_filtro_pesquisa_proposta(search_param))

        total_propostas = propostas.count()

        propostas_paginadas = propostas[start_num:end_num]

        serializer = self.serializer_class(propostas_paginadas, many=True)

        return Response({
            "data": {
                "message": "Propostas encontradas",
                "total": total_propostas,
                "page": page_num,
                "last_page": math.ceil(total_propostas / limit_num),
                "propostas": serializer.data
            }
        })

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
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

def gerar_versao(id):
    ultima_versao_proposta = Proposta.objects.get(id=id).versao
    return ultima_versao_proposta + 1

def get_nome_usuario(id_prospecao):
    lead = Proposta.objects.get(id=id_prospecao).lead
    user = Lead.objects.get(id=lead.id).user
    email = Usuario.objects.get(id=user.id).email
    return email.split('@')[0]