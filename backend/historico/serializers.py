from rest_framework import serializers
from .models import Historico
from datetime import datetime

class HistoricoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historico
        fields = '__all__'
