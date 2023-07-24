const db = require("../models");
const { Op } = require('sequelize');
const Ticket = db.ticket;
const Notification = db.notification;
const Status = db.status;

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
        idUtilisateur: req.body.idUtilisateur,
        titre: req.body.titre,
        idStatus: req.body.idStatus,
        message: req.body.message,
        dateCreation: req.body.dateCreation
    };

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

// ADMIN: peut voir tout les tivket existant
exports.find_all = (req, res) => {
    Ticket.findAll()
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

exports.update = (req, res) => {
    const id = req.params.id;

    Ticket.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            const idStatus = req.body.idStatus

            if (num == 1) {
                            // Cherche le nom du status en fonction de l'id pour l'envoyer au front
            Status.findByPk(idStatus)
            .then(data => {
                if (data) {
                    console.log("status data",data)
                    res.send(data);
            // quand status est ok j'envoi la notification
                } else {
                    res.status(404).send({
                        message: `Cannot find Status with id=${id}.`
                    });
                }
            })
            
                // const NotificationObjet = {
                //     idUtilisateur: data.idUtilisateur,
                //     titre: req.body.titre,
                //     supprimer: false,
                //     message: req.body.message,
                //     dateCreation: null
                // };
            
            } else {
                res.send({
                    message: `Cannot update Type Signalement with id=${id}. Maybe Type Signalement was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Type Signalement with id=" + id + "(" + err + ")"
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
                    message: "Type Signalement was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Type Signalement with id=${id}. Maybe Type Signalement was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Type Signalement with id=" + id
            });
        });
};

// ADMIN: peut voir tout les ticket par rapport à leurs status
exports.find_all_by_status= (req, res) => {
    const id = req.params.id;

    Ticket.findAll({
        where: {
            idStatus: id
          }
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

// ADMIN: trier les tickets du plus récent aux ancien
exports.find_all_by_date= (req, res) => {
    const order = req.params.order;
    let value;
    if(order === "desc") {
        value = 'DESC';
    }else {
        value = 'ASC';

    }
    Ticket.findAll({
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