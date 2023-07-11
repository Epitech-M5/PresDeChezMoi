const db = require("../models");
const annonce = db.annonce;
const Utilisateur = db.utilisateur;

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
    Utilisateur.findOne({
        where: {
            id: req.userId
        }
    })
        .then(async user => {
            var annonceObjet
            console.log(user)
            console.log(user.idRole)
            if (user.idRole == 3) {
                annonceObjet = {
                    titre: req.body.titre,
                    description: req.body.description,
                    image: req.body.image,
                    organisateur: req.userId,
                    participants: null,
                    dateDebut: req.body.dateDebut,
                    dateFin: req.body.dateFin,
                    estActive: true,
                    moyenne: null,
                    idTypeActivite: req.body.idTypeActivite,
                    annonceMairie: true,
                    idTypeSignalement: req.body.idTypeSignalement,
                    idUtilisateurSignalement: req.body.idUtilisateurSignalement,
                    prix: req.body.prix
                }
            } else {
                annonceObjet = {
                    titre: req.body.titre,
                    description: req.body.description,
                    image: req.body.image,
                    organisateur: req.userId,
                    participants: null,
                    dateDebut: req.body.dateDebut,
                    dateFin: req.body.dateFin,
                    estActive: true,
                    moyenne: null,
                    idTypeActivite: req.body.idTypeActivite,
                    annonceMairie: false,
                    idTypeSignalement: req.body.idTypeSignalement,
                    idUtilisateurSignalement: req.body.idUtilisateurSignalement,
                    prix: req.body.prix
                }
            }

            // Save Tutorial in the database adn catch internal error
            annonce.create(annonceObjet)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Tutorial."
                    });
                });
        });
};

exports.find_one = (req, res) => {
    const id = req.params.id;

    annonce.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Role with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Role with id=" + id
            });
        });
};

exports.find_all = (req, res) => {
    annonce.findAll()
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

// a faire admin et modérateur report
exports.update = (req, res) => {
    const id = req.params.id;
    Utilisateur.findOne({
        where: {
            id: req.userId
        }
    })
        .then(async user => {
            if (user.idRole == 3 || user.idRole == 2) {
                editAnnonce(req, res, id, true)
            } else {
                editAnnonce(req, res, id, false)
            }
        })
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Utilisateur.findOne({
        where: {
            id: req.userId
        }
    })
        .then(async user => {
            if (user.idRole == 3 || user.idRole == 2) {
                deleteAnnonce(req, res, id, true)
            } else {
                deleteAnnonce(req, res, id, false)
            }
        })
};
function editAnnonce(req, res, id, isAdmin) {
    annonce.findOne({
        where: {
            id: id
        }
    })
        .then(async annonceData => {
            if (annonceData) {
                if (annonceData.organisateur == req.userId || isAdmin) {

                    annonce.update(req.body, {
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "Role was updated successfully."
                                });
                            } else {
                                res.send({
                                    message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error updating Role with id=" + id + "(" + err + ")"
                            });
                        });
                } else {
                    res.status(401).send({
                        message: "Ce n'est pas votre annonce"
                    });
                }
            } else {
                res.status(404).send({
                    message: "Annonce introuvable"
                });
            }
        })
}
function deleteAnnonce(req, res, id, isAdmin) {
    annonce.findOne({
        where: {
            id: id
        }
    })
        .then(async annonceData => {
            if (annonceData) {
                if (annonceData.organisateur == req.userId || isAdmin) {
                    annonce.destroy({
                        where: { id: id }
                    })
                        .then(num => {
                            if (num == 1) {
                                res.send({
                                    message: "Role was deleted successfully!"
                                });
                            } else {
                                res.send({
                                    message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Could not delete Role with id=" + id
                            });
                        });
                } else {
                    res.status(401).send({
                        message: "Ce n'est pas votre annonce"
                    });
                }
            }
            else {
                res.status(404).send({
                    message: "Annonce introuvable"
                });
            }
        })
}