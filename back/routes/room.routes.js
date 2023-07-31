module.exports = app => {
    const room = require("../controllers/room.controller.js");
    const { authJwt } = require("../middleware");

    var router = require("express").Router();

    router.post("/", [authJwt.verifyToken], room.create);

    router.get("/", [authJwt.verifyToken], room.find_all);

    router.get("/members", [authJwt.verifyToken], room.find_all_members);

    router.get("/ville/:idVille", [authJwt.verifyToken], room.find_ville);

    router.get("/:id", [authJwt.verifyToken], room.find_one);

    router.put("/:id", [authJwt.verifyToken], room.update);

    router.delete("/:id", [authJwt.verifyToken], room.delete);

    app.use('/api/room', router);
};