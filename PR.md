# Exercício 1: Contratos (API de dados)

## 1.1 Setup

Primeiramente, fiz o script "scriptConverter.py" para converter o ficheiro .csv para .json no formato JsonArray. A seguir, substitui o nome "idcontrato" para "\_id"

Depois, importei o ficheiro para o docker do mongo.

```bash
docker cp contratos2024.json 69a3f8bd8ec9:/tmp
Successfully copied 21MB to 69a3f8bd8ec9:/tmp
```

Por fim, dentro da shell do docker do mongo, importei os dados para o mongo.

```bash
root@mongo:/tmp# mongoimport -d contratos -c contratos contratos2024.json --jsonArray
2024-05-16T13:25:18.486+0000	connected to: mongodb://localhost/
2024-05-16T13:25:21.487+0000	[###################.....] contratos.contratos	16.0MB/20.0MB (79.8%)
2024-05-16T13:25:22.306+0000	[########################] contratos.contratos	20.0MB/20.0MB (100.0%)
2024-05-16T13:25:22.306+0000	36377 document(s) imported successfully. 0 document(s) failed to import.
```

## 1.3 API de dados

**GET /contratos: devolve uma lista com todos os registos;**
http://localhost:16000/contratos

**GET /contratos/:id: devolve o registo com identificador id (corresponde ao idcontrato);**
http://localhost:16000/contratos/10424261

**GET /contratos?entidade=EEEE: devolve a lista dos contratos correspondentes à entidade EEEE;**
http://localhost:16000/contratos?entidade=Freguesia%20de%20Carvalhosa

**GET /contratos?tipo=AAA: devolve a lista dos contratos com tipo de procedimento igual a AAA;**
http://localhost:16000/contratos?tipo=Consulta%20Prévia

**GET /contratos/entidades: devolve a lista de entidades comunicantes ordenada alfabeticamente e sem repetições;**
http://localhost:16000/contratos/entidades

**GET /contratos/tipos: devolve a lista dos tipos de procedimento ordenada alfabeticamente e sem repetições;**
http://localhost:16000/contratos/tipos

**POST /contratos: acrescenta um registo novo à BD;**

Testei com o curl:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "_id": "10424331",
    "nAnuncio": "NomeDoAnuncio",
    "tipoprocedimento": "Ajuste Direto Regime Geral",
    "objectoContrato": "Serviços no âmbito administrativo e apoio nas atividades da Freguesia",
    "dataPublicacao": "02/01/2024",
    "dataCelebracaoContrato": "02/01/2024",
    "precoContratual": "8100",
    "prazoExecucao": "272",
    "NIPC_entidade_comunicante": "507853024",
    "entidade_comunicante": "Freguesia de Candoso (São Martinho)",
    "fundamentacao": "Artigo 20.º, n.º 1, alínea d) do Código dos Contratos Públicos"
}' http://localhost:16000/contratos


{"_id":"10424331","nAnuncio":"NomeDoAnuncio","tipoprocedimento":"Ajuste Direto Regime Geral","objectoContrato":"Serviços no âmbito administrativo e apoio nas atividades da Freguesia","dataPublicacao":"02/01/2024","dataCelebracaoContrato":"02/01/2024","precoContratual":"8100","prazoExecucao":"272","NIPC_entidade_comunicante":"507853024","entidade_comunicante":"Freguesia de Candoso (São Martinho)","fundamentacao":"Artigo 20.º, n.º 1, alínea d) do Código dos Contratos Públicos","__v":0}%
```

**PUT /contratos/:id: altera o registo com o identificador id.**

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
    "nAnuncio": "Novo Nome do Anúncio",
    "tipoprocedimento": "Novo Tipo de Procedimento",
    "objectoContrato": "Novo Objeto do Contrato",
    "dataPublicacao": "03/01/2024",
    "dataCelebracaoContrato": "03/01/2024",
    "precoContratual": "9000",
    "prazoExecucao": "300",
    "NIPC_entidade_comunicante": "507853024",
    "entidade_comunicante": "Freguesia de Candoso (São Martinho) - Modificado",
    "fundamentacao": "Artigo 20.º, n.º 2, alínea a) do Código dos Contratos Públicos - Modificado"
}' http://localhost:16000/contratos/10424331

{"acknowledged":true,"modifiedCount":1,"upsertedId":null,"upsertedCount":0,"matchedCount":1}%
```

**DELETE /contratos/:id: elimina da BD o registo com o identificador id;**

```bash
curl -X DELETE localhost:16000/contratos/10424331

{"acknowledged":true,"deletedCount":1}%
```

# Exercício 2: Contratos (Interface)

http://localhost:16001
http://localhost:16001/contratos/10424261
