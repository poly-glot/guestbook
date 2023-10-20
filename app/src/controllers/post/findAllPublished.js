const { posts: Post } = require("../../models");

module.exports = async (req, res) => {
    const condition = { published: true };

    try {
        const posts = await Post.find(condition);
        return res.send(posts);
    } catch (err) {
        let { message } = err;
        message = message ?? "Some error occurred while getting published entries";

        return res.status(500).send({message});
    }
}
