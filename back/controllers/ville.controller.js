const db = require("../models");
const Ville = db.ville;

// title: req.body.title,
// description: req.body.description,
// published: req.body.published ? req.body.published : false


exports.create = (req, res) => {
    var boolErrorFlag = false;
    var stringErrorMessage = "";

    // Champ nécessaire pour la requete
    if (!req.body.nom || !req.body.codePostal || !req.body.scoreVilleFleurie) {
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
    const VilleObjet = {
        nom: req.body.nom,
        codePostal: req.body.codePostal,
        scoreVilleFleurie: req.body.scoreVilleFleurie,
        noteHygiene: null,
        moyenneHygiene: null,
        noteService: null,
        moyenneService: null,
        noteEvenement: null,
        moyenneEvenement: null,
        scoreGlocale: null
    };

    // Save Tutorial in the database adn catch internal error
    Ville.create(VilleObjet)
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

    Ville.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Ville with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Ville with id=" + id
            });
        });
};

exports.find_all = (req, res) => {
    Ville.findAll()
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

    Ville.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ville was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Ville with id=${id}. Maybe Ville was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ville with id=" + id + "(" + err + ")"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Ville.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ville was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Ville with id=${id}. Maybe Ville was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Ville with id=" + id
            });
        });
};
