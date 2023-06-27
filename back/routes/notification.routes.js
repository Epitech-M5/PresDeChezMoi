module.exports = app => {
    const Notification = require("../controllers/notification.controller.js");

    var router = require("express").Router();

    router.post("/", Notification.create);

    router.get("/", Notification.find_all);

    router.get("/:id", Notification.find_one);

    router.put("/:id", Notification.update);

    router.delete("/:id", Notification.delete);

    app.use('/api/notification', router);
};