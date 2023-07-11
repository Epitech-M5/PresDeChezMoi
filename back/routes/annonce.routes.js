module.exports = app => {
    const annonce = require("../controllers/annonce.controller.js");
    const { authJwt } = require("../middleware");
    var router = require("express").Router();

    router.post("/", [authJwt.verifyToken], annonce.create);

    router.get("/", [authJwt.verifyToken], annonce.find_all);

    router.get("/:id", [authJwt.verifyToken], annonce.find_one);

    router.put("/:id", [authJwt.verifyToken], annonce.update);

    router.delete("/:id", [authJwt.verifyToken], annonce.delete);

    app.use('/api/annonce', router);
};