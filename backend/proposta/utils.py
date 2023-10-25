from .models import Proposta
from django.db.models import F, Max


class Versionamento:
    def incrementar_versao(id):
        if not id:
            proposta_mais_alta = int(Proposta.objects.annotate(valor_maximo=Max('versao')).filter(versao=F('valor_maximo')).first().versao) + 1
            return str(proposta_mais_alta)
        ultima_versao = Proposta.objects.get(id=id).versao
        if len(ultima_versao) == 1:
            return ultima_versao + '-A'
        numero, caractere = ultima_versao.split('-')
        novo_numero = int(numero)
        novo_caractere = chr(ord(caractere) + 1)  
        if novo_caractere == 'Z':
            novo_numero += 1
            novo_caractere = 'A'
        nova_versao = f"{novo_numero}-{novo_caractere}"
        
        return nova_versao
