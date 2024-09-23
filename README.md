# Api de Pagamento Pix

Nessa api de pagamento pix, inicialmente teremos apenas dois endpoints privados:
- consultar status de uma transação: Retornará todos os dados da transação
- efetuar uma transação a partir de uma chave pix:
  - a transação deve ser bloqueada caso o valor seja maior que R$1.000,00 reais e horário seja entre 20h e 5h59
  - a transação deve ser bloqueada caso o valor exceda R$15.000,00 reais e horário seja entre 5h00 e 19h59
  - a transação deve ser bloqueada se o somatório de todas as transações no mês (incluindo o valor da transação atual) exceda R$30.000,00

## O que deve ser feito:

- [] estruturar as diferentes camadas da aplicação como bem entender, garantindo separação de responsabilidades e desacoplamento. 
- [] middleware de autorização
- [] mock de persistência dos dados
- [] consulta à api de terceiros
- [] implementação dos endpoints

>[!IMPORTANT]
>Os trechos de código abaixo tem como objetivo servirem de base para a implementação do candidato. Eles podem ser copiados e colados no arquivo apropriado para que o candidato possa finalizar a implementação.

## Como deve ser entregue:

O candidato criará uma nova branch dentro do repositório e no final fará um push da branch para abrir um pull request.

### Middleware de autorização:
Middleware deve ler o token do cabeçalho de autorização e verificar se é válido. Se não for válido, deve lançar um erro 403.

Para simplificar, podemos considerar como token válido a seguinte string: 'VALID_AUTH_TOKEN'

```javascript
const authorize = (req, res, next) => {
  // TODO - verificar o bearer token e lançar um erro se ele não for válido

  next();
}

const fake

export default authorize;
```

### Endpoints:
Finalizar os dois endpoints que devem ser disponibilizados na api.

```javascript
const initPresentationLayer = (app) => {
  /* TODO - finalizar endpoint de consulta a uma transação pelo id
  *
  *  path param: id da transação
  *  retorno: { id: string; amount: number: number; pixKey: string; account: string; bank: string }
  *
  */
  app.get('/payment/:id', authorize, async (req, res) => {
    // apenas buscar a transaction e retornar
    res.send(results)
  })

  /* TODO - finalizar endpoint para solicitação de um pagamento pix
  * 
  *  payload: { amount: number; pixKey: string }
  *  retorno: { id: string; amount: number: number; pixKey: string; account: string; bank: string }
  *  
  */
  app.post('/payment', authorize, async (req, res) => {
    // buscar os dados de conta da chave pix via api externa e persistir o pagamento
    res.send(results)
  })  
}
```

### Chamada a uma api externa para consulta de dados de conta:
- method: GET
- url: `http://localhost:3001/pixKey/:pixKey`
- retorno: `{ account: string, bank: string }`

### Camada de Persistencia de Transação:

Habilitar apenas escrita e leitura básica de transações em um mock de banco de dados.

```typescript
let idCounter = 0;
const database = {}

createTransaction(amount, pixKey, account, bank): Promise<Transaction> {
  const transaction = { id: idCounter++, amount, pixKey, account, bank };
  database[transaction.id] = transaction;
  return transaction;
}

getTransaction(id): Promise<Transaction> {
  return database[id];
}

```

### Tipagem:
```typescript
export type Payment = {
  amount: number;
  pixKey: string;
  account: string;
  bank: string;
}
```
