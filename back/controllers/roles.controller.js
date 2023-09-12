const db = require("../models");
const Roles = db.roles;

// title: req.body.title,
// description: req.body.description,
// published: req.body.published ? req.body.published : false


exports.create = (req, res) => {
    var boolErrorFlag = false;
    var stringErrorMessage = "";

    // Champ nécessaire pour la requete
    if (!req.body.titre) {
        boolErrorFlag = true
        stringErrorMessage = "le contenu ne peut pas être vide!"
    }

    // Validate request
    if (boolErrorFlag) {
        res.status(400).send({
            message: stringErrorMessage
        });
        return;
    }

    // Create User
    const rolesObjet = {
        titre: req.body.titre
    };

    // Save Tutorial in the database adn catch internal error
    Roles.create(rolesObjet)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la création du role."
            });
        });
};

exports.find_one = (req, res) => {
    const id = req.params.id;

    Roles.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Role non trouvé avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Une erreur est survenue lors de la récupération du role avec id=" + id
            });
        });
};

exports.find_all = (req, res) => {
    Roles.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenue lors de la récupération des roles."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Roles.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Le role a été modifié."
                });
            } else {
                res.send({
                    message: `Impossible de modifier le role avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de modifier le role avec id=" + id + "(" + err + ")"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Roles.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: ""
                });
            } else {
                res.send({
                    message: `Impossible de supprimer le role avec id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer le role avec id=" + id
            });
        });
};
