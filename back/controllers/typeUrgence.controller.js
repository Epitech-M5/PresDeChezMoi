const db = require("../models");
const TypeUrgence = db.typeUrgence;

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
    const typeUrgenceObjet = {
        titre: req.body.titre
    };

    // Save Tutorial in the database adn catch internal error
    TypeUrgence.create(typeUrgenceObjet)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Impossible de créer le type d'urgence."
            });
        });
};

exports.find_one = (req, res) => {
    const id = req.params.id;

    TypeUrgence.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Impossible de trouver le type d'urgence avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de trouver le type d'urgence avec id=" + id
            });
        });
};

exports.find_all = (req, res) => {
    TypeUrgence.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Impossible de trouver les types d'urgence."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    TypeUrgence.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Le type d'urgence a été modifié."
                });
            } else {
                res.send({
                    message: `Impossible de modifier le type d'urgence avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de modifier le type d'urgence avec id=" + id + "(" + err + ")"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    TypeUrgence.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Le type d'urgence à été supprimé!"
                });
            } else {
                res.send({
                    message: `Impossible de supprimer le type d'urgence avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer le type d'urgence avec id=" + id
            });
        });
};
