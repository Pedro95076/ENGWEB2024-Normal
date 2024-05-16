var Contrato = require("../models/contrato");

// GET /contratos: devolve uma lista com todos os registos;
module.exports.list = () => {
    return Contrato.find().exec();
};

// GET /contratos/:id: devolve o registo com identificador id (corresponde ao idcontrato, agora _id);
module.exports.getContrato = (id) => {
    return Contrato.findOne({ _id: id })
        .then((dados) => {
            return dados;
        })
        .catch((erro) => {
            throw new Error("Erro na consulta do contrato: " + erro);
        });
};

// GET /contratos?entidade=EEEE: devolve a lista dos contratos correspondentes à entidade EEEE;
module.exports.getContratoEntidade = (entidade) => {
    return Contrato.find({ entidade_comunicante: entidade })
        .then((dados) => {
            return dados;
        })
        .catch((erro) => {
            throw new Error("Erro na consulta do contrato: " + erro);
        });
};

// GET /contratos?tipo=AAA: devolve a lista dos contratos com tipo de procedimento igual a AAA;
module.exports.getContratoTipo = (tipo) => {
    return Contrato.find({ tipoprocedimento: tipo })
        .then((dados) => {
            return dados;
        })
        .catch((erro) => {
            throw new Error("Erro na consulta do contrato: " + erro);
        });
};

// GET /contratos/entidades: devolve a lista de entidades comunicantes ordenada alfabeticamente e sem repetições;
module.exports.getEntidades = () => {
    return Contrato.distinct("entidade_comunicante")
        .then((dados) => {
            return dados.sort();
        })
        .catch((erro) => {
            throw new Error("Erro na consulta das entidades: " + erro);
        });
};

// GET /contratos/tipos: devolve a lista dos tipos de procedimento ordenada alfabeticamente e sem repetições;
module.exports.getTipos = () => {
    return Contrato.distinct("tipoprocedimento")
        .then((dados) => {
            return dados.sort();
        })
        .catch((erro) => {
            throw new Error(
                "Erro na consulta dos tipos de procedimento: " + erro
            );
        });
};

// POST /contratos: acrescenta um registo novo à BD;
module.exports.insert = (doc) => {
    var novo = new Contrato(doc);
    return novo.save();
};

// PUT /contratos/:id: altera o registo com o identificador id.
module.exports.update = (id, doc) => {
    return Contrato.updateOne({ _id: id }, doc);
};

// DELETE /contratos/:id: elimina da BD o registo com o identificador id;
module.exports.remove = (id) => {
    return Contrato.deleteOne({ _id: id });
};
