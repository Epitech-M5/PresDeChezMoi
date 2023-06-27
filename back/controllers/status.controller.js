const db = require("../models");
const Status = db.status;

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
    const statusObjet = {
        titre: req.body.titre
    };
    console.log(statusObjet)

    // Save Tutorial in the database adn catch internal error
    Status.create(statusObjet)
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

    Status.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Status with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Status with id=" + id
            });
        });
};

exports.find_all = (req, res) => {
    Status.findAll()
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

    Status.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Status was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Status with id=${id}. Maybe Status was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Status with id=" + id + "(" + err + ")"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Status.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Status was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Status with id=${id}. Maybe Status was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Status with id=" + id
            });
        });
};
