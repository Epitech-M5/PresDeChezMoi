module.exports = app => {
    const recompense = require("../controllers/recompense.controller.js");

    var router = require("express").Router();

    router.post("/", recompense.create);

    router.get("/", recompense.find_all);

    router.get("/:id", recompense.find_one);

    router.put("/:id", recompense.update);

    router.delete("/:id", recompense.delete);

    app.use('/api/recompense', router);
};