const { posts: Post } = require("../../models");

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByIdAndRemove(id);

        if (!post) {
            return res.status(404).send(`Cannot delete entry with id ${id}. May be it is deleted?`);
        }

        return res.send({ message: `Successfully removed ${id}`});
    } catch (err) {
        let { message } = err;
        message = message ?? `Could not delete an entry with id ${id}`;

        return res.status(500).send({message});
    }
}
