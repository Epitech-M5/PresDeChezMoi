const db = require("../models");
const typeActivite = db.typeActivite;

// title: req.body.title,
// description: req.body.description,
// published: req.body.published ? req.body.published : false


exports.create = (req, res) => {
    var boolErrorFlag = false;
    var stringErrorMessage = "";

    // Champ nécessaire pour la requete
    if (!req.body.type) {
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
    const typeActiviteObjet = {
        type: req.body.type,
        description: req.body.description
    };
    console.log(typeActiviteObjet)

    // Save Tutorial in the database adn catch internal error
    typeActivite.create(typeActiviteObjet)
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

    typeActivite.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Type Urgence with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Type Urgence with id=" + id
            });
        });
};

exports.find_all = (req, res) => {
    typeActivite.findAll()
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

    typeActivite.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Type Urgence was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Type Urgence with id=${id}. Maybe Type Urgence was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Type Urgence with id=" + id + "(" + err + ")"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    typeActivite.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Type Urgence was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Type Urgence with id=${id}. Maybe Type Urgence was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Type Urgence with id=" + id
            });
        });
};
