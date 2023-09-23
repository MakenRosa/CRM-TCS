from rest_framework import viewsets, generics, status
from django.db.models import Q
from rest_framework.response import Response
import math
from datetime import date, datetime

from .models import Prospeccao
from .serializers import ProspeccaoSerializerInsert, ProspeccaoSerializerUpdate


class ProspeccaoView(generics.GenericAPIView):
    serializer_class = ProspeccaoSerializerInsert

    def get(self, request):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        search_param = request.GET.get("search")
        prospeccoes = Prospeccao.objects.all()
        total_prospeccoes = prospeccoes.count()
        if search_param:
            prospeccoes = prospeccoes.filter(criar_filtro_pesquisa_prospeccao(search_param))
            total_prospeccoes = prospeccoes.count()
            if total_prospeccoes == 0:
                return Response({"data": {"message": "Prospecção not found"}}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(prospeccoes[start_num:end_num], many=True)
        return Response({
            "data": {"message": "Prospecções encontradas",
                     "total": total_prospeccoes,
                     "page": page_num,
                     "last_page": math.ceil(total_prospeccoes / limit_num),
                     "prospeccoes": serializer.data}
        })

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"message": "Prospecção registrada com sucesso", "prospecção": serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "fail", "data": {"message": serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)


class ProspeccaoDetails(generics.GenericAPIView):
    serializer_class = ProspeccaoSerializerUpdate

    def get_prospeccao(self, id):
        try:
            return Prospeccao.objects.get(id=id)
        except Prospeccao.DoesNotExist:
            return None

    def get(self, request, id):
        prospeccao = self.get_prospeccao(id=id)
        if prospeccao is None:
            return Response({"status": "fail", "data": {"message": f"Prospecção com ID: {id} não encontrada"}}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(prospeccao)
        return Response({"status": "success", "data": {"message": "Prospecção encontrada", "prospecção": serializer.data}})

    def patch(self, request, id):
        prospeccao = self.get_prospeccao(id=id)
        if prospeccao is None:
            return Response({"status": "fail", "data": {"message": f"Prospecção com ID: {id} não encontrada"}}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(
            prospeccao, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"message": "Prospecção atualizada com sucesso", "prospecção": serializer.data}})
        return Response({"status": "fail", "data": {"message": serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        prospeccao = self.get_prospeccao(id=id)
        if prospeccao is None:
            return Response({"status": "fail", "data": {"message": f"Prospecção com ID: {id} não encontrada"}}, status=status.HTTP_404_NOT_FOUND)

        prospeccao.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def criar_filtro_pesquisa_prospeccao(search_param):
    search_conditions = Q()
    search_conditions |= Q(segmento__icontains=search_param)
    search_conditions |= Q(status__icontains=search_param)
    search_conditions |= Q(nome_negocio__icontains=search_param)
    search_conditions |= Q(data_proxima_acao__icontains=search_param)
    search_conditions |= Q(data_inicio_prospeccao__icontains=search_param)
    search_conditions |= Q(participacao_comercial__icontains=search_param)
    search_conditions |= Q(participacao_efetiva__icontains=search_param)
    search_conditions |= Q(consultor__icontains=search_param)
    search_conditions |= Q(servicos_produtos__icontains=search_param)
    return search_conditions
