var express = require("express");
var router = express.Router();
var axios = require("axios");

// http://localhost:16001 ==> registos.pug
router.get("/", function (req, res) {
    var data = new Date().toISOString().substring(0, 16);

    axios
        .get("http://localhost:16000/contratos")
        .then((dados) => {
            var contratos = dados.data;
            res.render("registos", { contratos: contratos, data: data });
        })
        .catch((erro) => {
            res.render("error", { error: erro });
        });
});

// http://localhost:16001/contratos/:id ==> contrato.pug
router.get("/contratos/:id", function (req, res) {
    var data = new Date().toISOString().substring(0, 16);

    axios
        .get("http://localhost:16000/contratos/" + req.params.id)
        .then((dados) => {
            var contrato = dados.data;
            res.render("registo", { contrato: contrato, data: data });
        })
        .catch((erro) => {
            res.render("error", { error: erro });
        });
});

// http://localhost:16001/entidades/:nipc
router.get("/entidades/:nipc", function (req, res) {
    var data = new Date().toISOString().substring(0, 16);

    axios
        .get("http://localhost:16000/entidades/" + req.params.nipc)
        .then((response) => {
            var entidade = response.data;
            axios
                .get(
                    "http://localhost:16000/contratos?entidade=" +
                        req.params.nipc
                )
                .then((response) => {
                    var contratos = response.data;
                    var totalContratos = contratos.reduce(
                        (acc, contrato) => acc + contrato.precoContratual,
                        0
                    );
                    res.render("entidade", {
                        entidade: entidade,
                        contratos: contratos,
                        totalContratos: totalContratos,
                        data: data,
                    });
                })
                .catch((error) => {
                    res.render("error", { error: error });
                });
        })
        .catch((error) => {
            res.render("error", { error: error });
        });
});

module.exports = router;
