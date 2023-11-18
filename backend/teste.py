import os
import django
from faker import Faker
import random

# Configure settings for project
# Need to run this before calling models from application!
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'solve_crm.settings')

# Import your models
django.setup()

from lead.models import Lead  
from prospeccao.models import Prospeccao  
from proposta.models import Proposta  
from usuario.models import Usuario

fake = Faker()

# Função para criar um registro falso
def create_fake_lead(n):
    for _ in range(n):
        # Gere dados falsos para cada campo
        cnpj = ''.join([str(random.randint(0, 9)) for _ in range(14)])
        nomeEmpresa = fake.company()
        responsavel = fake.name()
        telefone = fake.phone_number()
        email = fake.email()
        origem = fake.word()
        cargo = fake.job()
        descricao = fake.text(max_nb_chars=200)
        data_cadastro = fake.date_between(start_date='-2y', end_date='today')
        data_ultima_alteracao = fake.date_between(start_date=data_cadastro, end_date='today')
        user_id = 1  # Supondo que você tenha um modelo User

        # Crie o novo objeto Lead
        lead = Lead(
            cnpj=cnpj,
            nomeEmpresa=nomeEmpresa,
            responsavel=responsavel,
            telefone=telefone,
            email=email,
            origem=origem,
            cargo=cargo,
            descricao=descricao,
            data_cadastro=data_cadastro,
            data_ultima_alteracao=data_ultima_alteracao,
            user_id=user_id
        )
        # Salve o registro no banco de dados
        lead.save()


def create_fake_prospeccao(n):
    for _ in range(n):
        # Suponha que você já tem leads criados, aqui pegaremos um aleatório
        lead = Lead.objects.get(id=33)

        # Gere dados falsos para cada campo
        nome_negocio = fake.company()
        segmento = fake.word()
        servicos_produtos = fake.bs()
        participacao_comercial = fake.sentence(nb_words=4)
        participacao_efetiva = fake.sentence(nb_words=4)
        consultor = fake.name()
        comissao = fake.boolean()
        data_inicio_prospeccao = fake.date_between(start_date='-1y', end_date='today')
        data_contato_inicial = fake.date_between(start_date='-1y', end_date='today')
        data_proxima_acao = fake.date_between(start_date='today', end_date='+1y')
        preferencia_contato = random.choice(['Email', 'Telefone', 'Presencial', 'Videoconferência'])
        horario_contato = fake.time()
        observacao = fake.text(max_nb_chars=200)
        status = random.choice(['Ativo', 'Inativo', 'Concluído'])
        responsavel = fake.name()
        versao = fake.random_int(min=1, max=10)

        # Crie o novo objeto Prospeccao
        prospeccao = Prospeccao(
            lead=lead,
            nome_negocio=nome_negocio,
            segmento=segmento,
            servicos_produtos=servicos_produtos,
            participacao_comercial=participacao_comercial,
            participacao_efetiva=participacao_efetiva,
            consultor=consultor,
            comissao=comissao,
            data_inicio_prospeccao=data_inicio_prospeccao,
            data_contato_inicial=data_contato_inicial,
            data_proxima_acao=data_proxima_acao,
            preferencia_contato=preferencia_contato,
            horario_contato=horario_contato,
            observacao=observacao,
            status=status,
            responsavel=responsavel,
            versao=versao
        )
        # Salve o registro no banco de dados
        prospeccao.save()

def create_fake_proposta(n):
    for _ in range(n):
        # Suponha que você já tem prospecções criadas, aqui pegaremos uma aleatória
        prospeccao = Prospeccao.objects.order_by('?').first()
        # Suponha que você também tem usuários para associar como consultores
        consultor_prop = Usuario.objects.get(id=1)

        # Gere dados falsos para cada campo
        nome_proposta = fake.catch_phrase()
        data_cadastro = fake.date_between(start_date='-1y', end_date='today')
        desc_proposta = fake.text(max_nb_chars=200)
        tipo_projeto = random.choice(['Curto Prazo', 'Médio Prazo', 'Longo Prazo'])
        influenciador_decisor = fake.name()
        perfil_orcamento = random.choice(['Econômico', 'Moderado', 'Luxo'])
        prob_fechamento = f"{random.randint(0, 100)}%"
        status_proposta = random.choice(['Em Análise', 'Em revisão', 'Em negociação'])
        valor_proposta = round(random.uniform(1000.00, 50000.00), 2)
        material_insumo = fake.text(max_nb_chars=200)
        servicos = fake.bs()
        somatorio = round(valor_proposta + random.uniform(500.00, 5000.00), 2)
        tipo_contato = random.choice(['Email', 'Telefone', 'Presencial', 'Videoconferência'])
        versao = f"{random.randint(1, 10)}"
        ativa = fake.boolean()

        # Crie o novo objeto Proposta
        proposta = Proposta(
            nome_proposta=nome_proposta,
            data_cadastro=data_cadastro,
            desc_proposta=desc_proposta,
            consultor_prop=consultor_prop,
            tipo_projeto=tipo_projeto,
            influenciador_decisor=influenciador_decisor,
            perfil_orcamento=perfil_orcamento,
            prob_fechamento=prob_fechamento,
            status_proposta=status_proposta,
            valor_proposta=valor_proposta,
            material_insumo=material_insumo,
            servicos=servicos,
            somatorio=somatorio,
            tipo_contato=tipo_contato,
            versao=versao,
            ativa=ativa,
            prospeccao=prospeccao
        )
        # Salve o registro no banco de dados
        proposta.save()

create_fake_proposta(8)