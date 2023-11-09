from rest_framework import serializers

class HistoricoSerializer(serializers.Serializer):
    lead_historico = serializers.DictField()
    prospeccao_historico = serializers.DictField()
