const db = require("../models");
const chat = db.chat;

// title: req.body.title,
// description: req.body.description,
// published: req.body.published ? req.body.published : false

exports.create = (req, res) => {
  //  token
  var boolErrorFlag = false;
  var stringErrorMessage = "";

  // Champ nécessaire pour la requete
  if (!req.body.message) {
    boolErrorFlag = true;
    stringErrorMessage = "Le contenu ne peut pas être vide !";
  }

  if (!req.body.idRoom) {
    boolErrorFlag = true;
    stringErrorMessage = "Il doit y avoir l'identifiant idRoom !";
  }

  if (!req.body.idUtilisateur) {
    boolErrorFlag = true;
    stringErrorMessage = "Il doit y avoir l'identifiant idUtilisateur !";
  }

  if (!req.body.pseudo) {
    boolErrorFlag = true;
    stringErrorMessage = "Il doit y avoir le pseudo !";
  }

  // Validate request
  if (boolErrorFlag) {
    res.status(400).send({
      message: stringErrorMessage,
    });
    return;
  }
  // Create User
  const chatObjet = {
    idRoom: req.body.idRoom,
    message: req.body.message,
    pseudo: req.body.pseudo,
    idUtilisateur: req.body.idUtilisateur, // Utilisez req.body.idUtilisateur ici
    image: req.body.image,
  };

  // Save Tutorial in the database adn catch internal error
  chat
    .create(chatObjet)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenu lors de la création du chat.",
      });
    });
};

exports.find_one = (req, res) => {
  const id = req.params.id;

  chat
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de trouver le chat avec id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Une erreur est survenu lors de la récupération du chat avec l'identifiant id=" + id,
      });
    });
};

exports.find_all = (req, res) => {
  chat
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenu lors de la récupération des chat.",
      });
    });
};

exports.find_by_idRoom = (req, res) => {
  const idRoom = req.params.idRoom; // Remplacé idUtilisateur par idRoom

  chat
    .findAll({
      where: { idRoom: idRoom }, // Remplacé idUtilisateur par idRoom
    })
    .then((data) => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res.send([]);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Une erreur est survenu lors de la récupération du chat avec idRoom=" + idRoom, // Remplacé idUtilisateur par idRoom
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  chat
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "le Chat à bien été modifié.",
        });
      } else {
        res.send({
          message: `Impossible de modifier le chat avec id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la modification du chat avec id=" + id + "(" + err + ")",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  chat
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "le Chat à bien été supprimé.",
        });
      } else {
        res.send({
          message: `Impossible de supprimer le chat avec id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Impossible de supprimer le chat avec id=" + id,
      });
    });
};
