const { posts: Post } = require("../../models");

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send(`Not found any post with id ${id}`);
        }

        return res.send(post);
    } catch (err) {
        let { message } = err;
        message = message ?? `Error retrieving entry with id ${id}`;

        return res.status(500).send({message});
    }
}
