const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Utilisateur = db.utilisateur;
const Role = db.roles;
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        messagsse: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  Utilisateur.findByPk(req.userId).then(user => {
    Role.findOne({
      where:{
        id: user.idRole
      }
    }).then(roles => {
        if (roles.titre === "Admin") {
          next();
          return;
        }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  Utilisateur.findByPk(req.userId).then(user => {
    Role.findOne({
      where:{
        id: user.idRole
      }
    }).then(roles => {
        if (roles.titre === "moderator") {
          next();
          return;
        }
      res.status(403).send({
        message: "Require moderator Role!"
      });
      return;
    });
  });
};



const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
};
module.exports = authJwt;