import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator
import matplotlib.gridspec as gridspec
from django.http import FileResponse
from .processamento import ProcessamentoBi
from proposta.models import Venda
from django.http import JsonResponse


def gerar_dados_bi(request):
    motor = ProcessamentoBi()
    dados_prospeccao_lead = motor.indice_prospeccoes_por_leads(request.GET.get("user_id"))
    dados_proposta_prospeccao = motor.indice_proposta_por_prospeccoes(request.GET.get("user_id"))
    dados_vendas_proposta = motor.indice_vendas_por_propostas(request.GET.get("user_id"))
    dados_vendas_prospeccoes = motor.indice_vendas_por_prospeccoes(request.GET.get("user_id"))
    funil = motor.funil(request.GET.get("user_id"))
    data = {
            'prospeccao_lead': dados_prospeccao_lead,
            'proposta_prospeccao': dados_proposta_prospeccao,
            'vendas_proposta': dados_vendas_proposta,
            'vendas_prospeccao': dados_vendas_prospeccoes,
            'funil': funil
        }
        
    return JsonResponse(data)
        

def criar_grafico_pizza_barras(item_1, item_2, nome_item_1, nome_item_2, filepath="/tmp/chart.png", filename="chart.png"):
    labels = [nome_item_1, nome_item_2]
    sizes = [item_1, item_2]
    colors_pizza = ['gold', 'lightskyblue']
    explode_pizza = (0.1, 0)

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 6))  

    ax1.pie(sizes, explode=explode_pizza, labels=labels, colors=colors_pizza,
            autopct='%1.1f%%', shadow=True, startangle=140)
    ax1.axis('equal')
    ax1.set_title(f'{nome_item_1} x {nome_item_2} (Porcentagem)')

    ax2.barh(labels, sizes, color=['gold', 'lightskyblue'])
    ax2.set_title(f'{nome_item_1} x {nome_item_2} (Quantidade)')
    ax2.set_xlabel('Quantidade')
    ax2.set_ylabel('Categorias')
    for i, v in enumerate(sizes):
        ax2.text(v + 1, i, str(v), color='black', va='center')

    fig.tight_layout()  
    fig.savefig(filepath)

    response = FileResponse(open(filepath, 'rb'), content_type='image/png')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response


def proposta_por_prospeccoes(request):
    motor = ProcessamentoBi()
    proposta, prospeccoes = motor.indice_proposta_por_prospeccoes(request.GET.get("user_id"))
    return criar_grafico_pizza_barras(proposta, prospeccoes, "Propostas", "Prospecções")

def prospeccoes_por_leads(request):
    motor = ProcessamentoBi()
    prospeccoes, leads = motor.indice_prospeccoes_por_leads(request.GET.get("user_id"))
    return criar_grafico_pizza_barras(prospeccoes, leads, "Prospecções", "Leads")

def vendas_por_propostas(request):
    motor = ProcessamentoBi()
    propostas_count, propostas = motor.indice_vendas_por_propostas(request.GET.get("user_id"))

    heights = [proposta.valor_proposta for proposta in propostas]

    colors = ['red' if Venda.objects.filter(proposta=proposta.id).exists() else 'blue' for proposta in propostas]

    fig, ax = plt.subplots(figsize=(12, 6))

    ax.bar(range(propostas_count), heights, color=colors)

    ax.set_title('Vendas em Relação às Propostas')
    ax.set_xlabel('Nome das propostas')
    ax.set_ylabel('Valor da Proposta')

    ax.set_xticks(range(propostas_count))
    ax.set_xticklabels([proposta.nome_proposta for proposta in propostas], rotation=45)

    filepath = "/tmp/chart.png"
    fig.tight_layout()  
    fig.savefig(filepath)

    response = FileResponse(open(filepath, 'rb'), content_type='image/png')
    response['Content-Disposition'] = 'attachment; filename="chart.png"'
    return response


