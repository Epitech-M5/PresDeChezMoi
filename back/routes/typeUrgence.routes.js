module.exports = app => {
    const typeUrgence = require("../controllers/typeUrgence.controller.js");

    var router = require("express").Router();

    router.post("/", typeUrgence.create);

    router.get("/", typeUrgence.find_all);

    router.get("/:id", typeUrgence.find_one);

    router.put("/:id", typeUrgence.update);

    router.delete("/:id", typeUrgence.delete);

    app.use('/api/typeUrgence', router);
};