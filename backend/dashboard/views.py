from django.http import JsonResponse
from lead.models import Lead
from django.db.models import Sum
from rest_framework.permissions import IsAuthenticated

# def total_dashboard(request):
#     total_vendas_dinheiro = Venda.objects.aggregate(Sum('valor_venda'))['valor_venda__sum'] or 0
#     total_vendas_conquistadas = Venda.objects.count()
#     total_clientes_cadastrados = Lead.objects.count()

#     permission_classes = (IsAuthenticated,)

#     data = {
#         'total_vendas_dinheiro': total_vendas_dinheiro,
#         'total_vendas_conquistadas': total_vendas_conquistadas,
#         'total_clientes_cadastrados': total_clientes_cadastrados,
#     }

#     return JsonResponse(data)
