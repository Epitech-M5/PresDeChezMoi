const db = require("../models");
const Signalement = db.signalement;

exports.create = (req, res) => {
  var boolErrorFlag = false;
  var stringErrorMessage = "";

  // Champ nécessaire pour la requete
  if (!req.body.idUtilisateur) {
    boolErrorFlag = true;
    stringErrorMessage = "Le contenu ne peut pas être vide!";
  }

  // Validate request
  if (boolErrorFlag) {
    res.status(400).send({
      message: stringErrorMessage,
    });
    return;
  }

  // Create User
  const SignalementObjet = {
    idUtilisateur: req.body.idUtilisateur,
    photo: req.body.photo,
    description: req.body.description,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    graviteUrgence: req.body.graviteUrgence,
    idTypeUrgence: req.body.idTypeUrgence,
    estTraite: req.body.estTraite,
  };

  // Save Tutorial in the database adn catch internal error
  Signalement.create(SignalementObjet)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Impossible de créer le signalement.",
      });
    });
};

exports.find_one = (req, res) => {
  const id = req.params.id;

  Signalement.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de trouver le signalement avec id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Impossible de trouver le signalement avec id=" + id,
      });
    });
};

exports.find_all = (req, res) => {
  Signalement.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Impossible de trouver les signalements.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Signalement.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Le signalement a été modifié.",
        });
      } else {
        res.send({
          message: `Impossible de modifier le signalement avec id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Impossible de modifier le signalement avec id=" + id + "(" + err + ")",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Signalement.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Le signalement a été supprimé!",
        });
      } else {
        res.send({
          message: `Impossible de supprimer le signalement avec id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Impossible de supprimer le signalement avec id=" + id,
      });
    });
};
