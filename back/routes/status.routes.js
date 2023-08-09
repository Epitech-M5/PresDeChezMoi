module.exports = app => {
    const status = require("../controllers/status.controller.js");

    var router = require("express").Router();

    router.post("/", status.create);

    router.get("/", status.find_all);

    router.get("/:id", status.find_one);

    router.put("/:id", status.update);

    router.delete("/:id", status.delete);

    app.use('/api/status', router);
};