from rest_framework import serializers
from datetime import date, datetime
from .models import Proposta, Tarefa, Venda, Perdido



class PropostaSerializerInsert(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=False, required=False)
    data_cadastro = serializers.DateField(required=False, default=date.today())
    tipo_projeto = serializers.CharField(required=False)
    perfil_orcamento = serializers.CharField(required=False)
    prob_fechamento = serializers.CharField(required=False)
    status_proposta = serializers.CharField(required=False)
    valor_proposta = serializers.FloatField(required=False)
    material_insumo = serializers.CharField(required=False)
    servicos = serializers.CharField(required=False)
    versao = serializers.CharField(required=False)
    
    class Meta:
        model = Proposta
        fields = '__all__'

class PropostaSerializerUpdate(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=False)
    data_cadastro = serializers.DateField(required=False)
    tipo_projeto = serializers.CharField(required=False)
    perfil_orcamento = serializers.CharField(required=False)
    prob_fechamento = serializers.CharField(required=False)
    status_proposta = serializers.CharField(required=False)
    valor_proposta = serializers.FloatField(required=False)
    material_insumo = serializers.CharField(required=False)
    servicos = serializers.CharField(required=False)
    versao = serializers.CharField(required=False)

    class Meta:
        model = Proposta
        fields = '__all__'


class TarefaSerializerInsert(serializers.ModelSerializer):
    tipo_contato = serializers.CharField(required=True)
    data_cadastro = serializers.DateField(required=False, default=date.today())
    hora_cadastrado = serializers.TimeField(required=False, default=datetime.now().time())
    membro_equipe = serializers.CharField(required=False)
    nome_negocio = serializers.CharField(required=False)
    responsavel_negocio = serializers.CharField(required=False)
    concluida = serializers.BooleanField(required=False)

    class Meta:
        model = Tarefa
        fields = '__all__'

class VendaSerializer(serializers.ModelSerializer):
    status_proposta = serializers.CharField(required=True)
    data_fechamento = serializers.DateField(required=False, default=date.today())
    class Meta:
            model = Venda
            fields = '__all__'

class PerdidoSerializer(serializers.ModelSerializer):
    status_proposta = serializers.CharField(required=True)
    data_fechamento = serializers.DateField(required=False, default=date.today())
    motivo = serializers.CharField(required=True)
    class Meta:
            model = Perdido
            fields = '__all__'
