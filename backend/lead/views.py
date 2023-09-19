from rest_framework import viewsets, generics, status
from django.db.models import Q
from rest_framework.response import Response
import math
from datetime import date, datetime

from .models import Lead
from .serializers import LeadsSerializerInsert, LeadsSerializerUpdate


class Leads(generics.GenericAPIView):
    serializer_class = LeadsSerializerInsert

    def get(self, request):
        page_num = int(request.GET.get("page", 1))
        limit_num = int(request.GET.get("limit", 10))
        start_num = (page_num - 1) * limit_num
        end_num = limit_num * page_num
        search_param = request.GET.get("search")
        print(request.META.get('HTTP_USER_ID'))
        leads = Lead.objects.get(user=request.META.get('HTTP_USER_ID'))
        total_leads = leads.count()
        if search_param:
            leads = leads.filter(criar_filtro_pesquisa_lead(search_param))
            total_leads = leads.count()
            if total_leads == 0 :
                return Response({"data": {"message: Lead not found"}}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(leads[start_num:end_num], many=True)
        return Response({
            "data": {"message": "Leads found",
                     "total": total_leads,
                     "page": page_num,
                     "last_page": math.ceil(total_leads / limit_num),
                     "leads": serializer.data}
        },)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": {"message": "Lead successfully registered", "lead": serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({"status": "fail", "data":{"message": serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
        
class LeadsDetails(generics.GenericAPIView):
    serializer_class = LeadsSerializerUpdate

    def get_lead(self, cnpj):
        try:
            return Lead.objects.get(cnpj=cnpj)
        except:
            return None

    def get(self, request, cnpj):
        lead = self.get_lead(cnpj=cnpj)
        if lead == None:
            return Response({"status": "fail", "data": {"message": f"lead with cnpj: {cnpj} not found"}}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(lead)
        return Response({"status": "success", "data": {"message": "Lead found", "lead": serializer.data}})

    def patch(self, request, cnpj):
        lead = self.get_lead(cnpj)
        if lead == None:
            return Response({"status": "fail", "data": {"message": f"lead with cnpj: {cnpj} not found"}}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(
            lead, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.validated_data['updatedAt'] = datetime.now()
            serializer.save()
            return Response({"status": "success", "data": {"message": "Lead successfully updated", "lead": serializer.data}})
        return Response({"status": "fail",  "data": {"message": serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, cnpj):
        lead = self.get_lead(cnpj)
        if lead == None:
            return Response({"status": "fail",  "data": {"message": f"lead with cnpj: {cnpj} not found"}}, status=status.HTTP_404_NOT_FOUND)

        lead.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

def criar_filtro_pesquisa_lead(search_param):
    search_conditions = Q()
    search_conditions |= Q(cargo__icontains=search_param)
    search_conditions |= Q(cnpj__icontains=search_param)
    search_conditions |= Q(descricao__icontains=search_param)
    search_conditions |= Q(data_cadastro__icontains=search_param)
    search_conditions |= Q(email__icontains=search_param)
    search_conditions |= Q(nomeEmpresa__icontains=search_param)
    search_conditions |= Q(origem__icontains=search_param)
    search_conditions |= Q(responsavel__icontains=search_param)
    search_conditions |= Q(telefone__icontains=search_param)
    search_conditions |= Q(user__icontains=search_param)
    return search_conditions

