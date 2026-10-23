# Sign-Up (Criação de Conta)

## Escopo
Front-end, back-end, banco de dados

## Contexto
Precisamos implementar o fluxo para criação de contas na plataforma, as pessoas precisarão fornecer:
- Primeiro Nome
- Sobrenome
- E-mail
- Senha
- Confirmação de Senha

## Requisitos Funcionais
1. Precisamos adicionar validação na camada de cliente
    1. Caso o formulário esteja valido, podemos enviar a requisição para API
    2. Os campos nome e sobrenome devem ser separados
2. Precisamos criar uma nova conta no banco de dados na tabela `accounts`
    1. id: nanoid(gerado com `nanoid` na camada de API)
    2. first_name: text
    3. last_name: text
    4. email: text
    5. password: text (hashed)
    6. active: boolean
    7. created_at: timestamp
    8. updated_at: timestamp
3. A requisição deve ser um POST para `/api/v1/sign-up` e receber os dados com JSON no body
4. Caso tudo der certo, retornar 201 ou erros de acordo com validação:
    1. 400: Má formatação de dados

## Requisitos Não Funcionais
- Segurança: Precisamos salvar as senhas de forma segura no banco de dados
    - Precisamos receber os dados do cliente de forma segura usando HTTPS (para prevenir network sniff)
    - UI/UX: boa experiência de uso através de uma interface bonita, elegante, moderna
    - Performace: O processo de criação de conta precisa ser rápido

## Você deve
- Criar a base do projeto com um endpoint inicial para criação de conta
- Criar a base do projeto com uma pagina inicial para a interface de criação de conta
- Configurar as bibliotecas base


## Você não deve
- Implementar qualquer outra funcionalidade que não esteja relacionada com o sign-up (criação de contas) 
- Não vamos realizar nenhum envio de e-mail no momento, apenas processar a requisição, salvar no banco de dados e retornar sucesso

## Tecnologias (Stacks)
React.js, Next.js, React-Hook-form, Shadcn, Tailwind, Supabase, TRCP, Bunjs

## Critérios de aceitação
- Temos uma página para criar a nova conta em `/auth/sign-up`
- A página contém um formulário com validação
- A plataforma consegue se comunicar com a API para enviar os dados e receber uma resposta
- Estamos informando possíveis erros
    - Mostrar um alert em vermelho no formulário
- Estamos informando o sucesso de criação da conta
    - Navegar para `/auth/sign-up/success`

## Resultado
Pessoas conseguem criar uma nova conta na plataforma
