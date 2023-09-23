from rest_framework import serializers
from datetime import date
from .models import Prospeccao


class ProspeccaoSerializerInsert(serializers.ModelSerializer):
    data_inicio_prospeccao = serializers.DateField(required=False, default=date.today())
    data_contato_incial = serializers.DateField(required=False)
    comissao = serializers.BooleanField(required=False)
    preferencia_contato = serializers.CharField(required=False)
    horario_contato = serializers.CharField(required=False)
    observacao = serializers.CharField(required=False)
    class Meta:
        model = Prospeccao
        fields = '__all__'

class ProspeccaoSerializerUpdate(serializers.ModelSerializer):
    data_contato_incial = serializers.DateField(required=False)
    comissao = serializers.BooleanField(required=False)
    preferencia_contato = serializers.CharField(required=False)
    horario_contato = serializers.CharField(required=False)
    observacao = serializers.CharField(required=False)
    class Meta:
        model = Prospeccao
        fields = '__all__'