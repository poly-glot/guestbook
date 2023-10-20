const { posts: Post } = require("../../models");

module.exports = async (req, res) => {
    const { title, page, perPage } = req.query;
    const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    // Set default values for page and perPage if they are not provided in the query.
    const pageNumber = parseInt(page) || 1;
    const itemsPerPage = parseInt(perPage) || 10; // You can change the default value as needed.

    try {
        const totalPosts = await Post.countDocuments(condition); // Get the total number of posts matching the condition.
        const skip = (pageNumber - 1) * itemsPerPage; // Calculate the number of documents to skip.

        const posts = await Post.find(condition)
            .skip(skip)
            .limit(itemsPerPage);

        return res.send({
            posts,
            totalPosts,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalPosts / itemsPerPage),
        });
    } catch (err) {
        let { message } = err;
        message = message ?? "Some error occurred while getting entries";

        return res.status(500).send({ message });
    }
};
