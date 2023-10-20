const { posts: Post } = require("../../models");

module.exports = async (req, res) => {
    try {
        const posts = await Post.deleteMany({});

        return res.send({ message: `${posts.deletedCount} entries were deleted successfully!`});
    } catch (err) {
        let { message } = err;
        message = message ?? `Some error occurred while removing all entries`;

        return res.status(500).send({message});
    }
}
