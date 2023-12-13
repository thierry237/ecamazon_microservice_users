const { query } = require('express');
const db = require('../models/index');
const Card = db.Card;
const User = db.User;
const Address = db.Address;


// Display all addresses
exports.addressList = async function (req, res) {
    await Address.findAll({ include: [User] })
        .then(data => {
            console.log("All Addresses:", JSON.stringify(data, null, 2));
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

//add an address
exports.addressCreate = async function (req, res) {
    const { id_User } = req;
    console.log("idUser", id_User)
    let address = Address.build({
        //typeAddress : billing or delivery
        typeAddress: req.body.typeAddress, country: req.body.country, city: req.body.city,
        street: req.body.street, postalCode: req.body.postalCode, idUser: id_User
    })
    if (address.typeAddress == null || address.country == null || address.city == null || address.street == null || address.postalCode == null) {
        return res.status(400).json({ 'error': 'missing parameters' })
    }
    if (address.typeAddress.trim() == "" || address.country.trim() == "" || address.city.trim() == "" || address.street.trim() == "" || address.postalCode.trim() == "") {
        return res.status(400).json({ 'error': 'missing parameters' })
    }
    await address.save()
        .then(data => {
            console.log(address.toJSON());
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })

}

//update address
exports.addressUpdate = async function (req, res) {
    if (req.params.idAddress > 0) {
        let address = Address.build({
            typeAddress: req.body.typeAddress, country: req.body.country, city: req.body.city,
            street: req.body.street, postalCode: req.body.postalCode,
        })
        if (address.typeAddress == null || address.country == null || address.city == null || address.street == null || address.postalCode == null) {
            return res.status(400).json({ 'error': 'missing parameters' })
        }
        if (address.typeAddress.trim() == "" || address.country.trim() == "" || address.city.trim() == "" || address.street.trim() == "" || address.postalCode.toString().trim() == "") {
            return res.status(400).json({ 'error': 'missing parameters' })
        }

        await Address.update(
            {
                typeAddress: address.typeAddress, country: address.country, city: address.city,
                street: address.street, postalCode: address.postalCode,
            },
            { where: { idAddress: req.params.idAddress } }
        )
            .then(data => {
                res.status(200).json({ message: ' Address updated' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Address not found' })
}

//delete Address
exports.addressDelete = async function (req, res) {
    if (req.params.idAddress > 0) {
        await Address.destroy({ where: { idAddress: req.params.idAddress } })
            .then(data => {
                if (data == 0) res.status(400).json({ message: 'Address not found' });
                else res.status(200).json({ message: "Address deleted" });
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Address not found' })
}

//find an address
exports.addressFindOne = async function (req, res) {
    if (req.params.idAddress) {
        await Address.findOne({ where: { idAddress: req.params.idAddress }, include: [User] })
            .then(data => {
                if (data != null) res.json(data);
                else res.status(400).json({ message: 'Address not found' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Address not found' })
}

// const { Op } = require("sequelize");
exports.addressFindOp = async function (req, res) {
    let params = {};
    // Parcourir les paires clé-valeur du corps de la requête et les ajouter à l'objet params
    Object.entries(req.body).forEach(([key, value]) => {
        params[key] = value;
    });
    // Rechercher les adresses correspondants aux paramètres spécifiés, 
    await Address.findAll({ where: params, include: [User] })
        .then(data => {
            console.log("All Addresses:", JSON.stringify(data, null, 2));
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

//display all addresses of a user
exports.listAddressUser = async function (req, res) {
    if (req.params.idUser) {
        await Address.findAll({ where: { idUser: req.params.idUser } })
            .then(data => {
                if (data != 0) {
                    console.log("All Address:", JSON.stringify(data, null, 2));
                    res.json(data);
                }
                else res.status(400).json({ message: 'addresses not found' })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'User not found ' })
}

//delete all addresses of a user 
exports.deleteAllAddressUser = async function (req, res) {
    if (req.params.idUser) {
        const userFound = await User.findOne({ where: { idUser: req.params.idUser } });
        console.log(userFound);
        if (userFound) {
            await Address.destroy({ where: { idUser: req.params.idUser } })
                .then(data => {
                    if (data == 0) res.status(400).json({ message: 'Addresses not found' });
                    else res.json({ message: 'Address(es) deleted' });
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




