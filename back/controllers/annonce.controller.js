const db = require("../models");
const annonce = db.annonce;
const Utilisateur = db.utilisateur;

// Ajouter une annonce
exports.create = (req, res) => {
    var boolErrorFlag = false;
    var stringErrorMessage = "";

    // Champ nécessaire pour la requete
    if (!req.body.titre) {
        boolErrorFlag = true
        stringErrorMessage = "Le titre ne peux pas être vide"
    }

    // Validation de la requête
    if (boolErrorFlag) {
        res.status(400).send({
            message: stringErrorMessage
        });
        return;
    }

    // Récupération de l'utilisateur qui ajoute l'annonce
    Utilisateur.findOne({
        where: {
            id: req.userId
        }
    })
        .then(async user => {
            var annonceObjet
            // Si c'est un administrateur
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
                    reaction: 0,
                    idTypeActivite: req.body.idTypeActivite,
                    annonceMairie: true,
                    idTypeSignalement: req.body.idTypeSignalement,
                    idUtilisateurSignalement: req.body.idUtilisateurSignalement,
                    prix: req.body.prix,
                    longitude: req.body.longitude,
                    latitude: req.body.latitude,
                    idVille: req.body.idVille,
                    estVerifie: false,
                    parking: req.body.parking,
                    parkingGratuit: req.body.parkingGratuit
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
                    reaction: 0,
                    idTypeActivite: req.body.idTypeActivite,
                    annonceMairie: false,
                    idTypeSignalement: req.body.idTypeSignalement,
                    idUtilisateurSignalement: req.body.idUtilisateurSignalement,
                    prix: req.body.prix,
                    longitude: req.body.longitude,
                    latitude: req.body.latitude,
                    estVerifie: false,
                    idVille: req.body.idVille,
                    parking: req.body.parking,
                    parkingGratuit: req.body.parkingGratuit
                }
            }

            // Création de l'annonce dans la base de données
            annonce.create(annonceObjet)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Une erreur est survenu lors de la création de l'annonce"
                    });
                });
        });
};

// Sélectionner une annonce grâce à son id
exports.find_one = (req, res) => {
    const id = req.params.id;

    annonce.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Impossible de trouver l'annonce id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de trouver l'annonce id=" + id
            });
        });
};

// trouver toutes les annonces
exports.find_all = (req, res) => {
    annonce.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur est survenu lors de la recherche des annonces."
            });
        });
};

async function userFindRole(userId) {
    Utilisateur.findOne({
        where: {
            id: userId
        }
    }).then((user) => {
        if (user.idRole == 3) {
            return true
        } else {
            return false
        }
    })
}

// A TESTER
exports.update = (req, res) => {
    const id = req.params.id;
    let flagValidModif = false

    if (id == req.userId) {
        flagValidModif = true
    }
    else {
        flagValidModif = userFindRole(req.userId)
    }

    if (flagValidModif) {
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
    }
};

// Suppression d'une l'annonce
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
                                    message: "L'annonce a été modifié avec succès."
                                });
                            } else {
                                res.send({
                                    message: `Impossible de modifier l'annonce avec id=${id}.`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Erreur lors de la modification de l'annonce avec id=" + id + "(" + err + ")"
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
                                    message: "l'Annonce a été supprimé."
                                });
                            } else {
                                res.send({
                                    message: `Impossible de supprimer l'Annonce avec id=${id}.`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "impossible de supprimer l'annonce avec id=" + id
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