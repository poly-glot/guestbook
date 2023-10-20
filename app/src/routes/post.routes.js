const posts = require("../controllers/post");
module.exports = app => {
    const posts = require("../controllers/post");

    const router = require("express").Router();

    router.post("/", posts.create);
    router.get("/", posts.findAll);
    router.get("/published", posts.findAllPublished);
    router.get("/:id", posts.findOne);
    router.put("/:id", posts.update);
    router.delete("/:id", posts.delete);
    router.delete("/", posts.deleteAll);

    app.use("/api/posts", router);
};
