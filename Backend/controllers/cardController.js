const { query } = require('express');
const db = require('../models/index');
const Card = db.Card;
const User = db.User;
const Address = db.Address;


//Display all Cards
exports.cardList = async function (req, res) {
    await Card.findAll({ include: [User] })
        .then(data => {
            console.log("All Cards:", JSON.stringify(data, null, 2));
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

//add card
exports.cardCreate = async function (req, res) {
    const { id_User } = req;
    const { methodPayment, cardNumber, nameCard, expiredDate, cvv } = req.body;
    console.log('methodPayment:', methodPayment);
    console.log('cardNumber:', cardNumber);
    console.log('nameCard:', nameCard);
    console.log('expiredDate:', expiredDate);
    console.log('cvv:', cvv);
    let card = Card.build({
        methodPayment, cardNumber, nameCard, expiredDate, cvv, idUser: id_User
    })
    console.log('methodPayment:', card.methodPayment);
    console.log('cardNumber:', card.cardNumber);
    console.log('nameCard:', card.nameCard);
    console.log('expiredDate:', card.expiredDate);
    console.log('cvv:', card.cvv);

    if (card.methodPayment == null || card.cardNumber == null || card.nameCard == null || card.expiredDate == null || card.cvv == null) {
        return res.status(400).json({ 'error': 'missing parameters1' })
    }
    if (card.methodPayment.trim() == "" || card.cardNumber.trim() == "" || card.nameCard.trim() == "" || card.expiredDate.toString().trim() == "" || card.cvv.toString().trim() == "") {
        return res.status(400).json({ 'error': 'missing parameters' })
    }
    await card.save()
        .then(data => {
            console.log(card.toJSON());
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })

}

//update card
exports.cardUpdate = async function (req, res) {
    if (req.params.idCard > 0) {
        let card = Card.build({
            methodPayment: req.body.methodPayment, cardNumber: req.body.cardNumber, nameCard: req.body.nameCard,
            expiredDate: req.body.expiredDate, cvv: req.body.cvv,
        })
        if (card.methodPayment == null || card.cardNumber == null || card.nameCard == null || card.expiredDate == null || card.cvv == null) {
            return res.status(400).json({ 'error': 'missing parameters' })
        }
        if (card.methodPayment.trim() == "" || card.cardNumber.trim() == "" || card.nameCard.trim() == "" || card.expiredDate.toString().trim() == "" || card.cvv.toString().trim() == "") {
            return res.status(400).json({ 'error': 'missing parameters' })
        }

        await Card.update(
            {
                methodPayment: card.methodPayment, cardNumber: card.cardNumber, nameCard: card.nameCard,
                expiredDate: card.expiredDate, cvv: card.cvv,
            },
            { where: { idCard: req.params.idCard } }
        )
            .then(data => {
                res.status(200).json({ message: 'Card updated' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Card not found' })
}

//delete card
exports.cardDelete = async function (req, res) {
    if (req.params.idCard > 0) {
        await Card.destroy({ where: { idCard: req.params.idCard } })
            .then(data => {
                if (data == 0) res.status(400).json({ message: 'Card not found' });
                else res.status(200).json({ message: "Card deleted" });
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Card not found' })
}

//find Card
exports.cardFindOne = async function (req, res) {
    if (req.params.idCard) {
        await Card.findOne({ where: { idCard: req.params.idCard }, include: [User] })
            .then(data => {
                if (data != null) res.json(data);
                else res.status(400).json({ message: 'Card not found' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Card not found' })
}

// const { Op } = require("sequelize");
exports.cardFindOp = async function (req, res) {
    let params = {};
    // Parcourir les paires clé-valeur du corps de la requête et les ajouter à l'objet params
    Object.entries(req.body).forEach(([key, value]) => {
        params[key] = value;
    });
    // Rechercher les cards correspondants aux paramètres spécifiés, 
    await Card.findAll({ where: params, include: [User] })
        .then(data => {
            console.log("All Cards:", JSON.stringify(data, null, 2));
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


//supprimer tous les cartes  liées à un utilisateur
exports.deleteAllCardUser = async function (req, res) {
    if (req.params.idUser) {
        const userFound = await User.findOne({ where: { idUser: req.params.idUser } });
        console.log(userFound);
        if (userFound) {
            await Card.destroy({ where: { idUser: req.params.idUser } })
                .then(data => {
                    if (data == 0) res.status(400).json({ message: 'Cards not found' });
                    else res.json({ message: 'Cards deleted' });
                })
                .catch(err => {
                    res.status(500).json({ message: err.message })
                })
        } else {
            return res.status(400).json({ message: 'User not found' })
        }
    }
    else res.status(400).json({ message: 'User not found' })
}

exports.listCardUser = async function (req, res) {
    if (req.params.idUser) {
        await Card.findAll({ where: { idUser: req.params.idUser } })
            .then(data => {
                if (data != 0) {
                    console.log("All Cards:", JSON.stringify(data, null, 2));
                    res.json(data);
                }
                else res.status(400).json({ message: 'Card not found' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'User not found' })
}


