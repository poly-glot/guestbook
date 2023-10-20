const create = require("./create");
const findAll = require("./findAll");
const findOne = require("./findOne");
const findAllPublished = require("./findAllPublished");
const update = require("./update");
const deleteEntry = require("./delete");
const deleteAll = require("./deleteAll");

module.exports = {
    create,
    findAll,
    findOne,
    findAllPublished,
    update,
    delete: deleteEntry,
    deleteAll,
}
