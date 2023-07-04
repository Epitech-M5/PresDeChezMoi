const db = require("../models");
const Signalement = db.signalement;

// title: req.body.title,
// description: req.body.description,
// published: req.body.published ? req.body.published : false


exports.create = (req, res) => {
    var boolErrorFlag = false;
    var stringErrorMessage = "";

    // Champ nécessaire pour la requete
    if (!req.body.idUtilisateur) {
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
    const SignalementObjet = {
        idUtilisateur: req.body.idUtilisateur,
        photo: req.body.photo,
        description: req.body.description,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        graviteUrgence: req.body.graviteUrgence,
        idTypeUrgence: req.body.idTypeUrgence,
        estTraite: req.body.estTraite,

    };

    // Save Tutorial in the database adn catch internal error
    Signalement.create(SignalementObjet)
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

    Signalement.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Signalement with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Signalement with id=" + id
            });
        });
};

exports.find_all = (req, res) => {
    Signalement.findAll()
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

    Signalement.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Signalement was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Signalement with id=${id}. Maybe Signalement was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Signalement with id=" + id + "(" + err + ")"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Signalement.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Signalement was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Signalement with id=${id}. Maybe Signalement was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Signalement with id=" + id
            });
        });
};
