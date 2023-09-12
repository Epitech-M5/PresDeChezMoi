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
    const statusObjet = {
        titre: req.body.titre
    };

    // Save Tutorial in the database adn catch internal error
    Status.create(statusObjet)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Impossible de créer le status"
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
                    message: `Impossible de trouver le status avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de trouver le status avec id=" + id
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
                    err.message || "Impossible de trouver le status."
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
                    message: "le status a été modifié."
                });
            } else {
                res.send({
                    message: `Impossible de modifier le status avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de modifier le status avec id=" + id + "(" + err + ")"
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
                    message: "le status a été supprimé!"
                });
            } else {
                res.send({
                    message: `Impossible de supprimer le status avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer le status avec id=" + id
            });
        });
};
