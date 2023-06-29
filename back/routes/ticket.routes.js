module.exports = app => {
    const Ticket = require("../controllers/ticket.controller.js");

    var router = require("express").Router();

    router.post("/", Ticket.create);

    router.get("/", Ticket.find_all);

    router.get("/:id", Ticket.find_one);

    router.put("/:id", Ticket.update);

    router.delete("/:id", Ticket.delete);

    app.use('/api/ticket', router);
};