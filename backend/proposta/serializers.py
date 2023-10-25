from rest_framework import serializers
from datetime import date
from .models import Proposta


from rest_framework import serializers
from datetime import date
from .models import Proposta

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

