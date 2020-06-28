# poker-hands
Este projeto é uma API REST que recebe duas mãos de poker e diz qual dos jogadores venceu.

## Tecnologias e Características:
Para desenvolvimento da API, foram utilizadas as seguintes tecnologias:
- Node JS
- Express
- Mongoose (mongoDB)

## Variáveis de ambiente: 
> < substituir > - O conteúdo entre < > deve ser substituído de acordo com seu ambiente.
* MONGO_ATLAS_CONNECTION_STRING = < string para conexão com banco de dados MongoDB Atlas > 

## REST API Endpoints
#### GET /cards
Esta rota retorna todas as cartas que estão inseridas no banco. 

Resposta:
```
[
 {
    "_id": "5ef7ea6b8ae2e70f4e034495",
    "symbol": "J",
    "suit": "Paus",
    "sequential": 11,
    "__v": 0
 }, ...
]
```

#### POST /croupier
Esta rota recebe duas mãos de poker e retorna a mão vencedora. 

Requisição:
```
{
    "hands": [
        [
            "5ef7d79c8d0abb0e352749fc",
            "5ef7da04271c870e89373056",
            "5ef7e9cd8ae2e70f4e034471",
            "5ef7e07c271c870e8937305c",
            "5ef7e080271c870e8937305d"
        ],
        [
            "5ef7ea6f8ae2e70f4e034496",
            "5ef7da04271c870e89373056",
            "5ef7e9cd8ae2e70f4e034471",
            "5ef7e07c271c870e8937305c",
            "5ef7e080271c870e8937305d"
        ]
    ]
}
```
Resposta:
Pode ser uma mensagem de empate:
```
{
    "message": "empate"
}
```
ou a mão vencedora:

```
[
    {
        "_id": "5ef7da04271c870e89373056",
        "symbol": "2",
        "suit": "Copas",
        "sequential": 2,
        "__v": 0
    },
    {
        "_id": "5ef7e9cd8ae2e70f4e034471",
        "symbol": "2",
        "suit": "Ouros",
        "sequential": 2,
        "__v": 0
    },
    {
        "_id": "5ef7e07c271c870e8937305c",
        "symbol": "8",
        "suit": "Copas",
        "sequential": 8,
        "__v": 0
    },
    {
        "_id": "5ef7e080271c870e8937305d",
        "symbol": "9",
        "suit": "Copas",
        "sequential": 9,
        "__v": 0
    },
    {
        "_id": "5ef7d79c8d0abb0e352749fc",
        "symbol": "A",
        "suit": "Copas",
        "sequential": 14,
        "__v": 0
    }
]
```
