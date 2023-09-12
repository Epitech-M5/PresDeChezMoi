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
        stringErrorMessage = "Le contenu ne peut pas être vide."
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

    // Save Tutorial in the database adn catch internal error
    typeActivite.create(typeActiviteObjet)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Impossible de créer le type d'activité."
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
                    message: `Impossible de trouver le type d'acvtivité avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de trouver le type d'activité avec id=" + id
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
                    err.message || "Impossible de trouver le type d'activité."
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
                    message: "Type Urgence was updated successfullyle type d'activité à été modifié."
                });
            } else {
                res.send({
                    message: `Impossible de modifier le type d'activité avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de modifier le type d'activité avec id=" + id + "(" + err + ")"
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
                    message: "le type d'activité a été supprimé."
                });
            } else {
                res.send({
                    message: `Impossible de suppriemr le type d'activité avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer le type d'activité avec id=" + id
            });
        });
};