def vendas_por_prospeccoes(request):
    motor = ProcessamentoBi()
    total_prospeccoes, prospeccoes, propostas = motor.indice_vendas_por_prospeccoes(request.GET.get("user_id"))

    # Recupere todas as vendas que se originaram de uma prospecção
    vendas_de_prospeccoes = Venda.objects.filter(proposta__in=propostas)

    prospeccoes_com_venda = sum(1 for prospeccao in prospeccoes if any(venda.proposta.prospeccao.id == prospeccao.id for venda in vendas_de_prospeccoes))
    prospeccoes_sem_venda = len(prospeccoes) - prospeccoes_com_venda

    fig, ax = plt.subplots(figsize=(8, 6))

    # Cores ajustadas
    ax.bar('Prospecções', prospeccoes_com_venda, color='dodgerblue', label='Com Venda')
    ax.bar('Prospecções', prospeccoes_sem_venda, bottom=prospeccoes_com_venda, color='salmon', label='Sem Venda')

    ax.set_ylabel('Número de Prospecções')
    ax.set_title('Prospecções que resultaram em Vendas')

    # Ajuste para garantir que o eixo y mostre apenas valores inteiros
    ax.yaxis.set_major_locator(MaxNLocator(integer=True))
    
    ax.legend()

    # Salva a figura
    filepath = "/tmp/grafico_prospeccoes_vendas.png"
    fig.tight_layout()
    fig.savefig(filepath)

    # Resposta com o arquivo para download
    response = FileResponse(open(filepath, 'rb'), content_type='image/png')
    response['Content-Disposition'] = 'attachment; filename="grafico_prospeccoes_vendas.png"'
    return response



def grafico_funil(request):
    motor = ProcessamentoBi()
    total_leads, total_prospeccoes, total_propostas, total_vendas = motor.funil(request.GET.get("user_id"))

    # Dados para o gráfico
    stages = ['Leads', 'Prospecção', 'Proposta', 'Vendas']
    values = [total_leads, total_prospeccoes, total_propostas, total_vendas]

    # Configuração do gráfico
    fig, ax = plt.subplots(figsize=(10, 6))

    # Criação do gráfico de funil
    ax.invert_yaxis()  # Inverte o eixo y para que 'Leads' apareça no topo
    ax.barh(stages, values, align='center', color=['#FF9999', '#66B2FF', '#99FF99', '#FFCC99'])

    ax.set_xlabel('Quantidade')
    ax.set_title('Funil de Vendas')

    # Salva a figura
    filepath = "/tmp/grafico_funil.png"
    fig.tight_layout()
    fig.savefig(filepath)

    # Resposta com o arquivo para download
    response = FileResponse(open(filepath, 'rb'), content_type='image/png')
    response['Content-Disposition'] = 'attachment; filename="grafico_funil.png"'
    return response


