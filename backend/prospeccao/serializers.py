from rest_framework import serializers
from datetime import date
from .models import Prospeccao


class ProspeccaoSerializerInsert(serializers.ModelSerializer):
    data_cadastro = serializers.DateField(required=False, default=date.today())
    data_ultima_alteracao = serializers.DateField(required=False, default=date.today())
    class Meta:
        model = Prospeccao
        fields = '__all__'

class ProspeccaoSerializerUpdate(serializers.ModelSerializer):
    data_ultima_alteracao = serializers.DateField(required=False, default=date.today())
    class Meta:
        model = Prospeccao
        fields = '__all__'