


from lead.models import Lead
from proposta.models import Perdido
from usuario.models import Usuario
from django.http import HttpResponse
from openpyxl import Workbook
import os
import tempfile
from zipfile import ZipFile
from django.http import HttpResponse
from io import BytesIO
from motor_bi.processamento import ProcessamentoBi
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import landscape


def criar_relatorio_pdf(request):
    user_id = request.GET.get('user_id')
    motor = ProcessamentoBi()
    leads = Lead.objects.filter(user=user_id)
    prospeccoes = motor.get_prospecoes(user_id)
    propostas = motor.get_propostas_por_prospeccao(user_id)
    vendas = motor.get_vendas(user_id)
    perdidos = motor.get_perdidos(user_id)
    usuario = Usuario.objects.get(id=user_id)
    usuarios_grupos = Usuario.objects.filter(cd_grupo=usuario.cd_grupo)

    if 'data_criacao' in request.GET:
        leads = leads.filter(data_cadastro=request.GET['data_criacao'])
        prospeccoes = prospeccoes.filter(data_inicio_prospeccao=request.GET['data_criacao'])
        propostas = propostas.filter(data_cadastro=request.GET['data_criacao'])
        vendas = vendas.filter(data_fechamento=request.GET['data_criacao'])
        perdidos = perdidos.filter(data_fechamento=request.GET['data_criacao'])

    if 'data_ultima_alteracao' in request.GET:
        leads = leads.filter(data_ultima_alteracao=request.GET['data_ultima_alteracao'])
        prospeccoes = prospeccoes.filter(data_contato_inicial=request.GET['data_ultima_alteracao'])
    if 'data_proxima_acao' in request.GET:
        prospeccoes = prospeccoes.filter(data_proxima_acao=request.GET['data_proxima_acao'])
    
    if 'estagio_negocio' in request.GET:
        estagio = request.GET.get('estagio_negocio')
        if estagio == 'Lead':
            pdf_content = gerar_pdf_leads(leads)
            return baixar_arquivo(pdf_content, 'Leads.pdf')
        elif estagio == 'Prospeccao':
            pdf_content = gerar_pdf_prospeccoes(prospeccoes)
            return baixar_arquivo(pdf_content, 'Prospeccoes.pdf')
        elif estagio == 'Proposta':
            pdf_content = gerar_pdf_propostas(propostas)
            return baixar_arquivo(pdf_content, 'Propostas.pdf')
        elif estagio == 'Venda':
            pdf_content = gerar_pdf_transacoes(vendas, 'Vendas')
            return baixar_arquivo(pdf_content, 'Vendas.pdf')
        elif estagio == 'Perdido':
            pdf_content = gerar_pdf_transacoes(perdidos, 'Perdido')
            return baixar_arquivo(pdf_content, 'Perdido.pdf')

    else:
        with tempfile.TemporaryDirectory() as tmpdirname:
            leads_pdf_path = os.path.join(tmpdirname, 'Leads.pdf')
            prospeccoes_pdf_path = os.path.join(tmpdirname, 'Prospeccoes.pdf')
            propostas_pdf_path = os.path.join(tmpdirname, 'Propostas.pdf')
            vendas_pdf_path = os.path.join(tmpdirname, 'Vendas.pdf')
            perdidos_pdf_path = os.path.join(tmpdirname, 'Perdidos.pdf')
            comissao_pdf_path = os.path.join(tmpdirname, 'Comissao.pdf')

            with open(leads_pdf_path, 'wb') as f:
                f.write(gerar_pdf_leads(leads)) 
            with open(prospeccoes_pdf_path, 'wb') as f:
                f.write(gerar_pdf_prospeccoes(prospeccoes))
            with open(propostas_pdf_path, 'wb') as f:
                f.write(gerar_pdf_propostas(propostas))
            with open(vendas_pdf_path, 'wb') as f:
                f.write(gerar_pdf_transacoes(vendas, 'Vendas'))
            with open(perdidos_pdf_path, 'wb') as f:
                f.write(gerar_pdf_transacoes(perdidos, 'Perdidos'))
            with open(comissao_pdf_path, 'wb') as f:
                f.write(gerar_pdf_grupo(usuarios_grupos))

            zip_filename = os.path.join(tmpdirname, 'relatorio-geral.zip')
            with ZipFile(zip_filename, 'w') as zipf:
                zipf.write(leads_pdf_path, 'Leads.pdf')
                zipf.write(prospeccoes_pdf_path, 'Prospeccoes.pdf')
                zipf.write(propostas_pdf_path, 'Propostas.pdf')
                zipf.write(vendas_pdf_path, 'Vendas.pdf')
                zipf.write(perdidos_pdf_path, 'Perdidos.pdf')
                if 'comissao' in request.GET:
                    zipf.write(comissao_pdf_path, 'Comissao.pdf')

            with open(zip_filename, 'rb') as f:
                response = HttpResponse(f.read(), content_type='application/zip')
                response['Content-Disposition'] = 'attachment; filename="relatorio-geral.zip"'
                return response


def gerar_pdf_leads(leads):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="Leads.pdf"'

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer, pagesize=landscape(letter))
    elements = []

    lead_fields = [
        'User', 'CNPJ', 'Nome da Empresa', 'Responsável', 'Telefone',
        'Email', 'Origem', 'Cargo', 'Descrição', 'Data de Cadastro', 'Data da Última Alteração'
    ]
    
    data = [lead_fields]

    for lead in leads:
        data.append([
            lead.user.first_name,  
            lead.cnpj,
            lead.nomeEmpresa,
            lead.responsavel,
            lead.telefone,
            lead.email,
            lead.origem,
            lead.cargo,
            lead.descricao,
            lead.data_cadastro.strftime('%d/%m/%Y'),
            lead.data_ultima_alteracao.strftime('%d/%m/%Y')
        ])

    t = Table(data)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                           ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                           ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                           ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                           ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                           ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                           ('FONTSIZE', (0, 0), (-1, -1), 8),
                           ('GRID', (0, 0), (-1, -1), 1, colors.black)]))
    elements.append(t)
    doc.build(elements)

    pdf = buffer.getvalue()
    buffer.close()
    return pdf

