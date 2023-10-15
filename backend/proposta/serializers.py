from rest_framework import serializers
from datetime import date
from .models import Proposta


class PropostasSerializerInsert(serializers.ModelSerializer):
    data_proposta = serializers.DateField(required=False, default=date.today())
    class Meta:
        model = Proposta
        fields = '__all__'

