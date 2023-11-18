from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from .models import Tarefa  # Substitua 'myapp' pelo nome real do seu aplicativo
from django_cron import CronJobBase, Schedule

class EnviarLembreteTarefaCron(CronJobBase):
    RUN_AT_TIMES = ['16:00']  # Define o horário de execução para as 6 da manhã

    schedule = Schedule(run_at_times=RUN_AT_TIMES)
    code = 'myapp.enviar_lembrete_tarefa'  # Um código único

    def do(self):
        enviar_lembrete_tarefa() 
    
def enviar_lembrete_tarefa():
    data_amanha = timezone.now().date() + timedelta(days=1)
    tarefas = Tarefa.objects.filter(data_cadastro=data_amanha)
    for tarefa in tarefas:
        usuario = tarefa.proposta.consultor_prop
        send_mail(
            'Lembrete de Tarefa',
            f'Sua tarefa "{tarefa.nome_negocio}" está programada para amanhã.',
            'solvecrmconfig@gmail.com',  # Use um e-mail de origem apropriado
            [usuario.email],  # Supondo que o modelo Tarefa tenha um campo de usuário com um e-mail
            fail_silently=False,
        )