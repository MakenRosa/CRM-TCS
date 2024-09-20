from django.core.management.base import BaseCommand
from apscheduler.schedulers.background import BackgroundScheduler
from prospeccao.models import Prospeccao
from proposta.models import Tarefa
from lead.models import Lead
from usuario.models import Usuario
from datetime import datetime, timedelta
from django.core.mail import send_mail

def enviar_notificacao_acao():
    data_atual = datetime.now().date()

    print('a')
    tarefas = Tarefa.objects.all()
    for tarefa in tarefas:
        diferenca_dias = (data_atual - tarefa.data_cadastro).days
        if diferenca_dias == 1:
            to = tarefa.membro_equipe
            subject = "Aviso de tarefa SOLVE CRM"
            message = f"Tarefa marcada para dia {tarefa.data_cadastro} às {tarefa.hora_cadastrado} com o cliente: {tarefa.nome_negocio}"
            send_mail(subject, message, "solvecrmconfig@gmail.com", to)

    prospeccoes = Prospeccao.objects.all()
    for prospeccao in prospeccoes:
        diferenca_dias = (data_atual - prospeccao.data_proxima_acao).days
        if diferenca_dias == 1:
            lead = Lead.objects.get(id=prospeccao.lead)
            to = Usuario.objects.get(id=lead.user).email
            subject = "Aviso de proxima ação SOLVE CRM"
            message = f"Próxima ação marcada para dia {prospeccao.data_proxima_acao} às {prospeccao.horario_contato} com o cliente: {prospeccao.nome_negocio}"
            send_mail(subject, message, "solvecrmconfig@gmail.com", to)

def tarefa_de_teste():
    print('Tarefa de teste executada.')

class Command(BaseCommand):
    def handle(self, *args, **options):
        scheduler = BackgroundScheduler()


        
        scheduler = BackgroundScheduler()
        scheduler.add_job(tarefa_de_teste, 'date', run_date=datetime(2023, 10, 26, 21, 33))
        scheduler.start()

        try:
            self.stdout.write("Scheduler está em execução. Pressione Ctrl+C para parar.")
            scheduler.print_jobs()
            while True:
                pass
        except KeyboardInterrupt:
            scheduler.shutdown()
            self.stdout.write("Scheduler parado.")
