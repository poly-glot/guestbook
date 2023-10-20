const { posts: Post } = require("../../models");

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByIdAndUpdate(id, req.body);

        if (!post) {
            return res.status(404).send(`Not found any post with id ${id}`);
        }

        const updatedPost = await Post.findById(id);

        return res.send(updatedPost);
    } catch (err) {
        let { message } = err;
        message = message ?? `Some error occurred while update entry with ${id}`;

        return res.status(500).send({message});
    }
}
