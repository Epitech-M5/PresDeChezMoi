const db = require("../models");
const { Op } = require('sequelize');
const Ticket = db.ticket;
const Notification = db.notification;
const Status = db.status;
const Utilisateur = db.utilisateur;

// Pour l'utilisateur
exports.create = (req, res) => {
    var boolErrorFlag = false;
    var stringErrorMessage = "";

    // Champ nécessaire pour la requete
    if (!req.body.titre) {
        boolErrorFlag = true
        stringErrorMessage = "Content can not be empty!"
    }
    // Validate request
    if (boolErrorFlag) {
        res.status(400).send({
            message: stringErrorMessage
        });
        return;
    }

    // Create ticket
    const ticketObjet = {
        idUtilisateur: req.userId,
        titre: req.body.titre,
        idStatus: req.body.idStatus,
        message: req.body.message,
        dateCreation: req.body.dateCreation,
        idVille: req.body.idVille
    };
    console.log("OBJECT TICKET => ", req.body)

    // Save Ticket in the database
    Ticket.create(ticketObjet)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};


// Trouver un ticket par sont id
// ADMIN ->  voir le détails du tciket
exports.find_one = (req, res) => {
    const id = req.params.id;

    Ticket.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Type Signalement with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Type Signalement with id=" + id
            });
        });
};

// ADMIN: peut voir tout les ticket existant
exports.find_all = (req, res) => {
    Ticket.findAll({
        include: [{
            model: Utilisateur,
            attributes: ['pseudo']
        },
        {
            model: Status,
            attributes: ['titre']
        }],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// ADMIN: modifie le statue du ticket
exports.update = (req, res) => {
    const id = req.params.id;
    Ticket.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            const idStatus = req.body.idStatus
            if (num == 1) {
                // Cherche le nom du status en fonction de l'id selectionné pour l'envoyer au front
                Status.findByPk(idStatus)
                    .then(data => {
                        if (data) {
                            // Le status change dans l'onglet ticket de l'utilisateur et pour l'admin
                            res.send(data);
                        } else {
                            res.status(404).send({
                                message: `Cannot find Status with id=${id}.`
                            });
                        }
                    })

            } else {
                res.send({
                    message: `Impossible de modifier le status du ticket avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la modification du status du ticket avec id=" + id + "(" + err + ")"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Ticket.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Le ticket aa été supprimé avec succès!"
                });
            } else {
                res.send({
                    message: `Impossible de supprimer le ticket avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer le ticket avec id=" + id
            });
        });
};

// ADMIN: peut voir tout les ticket par rapport à leurs status
exports.find_all_by_status = (req, res) => {
    const nameReqStatus = req.params.status;
    var nameStatus = "";

    switch (nameReqStatus) {
        case "nonResolu":
            nameStatus = "non résolu"
            break;
        case "enCours":
            nameStatus = "en cours de traitement"
            break;
        case "resolu":
            nameStatus = "résolu"
            break;
        case "inapproprie":
            nameStatus = "inapproprié"
            break;
    }
    console.log("nameStatus", nameStatus)

    Ticket.findAll({
        include: [
            {
                model: Utilisateur,
                attributes: ['pseudo']
            },
            {
                model: Status,
                where: {
                    titre: nameStatus
                }
            }
        ]

    })
        .then(data => {

            res.send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenu pour retrouver le ticket."
            });
        });
};

// ADMIN: trier les tickets du plus récent aux ancien
exports.find_all_by_date = (req, res) => {
    const order = req.params.order;
    let value;
    if (order === "desc") {
        value = 'DESC'; // plus récents
    } else {
        value = 'ASC';

    }
    Ticket.findAll({
        include: [{
            model: Utilisateur,
            attributes: ['pseudo']
        },
        {
            model: Status,
            attributes: ['titre']
        }],
        // Filtre des datas
        order: [['createdAt', value]],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });

};

exports.find_one_by_user = (req, res) => {
    const id = req.params.id;

    Ticket.findAll({

        where: {
            idUtilisateur: id
        },
        include: [{
            model: Status,
            attributes: ['titre']
        }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenu pour retrouver le ticket."
            });
        });
};