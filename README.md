# Documentação da API de fluxo de caixa (Cash-flow)
Este documento explica os principais pontos para rodar a aplicação e consumir os recursos disponibilizados por ela

## Pré-requisitos
- Docker
- Docker Compose

## Como rodar a aplicação
Após clonar este repositório e entrar no diretório executar o seguinte comando:
```
$ docker-compose up --build
```
A aplicação será executada e estará disponível em ```http://localhost:3000```

A API tem um usuário padrão cadastrado para que seja possível criar o primeiro usuário e usar a API. Os dados de acesso são:
```
Email: root@test.com
Password: root
```

## Recursos da API
### Autenticação
Recurso para autenticar na API e receber o token de autorização
Endpoint: ```POST /api/v1/auth```
Dados a enviar:
```json
{
  "email":"<email-do-usuario>",
  "password":"<senha-do-usuario>"
}
```
Resposta: 
```json
{
  "token":"..."
}
```

Todos os próximos recursos necessitam de autorização feita enviando o token de autenticação no header da requisição. Ex.:
```json
{
  "Authorization":"Bearer <token>"
}
```
### Usuários (users)
#### Cadastro
Cadastrar um novo usuário
Endpoint: ```POST /api/v1/users```
Dados a enviar:
```json
{
  "name": "Silas",
  "email": "silas.ti2010@gmail.com",
  "password": "silas",
  "role": "OPERATOR" ou "ADMIN"
}
```

#### Atualização
Atualizar um usuário
Endpoint: ```PUT /api/v1/users/{id}```
Dados a enviar:
```json
{
  "id": "2f9b2563-2447-4ab0-925a-291f25015f71",
  "name": "Silas",
  "email": "silas.ti2010@gmail.com",
  "password": "silas",
  "role": "OPERATOR" ou "ADMIN"
}
```

#### Exclusão
Excluir um usuário
Endpoint: ```DELETE /api/v1/users/{id}```

#### Listagem
Listar todos os usuários
Endpoint: ```GET /api/v1/users```

#### Buscar usuário por ID
Buscar usuário por ID
Endpoint: ```GET /api/v1/users/{id}```

### Entrada de caixa (cash-inflow)
#### Cadastro
Cadastrar nova entrada de caixa
Endpoint: ```POST /api/v1/cash-inflows```
Dados a enviar:
```json
{
  "title": "Manutenção de aplicações",
  "description": "Manutenção de aplicações",
  "amount": 5000.00,
  "datePaid": "2019-04-12"
}
```

#### Atualização
Atualizar um registro de entrada de caixa
Endpoint: ```PUT /api/v1/cash-inflows/{id}```
Dados a enviar:
```json
{
  "id": "c995a53e-a44a-4af4-b643-9cb7aaf9364b",
  "title": "Manutenção de aplicações",
  "description": "Manutenção de aplicações",
  "amount": 5000.00,
  "datePaid": "2019-04-12"
}
```

#### Excluir
Excluir um registro de entrada de caixa
Endpoint: ```DELETE /api/v1/cash-inflows/{id}```

#### Listagem
Listar todos registros de entrada de caixa
Endpoint: ```GET /api/v1/cash-inflows```

#### Buscar registro por ID
Buscar um registro de entrada de caixa por ID
Endpoint: ```GET /api/v1/cash-inflows/{id}```

### Saída de caixa (cash-outflow)
#### Cadastro
Cadastrar nova saída de caixa
Endpoint: ```POST /api/v1/cash-outflows```
Dados a enviar:
```json
{
  "title": "Conta de internet",
  "description": "Conta de internet",
  "amount": 300.00,
  "datePaid": "2019-04-12"
}
```

#### Atualização
Atualizar um registro de saída de caixa
Endpoint: ```PUT /api/v1/cash-outflows/{id}```
Dados a enviar:
```json
{
  "id": "c995a53e-a44a-4af4-b643-9cb7aaf9364b",
  "title": "Conta de internet",
  "description": "Conta de internet",
  "amount": 300.00,
  "datePaid": "2019-04-12"
}
```

#### Excluir
Excluir um registro de saída de caixa
Endpoint: ```DELETE /api/v1/cash-outflows/{id}```

#### Listagem
Listar todos registros de saída de caixa
Endpoint: ```GET /api/v1/cash-outflows```

#### Buscar registro por ID
Buscar um registro de saída de caixa por ID
Endpoint: ```GET /api/v1/cash-outflows/{id}```

### Relatório (report)
#### Relatório totalizador de entrada e saída de caixa
Endpoint: ```GET /api/v1/report```
Estrutura do relatório:
```json
{
  "cashInflowAmount": 50000.00, // Total de entrada
  "cashOutflowAmount": 20000.00 // Total de saída
}
```

#### Relatório totalizador de entrada e saída de caixa em um intervalo de datas
Endpoint: ```GET /api/v1/report?from=<data-inicial>&to=<data-final>```
Estrutura do relatório:
```json
{
  "cashInflowAmount": 50000.00, // Total de entrada
  "cashOutflowAmount": 20000.00 // Total de saída
}
```