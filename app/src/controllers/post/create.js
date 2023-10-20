const { posts: Post } = require("../../models");

module.exports = async (req, res) => {
    let { title, description, published } = req.body;
    published = published ?? false;

    if (!title) {
        res.status(400).send({ message: "title can not be empty!" });
        return;
    }

    try {
        const post = await Post.create({
            title,
            description,
            published
        });

        return res.send(post);
    } catch (err) {
        let { message } = err;
        message = message ?? "Some error occurred while saving entry";

        return res.status(500).send({message});
    }
}
