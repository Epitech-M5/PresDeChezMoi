const db = require("../models");
const Ticket = db.ticket;

// title: req.body.title,
// description: req.body.description,
// published: req.body.published ? req.body.published : false


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

    // Create User
    const ticketObjet = {
        idUtilisateur: req.body.idUtilisateur,
        titre: req.body.titre,
        idStatus: req.body.idStatus,
        message: req.body.message,
        dateCreation: req.body.dateCreation
    };

    // Save Tutorial in the database adn catch internal error
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
            if (num == 1) {
                res.send({
                    message: "Type Signalement was updated successfully."
                });
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
