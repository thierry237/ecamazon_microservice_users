const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET;
const db = require('../models/index');
const Card = db.Card;
const Address = db.Address;
const User = db.User;

// autorisation liée à la connexion
exports.isAuthorized = async function (req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        // Vérifier si l'en-tête d'autorisation existe
        // et diviser le JWT en utilisant la fonction split
        let token = req.headers.authorization.split(" ")[1];
        //nous vérifions que le JSON Web Token est valide
        jwt.verify(token, jwtKey, (err, user) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.isAdmin = user.isAdmin;
            req.id_User = user.idUser;
            const id = req.params;
            next();

        });
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

// utiliser pour vérifier si l'utilisateur est autorisé à effectuer une action sur un post
exports.isAuthorizedAdminUserCard = async function (req, res, next) {
    const { isAdmin, id_User } = req;
    const { idCard } = req.params;

    // Rechercher le post correspondant à l'idPost spécifié
    const card = await Card.findOne({ where: { idCard: idCard } });
    if (isAdmin || id_User === card.idUser) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

//utiliser pour vérifier si l'utilisateur est autorisé à effectuer une action sur un commentaire
exports.isAuthorizedAdminUserAddress = async function (req, res, next) {
    const { isAdmin, id_User } = req;
    const { idAddress } = req.params;
    const address = await Address.findOne({ where: { idAddress: idAddress } });
    if (isAdmin || id_User === address.idUser) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}


//utiliser pour vérifier si l'utilisateur est autorisé à effectuer une action sur un utilisateur
exports.isAuthorizedAdminUser = async function (req, res, next) {
    const { isAdmin, id_User } = req;
    const { idUser } = req.params;
    const user = await User.findOne({ where: { idUser: idUser } });
    if (isAdmin || id_User === user.idUser) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

//utiliser pour tester si on est admin
exports.isAdmin = async function (req, res, next) {
    const { isAdmin } = req;
    console.log(isAdmin);
    if (isAdmin) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}



