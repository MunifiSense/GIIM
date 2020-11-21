const db = require("../models");
const Items = db.Items;
const Monsters = db.Monsters;
const ItemMonsters = db.ItemMonsters;
const UserItems = db.UserItems;
const Op = db.Sequelize.Op;

exports.getUserItemsMonsters = (req, res) => {
    const id = req.params.id;
    Items.findAll({
        include: [{
            model: Users,
            as: 'Users',
            where:{
                user_id: id
            },
            attributes: ["user_id"]
        },{
            model: Monsters,
            as: 'Monsters'
        }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occured while retrieving the user's Items."
            });
        });
};