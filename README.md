# Projeto CRM - Gerenciamento de Negócios

## Como Configurar o Projeto

### Pré-requisitos

- Git instalado.
- Node.js (versão 16) instalado para o projeto front-end.
- Python e pip instalados para o projeto back-end.

### Instruções

1. **Clonar o repositório**:

   Para clonar o repositório em sua máquina local, use o comando:

   ```
   git clone https://github.com/makenrosa/CRM-TCS.git
   ```

   Mude para o diretório do projeto:

   ```
   cd CRM-TCS
   ```

2. **Trocar para a branch desejada**:

   Sempre crie as branches encima da branch `develop`. Para trocar para a branch `develop`, use:

   ```
   git checkout develop
   ```

   Para criar uma branch encima de uma demanda, use:

   ```
   git checkout -b PD-XX
   ```

   Onde `XX` é o número da demanda com dois dígitos. Por exemplo, para a demanda `PD-1`, use:

   ```
   git checkout -b PD-01
   ```

3. **Instalar dependências da raiz e do frontend**:

   _**Importante**_

   ```
   npm install
   ```

4. **Configurando o Frontend**:

   Navegue até a pasta `frontend`:

   ```
   cd frontend
   ```

   Instale todas as dependências do frontend:

    _desnecessário caso já tenha executado o comando `npm install` na raiz do projeto_
   ``` md
   npm install
   ```

   Após a instalação, você pode iniciar o servidor de desenvolvimento com:

   ```
   npm start
   ```

5. **Configurando o Backend**:

   Navegue até a pasta `backend`:

   ```
   cd backend
   ```

   Recomendamos a criação de um ambiente virtual para manter as dependências isoladas.
   
   Para criar e ativar o ambiente virtual:

    ```
    python -m venv venv
    ```
    
    para ativar o ambiente virtual no Windows: 
    ```
    venv\Scripts\activate.bat
    ```
    para ativar o ambiente virtual no Linux: 
    ```
    source venv/bin/activate
    ```

   Instale todas as dependências do projeto:

   ```
   pip install -r requirements.txt
   ```
   Criar base de dados(Ubuntu)

   ```
   sudo -u postgres psql
   ```

   ```
   ALTER USER postgres PASSWORD 'Dev123@';
   ```

   ```
   \q
   sudo -u postgres -i
   ```

   ```
   createdb solve_crm
   ```
  Criar base de dados(Windows)
  1. Abra o "PostgreSQL SQL Shell" a partir do menu Iniciar ou procurando-o no seu sistema.

  2. Quando solicitado, insira o nome de usuário e a senha do PostgreSQL. Por padrão, o nome de usuário é "postgres" e a senha é aquela que você definiu durante a instalação do PostgreSQL no Windows.

  3. Após fazer login, você verá um prompt do psql semelhante ao que você teria no Ubuntu.

  4. Execute o seguinte comando:
   ```
   ALTER USER postgres PASSWORD 'Dev123@';
   \q
   ```
   
  5. Abra o "PostgreSQL Command Prompt" a partir do menu Iniciar ou procurando-o no seu sistema. E execute o seguinte comando:
   ```
   createdb solve_crm
   ```

   Rodar comandos de migração criação e migração dos dados da base

   ```
   python manage.py makemigrations
   ```

   ```
   python manage.py migrate
   ```

   Após a instalação, você pode iniciar o servidor Django com:

   ```
   python manage.py runserver
   ```

---

## Boas práticas ao contribuir

### 1. Puxando as Atualizações:

- Sempre puxe as atualizações mais recentes da branch `develop` antes de começar a fazer alterações.
  ```
  git pull origin develop
  ```
- Se estiver trabalhando em uma demanda que é filha de outra demanda, puxe da branch da demanda mãe.

### 2. Estrutura de Commits:

A estrutura de cada commit deve seguir o padrão: `tipo(escopo): mensagem`

- **Tipos**:

  - `feat`: Nova funcionalidade.
  - `fix`: Correção de bugs.
  - `refactor`: Refatoração de código.
  - `chore`: Atualizações que não modificam arquivos de código fonte ou testes.
  - `docs`: Alterações na documentação.
  - `style`: Alterações de estilo de código (formatting, faltando ponto e vírgula, etc; não alterações de código).
  - `test`: Adicionando testes, refatorando testes; nenhuma produção de código.

- **Escopos**:

  - `core`: Alterações ou adições na pasta raiz.
  - `frontend`: Alterações ou adições no diretório `frontend`.
  - `backend`: Alterações ou adições no diretório `backend`.

- **Mensagens**:
  - Sempre em inglês.
  - Concisa e clara sobre a mudança feita.

**Nota**: Faça commits separados de acordo com o tipo e o escopo. Por exemplo, não misture `feat(frontend)` com `fix(backend)` no mesmo commit.

### 3. Adicionando Dependências:

Ao adicionar novas dependências, atualize o `package.json` correspondente ao escopo.

- Para dependências regulares:
  ```
  npm install [pacote] --save
  ```
- Para dependências de desenvolvimento:
  ```
  npm install [pacote] --save-dev
  ```

### 4. Pull Requests:

- Antes de abrir um Pull Request, verifique se seu código está de acordo com as convenções definidas e se todas as funcionalidades estão funcionando como esperado.
- O code review deverá ser feito por algum desenvolvedor que não participou do desenvolvimento daquela tarefa.
- A mensagem da Pull Request deve conter uma descrição clara do que foi feito naquela tarefa. Por exemplo:

```
### O que foi feito?

- core:
  - Exemplo de adição na pasta raiz.
- frontend:
  - Exemplo de adição no diretório frontend.
- backend:
  - Exemplo de adição no diretório backend.
```

---

**Dica Final**: Mantenha uma comunicação clara e aberta com sua equipe. Antes de mergulhar em uma nova tarefa ou fazer mudanças significativas, discuta com seus colegas para garantir que todos estejam alinhados e cientes das atualizações.

---

Para qualquer dúvida ou suporte, entre em contato com [Maken da Rosa](https://wa.me/48991557364).
