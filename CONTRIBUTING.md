# Guia para Contribuidores

Seja bem-vindo ao nosso projeto! Estamos felizes por você estar considerando contribuir. Este guia visa ajudar todos os contribuintes a entenderem como podem colaborar de maneira eficaz.

## Configurando o Ambiente de Desenvolvimento

1. **Fork o Repositório**:
    - Visite o repositório principal e faça um fork para sua conta pessoal.
  
2. **Clone o Fork**:
    - Clone o fork para sua máquina local.
    ```bash
    git clone [URL_DO_SEU_FORK]
    ```
  
3. **Adicione o Repositório Original como Upstream**:
    ```bash
    git remote add upstream [URL_DO_REPOSITORIO_PRINCIPAL]
    ```

4. **Instale as Dependências**:
    - Navegue até o diretório do projeto e instale as dependências.
    ```bash
    npm install
    ```

## Boas Práticas para Contribuir

1. **Trabalhe em uma Branch**:
    - Sempre crie uma nova branch a partir da branch `develop`.
    ```bash
    git checkout -b nome-da-sua-branch
    ```

2. **Mantenha sua Branch Atualizada**:
    - Antes de começar a trabalhar em sua contribuição, certifique-se de que sua branch esteja atualizada com a branch `develop` do repositório original.
    ```bash
    git pull upstream develop
    ```

3. **Padrão de Commit**:
    - Use o formato: `tipo(escopo): mensagem`
        - **Tipos**: feat, fix, refactor, chore, docs, style, test.
        - **Escopos**: core, frontend, backend.
        - **Mensagem**: Sempre em inglês.
    - Exemplo:
    ```bash
    git commit -m "feat(frontend): add new header component"
    ```

4. **Mantenha Commits Separados por Tipo e Escopo**:
    - Se você estiver fazendo uma feature no frontend e uma correção no backend, faça dois commits separados.

5. **Adicionando Novas Dependências**:
    - Se você precisa adicionar uma nova dependência, certifique-se de atualizar o `package.json` correspondente.
    ```bash
    npm install nome-da-dependencia --save
    ```
    Ou para dependências de desenvolvimento:
    ```bash
    npm install nome-da-dependencia --save-dev
    ```

6. **Abra uma Pull Request**:
    - Uma vez que sua contribuição esteja pronta, abra uma PR para a branch `develop` do repositório original. Certifique-se de detalhar todas as alterações no corpo da PR.
    
7. **Code Review**:
    - Sua PR deve ser revisada por um membro da equipe que não participou do desenvolvimento da tarefa em questão.

8. **Mensagens de Pull Request**:
    - Estruture sua mensagem de PR da seguinte forma:
    ```
    ### O que foi feito?

    - core:
        - Exemplo de adição na pasta raiz.
    - frontend:
        - Exemplo de adição no diretório frontend.
    - backend:
        - Exemplo de adição no diretório backend.
    ```

## Resolução de Conflitos

Se você tiver conflitos ao tentar mesclar sua branch com a branch `develop`, siga estes passos:

1. Atualize sua branch `develop` local:
    ```bash
    git checkout develop
    git pull upstream develop
    ```

2. Volte para sua branch de trabalho e faça o rebase:
    ```bash
    git checkout nome-da-sua-branch
    git rebase develop
    ```

3. Resolva os conflitos manualmente e, em seguida, continue o rebase:
    ```bash
    git rebase --continue
    ```

4. Finalmente, atualize sua branch no seu fork:
    ```bash
    git push origin nome-da-sua-branch
    ```

Esperamos que este guia ajude a tornar sua experiência de contribuição mais fácil e produtiva. Se tiver dúvidas, por favor, abra uma issue ou entre em contato com um membro da equipe. Obrigado por contribuir!

