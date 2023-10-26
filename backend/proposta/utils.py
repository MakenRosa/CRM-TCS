from .models import Proposta

class Versionamento:

    @staticmethod
    def extrair_numero(versao):
        partes = versao.split('-')
        return int(partes[0]) if partes[0].isdigit() else 0

    @staticmethod
    def incrementar_versao(id):
        if not id:
            return Versionamento.criar_proposta()
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
    
    @staticmethod
    def criar_proposta():
        try:
            versoes = Proposta.objects.values_list('versao', flat=True)
            max_versao = max([Versionamento.extrair_numero(versao) for versao in versoes])
            proposta_mais_alta = max_versao + 1
            return str(proposta_mais_alta)
        except ValueError:
            return '1'


