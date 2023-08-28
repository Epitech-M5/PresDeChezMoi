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
    stringErrorMessage = "Content can not be empty !";
  }

  if (!req.body.idRoom) {
    boolErrorFlag = true;
    stringErrorMessage = "it must be a idRoom !";
  }

  if (!req.body.idUtilisateur) {
    boolErrorFlag = true;
    stringErrorMessage = "it must be a idUtilisateur !";
  }

  if (!req.body.pseudo) {
    boolErrorFlag = true;
    stringErrorMessage = "it must be a pseudo !";
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

  console.log("~~~~~~~~~~", chatObjet);
  // Save Tutorial in the database adn catch internal error
  chat
    .create(chatObjet)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
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
          message: `Cannot find Role with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Role with id=" + id,
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
          err.message || "Some error occurred while retrieving tutorials.",
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
          "Error retrieving messages with idRoom=" + idRoom, // Remplacé idUtilisateur par idRoom
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
          message: "Role was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Role with id=" + id + "(" + err + ")",
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
          message: "Role was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Role with id=${id}. Maybe Role was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Role with id=" + id,
      });
    });
};
