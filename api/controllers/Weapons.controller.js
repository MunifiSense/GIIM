const db = require("../models");
const Weapons = db.Weapons;
const Op = db.Sequelize.Op;

exports.getWeapon = (req, res) => {
    const name = req.params.name;
    Weapons.findAll({where: {
        name : name
    }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occured while retrieving the weapon."
            });
        });
};

exports.getAllWeapons = (req, res) => {
    Weapons.findAll({
        order: [
            ['name', 'ASC']
        ]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occured while retrieving weapons."
            });
        });
};