def graficos_combinados(request):
    user_id = request.GET.get("user_id")
    motor = ProcessamentoBi()

    fig = plt.figure(figsize=(40, 30)) # Ajustar o tamanho para acomodar os gráficos em três linhas
    gs = gridspec.GridSpec(3, 3)  # 3 linhas, 3 colunas

    # Gráfico 1: Vendas por Propostas
    propostas_count, propostas = motor.indice_vendas_por_propostas(user_id)
    heights = [proposta.valor_proposta for proposta in propostas]
    colors = ['red' if Venda.objects.filter(proposta=proposta.id).exists() else 'blue' for proposta in propostas]

    ax1 = fig.add_subplot(gs[0, 0])
    ax1.bar(range(propostas_count), heights, color=colors)
    ax1.set_title('Vendas em Relação às Propostas')
    ax1.set_xlabel('Nome das propostas')
    ax1.set_ylabel('Valor da Proposta')
    ax1.set_xticks(range(propostas_count))
    ax1.set_xticklabels([proposta.nome_proposta for proposta in propostas], rotation=45)

    # Gráfico 2: Vendas por Prospecções
    total_prospeccoes, prospeccoes, propostas = motor.indice_vendas_por_prospeccoes(user_id)
    vendas_de_prospeccoes = Venda.objects.filter(proposta__in=propostas)
    prospeccoes_com_venda = sum(1 for prospeccao in prospeccoes if any(venda.proposta.prospeccao.id == prospeccao.id for venda in vendas_de_prospeccoes))
    prospeccoes_sem_venda = len(prospeccoes) - prospeccoes_com_venda

    ax2 = fig.add_subplot(gs[0, 1])
    ax2.bar('Prospecções', prospeccoes_com_venda, color='dodgerblue', label='Com Venda')
    ax2.bar('Prospecções', prospeccoes_sem_venda, bottom=prospeccoes_com_venda, color='salmon', label='Sem Venda')
    ax2.set_ylabel('Número de Prospecções')
    ax2.set_title('Prospecções que resultaram em Vendas')
    ax2.legend()

    # Gráfico 3: Funil de Vendas
    total_leads, total_prospeccoes, total_propostas, total_vendas = motor.funil(user_id)
    stages = ['Leads', 'Prospecção', 'Proposta', 'Vendas']
    values = [total_leads, total_prospeccoes, total_propostas, total_vendas]

    ax3 = fig.add_subplot(gs[0, 2])
    ax3.invert_yaxis()
    ax3.barh(stages, values, align='center', color=['#FF9999', '#66B2FF', '#99FF99', '#FFCC99'])
    ax3.set_xlabel('Quantidade')
    ax3.set_title('Funil de Vendas')

     # Gráfico 4: Proposta por Prospecções (Pizza)
    proposta, prospeccao = motor.indice_proposta_por_prospeccoes(user_id)
    labels_pizza = ['Propostas', 'Prospecções']
    sizes_pizza = [proposta, prospeccao]
    colors_pizza = ['gold', 'lightskyblue']
    explode_pizza = (0.1, 0)

    ax4 = fig.add_subplot(gs[1, 0])
    ax4.pie(sizes_pizza, explode=explode_pizza, labels=labels_pizza, colors=colors_pizza,
             autopct='%1.1f%%', shadow=True, startangle=140)
    ax4.axis('equal')
    ax4.set_title('Proposta x Prospecção (Porcentagem)')

    # Gráfico 5: Proposta por Prospecções (Barra)
    labels_bar = ['Propostas', 'Prospecções']
    sizes_bar = [proposta, prospeccao]

    ax5 = fig.add_subplot(gs[1, 1])
    ax5.barh(labels_bar, sizes_bar, color=['gold', 'lightskyblue'])
    ax5.set_title('Proposta x Prospecção (Quantidade)')
    ax5.set_xlabel('Quantidade')
    ax5.set_ylabel('Categorias')
    for i, v in enumerate(sizes_bar):
        ax5.text(v + 1, i, str(v), color='black', va='center')

     # Gráfico 6: Prospecções por Leads (Pizza)
    prospeccao, lead = motor.indice_prospeccoes_por_leads(user_id)
    labels_pizza = ['Prospeccao', 'Lead']
    sizes_pizza = [lead, prospeccao]
    colors_pizza = ['gold', 'lightskyblue']
    explode_pizza = (0.1, 0)

    ax6 = fig.add_subplot(gs[2, 0])
    ax6.pie(sizes_pizza, explode=explode_pizza, labels=labels_pizza, colors=colors_pizza,
             autopct='%1.1f%%', shadow=True, startangle=140)
    ax6.axis('equal')
    ax6.set_title('Prospeccao x Lead (Porcentagem)')

    # Gráfico 7: Prospecções por Leads (Barra)
    labels_bar = ['Prospeccao', 'Lead']
    sizes_bar = [lead, prospeccao]

    ax7 = fig.add_subplot(gs[2, 1])
    ax7.barh(labels_bar, sizes_bar, color=['gold', 'lightskyblue'])
    ax7.set_title('Prospeccao x Lead (Quantidade)')
    ax7.set_xlabel('Quantidade')
    ax7.set_ylabel('Categorias')
    for i, v in enumerate(sizes_bar):
        ax7.text(v + 1, i, str(v), color='black', va='center')

    # Ajustes finais e salvamento
    filepath = "/tmp/graficos_agregados.png"
    fig.tight_layout()
    fig.savefig(filepath)

    # Resposta
    response = FileResponse(open(filepath, 'rb'), content_type='image/png')
    response['Content-Disposition'] = 'attachment; filename="graficos_agregados.png"'
    return response