def gerar_pdf_prospeccoes(prospeccoes):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="Prospecções.pdf"'

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer, pagesize=landscape(letter))
    elements = []

    prospeccao_fields = [
        'Nome do Negócio', 'Segmento', 'Serviços', 'Participação Comercial',
        'Participação Efetiva', 'Consultor', 'Comissão', 'Data Início',
        'Data Contato Inicial', 'Data Próxima Ação', 'Preferência Contato',
        'Horário Contato', 'Observação', 'Status', 'Responsável', 'Versão'
    ]
    
    data = [prospeccao_fields]

    for prospeccao in prospeccoes:
        data.append([
            prospeccao.nome_negocio, prospeccao.segmento, prospeccao.servicos_produtos,
            prospeccao.participacao_comercial, prospeccao.participacao_efetiva,
            prospeccao.consultor if prospeccao.consultor else '',
            'Sim' if prospeccao.comissao else 'Não', 
            prospeccao.data_inicio_prospeccao.strftime('%d/%m/%Y'),
            prospeccao.data_contato_inicial.strftime('%d/%m/%Y'), 
            prospeccao.data_proxima_acao.strftime('%d/%m/%Y'),
            prospeccao.preferencia_contato, prospeccao.horario_contato,
            prospeccao.observacao, prospeccao.status, prospeccao.responsavel,
            str(prospeccao.versao)
        ])

    t = Table(data)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                           ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                           ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                           ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                           ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                           ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                           ('FONTSIZE', (0, 0), (-1, -1), 5),
                           ('GRID', (0, 0), (-1, -1), 1, colors.black)]))
    elements.append(t)
    doc.build(elements)

    pdf = buffer.getvalue()
    buffer.close()
    return pdf 


def gerar_pdf_propostas(propostas):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="Propostas.pdf"'

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer, pagesize=landscape(letter))
    elements = []

    proposta_fields = [
        'Nome da Proposta', 'Data de Cadastro', 'Descrição', 'Consultor', 'Tipo de Projeto',
        'Influenciador Decisor', 'Perfil Comprador', 'Probabilidade de Fechamento',
        'Status da Proposta', 'Valor da Proposta', 'Material Insumo', 'Serviços',
        'Somatório', 'Tipo de Contato', 'Versão', 'Ativa'
    ]
    
    data = [proposta_fields]

    for proposta in propostas:
        data.append([
            proposta.nome_proposta, proposta.data_cadastro, proposta.desc_proposta,
            proposta.consultor_prop.first_name if proposta.consultor_prop else '', 
            proposta.tipo_projeto, proposta.influenciador_decisor, proposta.perfil_orcamento,
            proposta.prob_fechamento, proposta.status_proposta, proposta.valor_proposta,
            proposta.material_insumo, proposta.servicos, proposta.somatorio,
            proposta.tipo_contato, proposta.versao, proposta.ativa
        ])

    t = Table(data)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                           ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                           ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                           ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                           ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                           ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                           ('FONTSIZE', (0, 0), (-1, -1), 5),
                           ('GRID', (0, 0), (-1, -1), 1, colors.black)]))
    elements.append(t)
    doc.build(elements)

    pdf = buffer.getvalue()
    buffer.close()
    return pdf 


def gerar_pdf_transacoes(queryset, titulo):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{titulo}.pdf"'

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer, pagesize=landscape(letter))
    elements = []

    if titulo == 'Vendas':
        campos_transacao = ['Data Fechamento', 'Status da Proposta', 'Valor da Proposta', 'Nome da Proposta']
    else:  # 'Perdidos'
        campos_transacao = ['Data Fechamento', 'Status da Proposta', 'Motivo', 'Nome da Proposta']

    data = [campos_transacao]

    for transacao in queryset:
        if titulo == 'Vendas':
            data.append([
                transacao.data_fechamento.strftime('%d/%m/%Y') if transacao.data_fechamento else '',
                transacao.status_proposta,
                "{:.2f}".format(transacao.valor_proposta) if transacao.valor_proposta else '0.00',
                transacao.proposta.nome_proposta if transacao.proposta else '',
            ])
        else:  # 'Perdidos'
            data.append([
                transacao.data_fechamento.strftime('%d/%m/%Y') if transacao.data_fechamento else '',
                transacao.status_proposta,
                transacao.motivo,
                transacao.proposta.nome_proposta if transacao.proposta else '',
            ])

    t = Table(data)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('FONTSIZE', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)]))
    
    elements.append(t)
    doc.build(elements)

    pdf = buffer.getvalue()
    buffer.close()
    return pdf

def gerar_pdf_grupo(usuarios):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="Grupo.pdf"'

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer, pagesize=letter)
    elements = []

    grupo_fields = ['Nome', 'Email', 'Comissão']
    data = [grupo_fields]

    for usuario in usuarios:
        data.append([
            usuario.first_name,
            usuario.email,
            'Tem comissão' if usuario.comissao else 'Não tem comissão'
        ])

    t = Table(data)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('FONTSIZE', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))
    elements.append(t)
    doc.build(elements)

    pdf = buffer.getvalue()
    buffer.close()
    return pdf


def baixar_arquivo(pdf_content, nome_arquivo):
    response = HttpResponse(pdf_content, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = f'attachment; filename="{nome_arquivo}"'
    return response