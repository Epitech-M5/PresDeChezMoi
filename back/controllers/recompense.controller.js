const db = require("../models");
const Recompense = db.recompense;

// title: req.body.title,
// description: req.body.description,
// published: req.body.published ? req.body.published : false


exports.create = (req, res) => {
    var boolErrorFlag = false;
    var stringErrorMessage = "";

    // Champ nécessaire pour la requete
    if (!req.body.nom) {
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
    const RecompenseObjet = {
        nom: req.body.nom,
        image: req.body.image,
        idVille: req.body.idVille,
        scoreNecessaire: req.body.scoreNecessaire
    };

    // Save Tutorial in the database adn catch internal error
    Recompense.create(RecompenseObjet)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la création de la récompense."
            });
        });
};

exports.find_one = (req, res) => {
    const id = req.params.id;

    Recompense.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Impossible de trouvé la récompense avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de trouvé la récompense avec id=" + id
            });
        });
};

exports.find_all = (req, res) => {
    Recompense.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la récupération des récompenses."
            });
        });
};
exports.find_all_by_ville = (req, res) => {
    Recompense.findAll({ where: { idVille: req.params.idVille } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la récupération des récompenses."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Recompense.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La récompense à été modifié."
                });
            } else {
                res.send({
                    message: `Impossible de modifier la récompense avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de modifier la récompense avec id=" + id + "(" + err + ")"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Recompense.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La récompense à été modifié."
                });
            } else {
                res.send({
                    message: `Impossible de modifier la récompense avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de modifier la récompense avec id=" + id
            });
        });
};
