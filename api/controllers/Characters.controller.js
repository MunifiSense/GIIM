const db = require("../models");
const Characters = db.Characters;
const Op = db.Sequelize.Op;

exports.getCharacter = (req, res) => {
    const name = req.params.name;
    Characters.findAll({where: {
        name : name
    }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occured while retrieving the character."
            });
        });
};

exports.getAllCharacters = (req, res) => {
    Characters.findAll({
        order: [
            ['name', 'ASC']
        ]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occured while retrieving characters."
            });
        });
};

