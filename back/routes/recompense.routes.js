module.exports = app => {
    const recompense = require("../controllers/recompense.controller.js");
    const { authJwt } = require("../middleware");
    var router = require("express").Router();

    router.post("/", [authJwt.verifyToken], recompense.create);

    router.get("/", recompense.find_all);

    router.get("/ville/:idVille", recompense.find_all_by_ville);

    router.get("/:id", recompense.find_one);

    router.put("/:id", recompense.update);

    router.delete("/:id", recompense.delete);

    app.use('/api/recompense', router);
};