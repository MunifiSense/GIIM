const db = require("../models");
const Items = db.Items;
const Op = db.Sequelize.Op;

exports.getAllItems = (req, res) => {
    const type = req.query.type;
    const rarity = req.query.rarity;
    var condition;
    if(type != null && rarity === null){
        condition = {type: type};
    }else if(type === null && rarity != null){
        condition = {rarity: rarity};
    }else if(type != null && rarity != null){
        condition = {type: type, rarity: rarity};
    }
    Items.findAll({
        where: condition,
        order: [
            ['name', 'ASC']
        ]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occured while retrieving items."
        });
    });
};