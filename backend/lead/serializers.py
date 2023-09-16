from rest_framework import serializers
from datetime import date
from .models import Lead


class LeadsSerializerInsert(serializers.ModelSerializer):
    data_cadastro = serializers.DateField(required=False, default=date.today())
    data_ultima_alteracao = serializers.DateField(required=False, default=date.today())
    class Meta:
        model = Lead
        fields = '__all__'

class LeadsSerializerUpdate(serializers.ModelSerializer):
    data_ultima_alteracao = serializers.DateField(required=False, default=date.today())
    class Meta:
        model = Lead
        fields = '__all__'
