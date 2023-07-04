const db = require("../models");
const Utilisateur = db.utilisateur;
// Pour jwt
const config = require("../config/auth.config");
const Role = db.roles;
const { refreshToken: RefreshToken } = db;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
// title: req.body.title,
// description: req.body.description,
// published: req.body.published ? req.body.published : false


// Sign UP
exports.signup = (req, res) => {
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
        motDePasse: bcrypt.hashSync(req.body.motDePasse, 8),
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
        idRole: req.body.idRole, // A RAJOUTER DANS POSTMAN
        listAnnonceEnregistre: null
    };

    // Save User in the database adn catch internal error
    Utilisateur.create(utilisateurObjet)
        .then(async data => {
          const token = jwt.sign({ id: data.id }, config.secret, {
            expiresIn: config.jwtExpiration // Durée de validité du token d'accès (1 heure dans cet exemple)
          });
    
          // Generate refresh token
          const refreshToken = await RefreshToken.createToken(data.id);
    
          res.status(200).send({
            id: data.id,
            pseudo: data.pseudo,
            idRole: data.idRole,
            accessToken: token,
            refreshToken: refreshToken
          });
            console.log("inscription", "User was registered successfully!")
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.signin = (req, res) => {
  Utilisateur.findOne({
        where: {
            pseudo: req.body.pseudo
        }
    })
    .then(async user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.motDePasse,
          user.motDePasse
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: config.jwtExpiration
        });
  
        let refreshToken = await RefreshToken.createToken(user);
        Role.findOne({
          where:{
            id: user.idRole
          }
        }).then(roles=>{
          res.status(200).send({
            id: user.id,
            pseudo: user.pseudo,
            idRole: user.idRole,
            accessToken: token,
            refreshToken: refreshToken,
          });
          console.log("user connect")
        })
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }
  
    try {
      let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
  
      if (!refreshToken) {
        console.log("Refresh token is not in database!");

        res.status(403).json({ message: "Refresh token is not in database!" });
        return;
      }
  
      if (RefreshToken.verifyExpiration(refreshToken)) {
        RefreshToken.destroy({ where: { id: refreshToken.id } });
        console.log("Refresh token was expired. Please make a new signin request");
        res.status(403).json({
          message: "Refresh token was expired. Please make a new signin request",
        });
        return;
      }
      const user = await refreshToken.getUtilisateur();
      let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
  
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
      console.log("ERRORRRRR", err);
      return res.status(500).send({ message: err });
    }
  };

exports.find_all = (req, res) => {
  res.status(200).send("Tu as les accès avec le token.");
};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};
