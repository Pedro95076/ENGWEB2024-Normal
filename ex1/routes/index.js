var express = require("express");
var router = express.Router();
var Contrato = require("../controllers/contrato");

// GET /contratos/entidades: devolve a lista de entidades comunicantes ordenada alfabeticamente e sem repetições;
router.get("/contratos/entidades", function (req, res) {
    Contrato.getEntidades()
        .then((dados) => {
            res.jsonp(dados);
        })
        .catch((erro) => {
            res.status(500).jsonp(erro);
        });
});

// GET /contratos/tipos: devolve a lista dos tipos de procedimento ordenada alfabeticamente e sem repetições;
router.get("/contratos/tipos", function (req, res) {
    Contrato.getTipos()
        .then((dados) => {
            res.jsonp(dados);
        })
        .catch((erro) => {
            res.status(500).jsonp(erro);
        });
});

// GET /contratos: devolve uma lista com todos os registos;
// GET /contratos?entidade=EEEE: devolve a lista dos contratos correspondentes à entidade EEEE;
// GET /contratos?tipo=AAA: devolve a lista dos contratos com tipo de procedimento igual a AAA;
router.get("/contratos", function (req, res) {
    if (req.query.entidade) {
        // Se o parâmetro de consulta entidade estiver presente na requisição
        Contrato.getContratoEntidade(req.query.entidade)
            .then((dados) => {
                res.jsonp(dados);
            })
            .catch((erro) => {
                res.status(500).jsonp(erro);
            });
    } else if (req.query.tipo) {
        // Se o parâmetro de consulta tipo estiver presente na requisição
        Contrato.getContratoTipo(req.query.tipo)
            .then((dados) => {
                res.jsonp(dados);
            })
            .catch((erro) => {
                res.status(500).jsonp(erro);
            });
    } else {
        // Se não houver parâmetro de consulta entidade, listar todos os contratos
        Contrato.list()
            .then((dados) => {
                res.jsonp(dados);
            })
            .catch((erro) => {
                res.status(500).jsonp(erro);
            });
    }
});

// GET /contratos/:id: devolve o registo com identificador id (corresponde ao idcontrato, agora _id);
router.get("/contratos/:id", function (req, res) {
    Contrato.getContrato(req.params.id)
        .then((dados) => {
            res.jsonp(dados);
        })
        .catch((erro) => {
            res.status(500).jsonp(erro);
        });
});

// POST /contratos: acrescenta um registo novo à BD;
router.post("/contratos", function (req, res) {
    Contrato.insert(req.body)
        .then((dados) => {
            res.jsonp(dados);
        })
        .catch((erro) => {
            res.status(500).jsonp(erro);
        });
});

// PUT /contratos/:id: altera o registo com o identificador id.
router.put("/contratos/:id", function (req, res) {
    Contrato.update(req.params.id, req.body)
        .then((dados) => {
            res.jsonp(dados);
        })
        .catch((erro) => {
            res.status(500).jsonp(erro);
        });
});

// DELETE /contratos/:id: elimina da BD o registo com o identificador id;
router.delete("/contratos/:id", function (req, res) {
    Contrato.remove(req.params.id)
        .then((dados) => {
            res.jsonp(dados);
        })
        .catch((erro) => {
            res.status(500).jsonp(erro);
        });
});

module.exports = router;
