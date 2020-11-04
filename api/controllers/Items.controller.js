const db = require("../models");
const Items = db.Items;
const Op = db.Sequelize.Op;

exports.getItem = (req, res) => {
    const type = req.params.type;
    const rarity = req.params.rarity;
    Items.findAll({where: {
        type : type,
        rarity : rarity
    }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occured while retrieving the item."
            });
        });
};