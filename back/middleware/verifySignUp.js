const db = require("../models");
const ROLES = db.ROLES;
const User = db.users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
   // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }else{
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Échec ! L'adresse e-mail est déjà utilisée."
          });
          return;
        } else {
          next();
        }
      }).catch(err => {
        console.log(err);
        res.status(500).send({
          message: "Une erreur est survenue lors de la vérification de l'adresse e-mail."
        });
      });
    }
  })
  .catch(err => {
    console.log(err)
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }else {
        console.log("message", "erreur au niveau des rôles = " + req.body.roles[i])
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;