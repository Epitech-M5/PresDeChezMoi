const db = require("../models");
const Utilisateur = db.utilisateur;

// title: req.body.title,
// description: req.body.description,
// published: req.body.published ? req.body.published : false


exports.create = (req, res) => {
    var boolErrorFlag = false;
    var stringErrorMessage = "";

    // Champ nécessaire pour la requete
    if (!req.body.pseudo || !req.body.mail || !req.body.motDePasse) {
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
    const utilisateurObjet = {
        pseudo: req.body.pseudo,
        nom: null,
        prenom: null,
        photoProfil: null,
        mail: req.body.mail,
        motDePasse: bcrypt.hashSync(req.body.password, 8),
        idVille: null,
        score: null,
        participation: null,
        estAdministrateur: null,
        abonnement: null,
        profession: null,
        idRecompense: null,
        listRecompense: null,
        nombreSignalement: null,
        estBanni: null,
        idRole: req.body.roles, // A RAJOUTER DANS POSTMAN
        listAnnonceEnregistre: null
    };

    // Save User in the database adn catch internal error
    Utilisateur.create(utilisateurObjet)
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
    res.send("Coucou");
};

exports.find_all = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};
