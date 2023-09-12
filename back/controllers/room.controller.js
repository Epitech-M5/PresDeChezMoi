const db = require("../models");
const room = db.room;
const { Sequelize, Op } = require('sequelize');

exports.create = (req, res) => {
    var boolErrorFlag = false;
    var stringErrorMessage = "";

    // Champ nécessaire pour la requete
    if (!req.body.membres) {
        boolErrorFlag = true
        stringErrorMessage = "Le contenu ne peut pas être vide"
    }

    // Validate request
    if (boolErrorFlag) {
        res.status(400).send({
            message: stringErrorMessage
        });
        return;
    }

    // Create User
    const roomObjet = {
        membres: req.body.membres,
        idVille: req.body.idVille
    };

    // Save Tutorial in the database adn catch internal error
    room.create(roomObjet)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Impossible de créer une room."
            });
        });
};

exports.find_one = (req, res) => {
    const id = req.params.id;

    room.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Impossible de trouvé la room avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de trouvé la room avec id=" + id
            });
        });
};

exports.find_all = (req, res) => {
    room.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Impossible de récuperer les roles."
            });
        });
};

exports.find_all_members = (req, res) => {
    const members = req.body.membres; // Convertir en tableau

    room.findAll({
        where: Sequelize.literal(`membres LIKE '%${JSON.stringify(members)}%'`)
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération des membres."
            });
        });
};
exports.find_ville = (req, res) => {
    room.findAll({
        where: {
            idVille: req.params.idVille           // idVille: req.body.idVille
        }

    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Impossible de trouver la room de la ville."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    room.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La room a été modifié."
                });
            } else {
                res.send({
                    message: `Impossible de modifier la room avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de modifier la room avec id=" + id + "(" + err + ")"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    room.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La room a été supprimé."
                });
            } else {
                res.send({
                    message: `Impossible de supprimer la room avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer la room avec id=" + id
            });
        });
};