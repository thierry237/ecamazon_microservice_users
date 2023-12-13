let express = require('express');
let router = express.Router();

// Import  controller
const userController = require('./controllers/userController');
const cardController = require('./controllers/cardController');
const addressController = require('./controllers/addressController');
const auth = require('./authorization/authorization')

//route par défaut
router.get('/', (req, res) => res.redirect('/login'));

//login
router.post('/login', userController.loginUser);

//api utilisateurs
router.get('/users', auth.isAuthorized, userController.userList);
router.post('/user', userController.userCreate);
router.put('/user/:idUser', auth.isAuthorized, auth.isAuthorizedAdminUser, userController.userUpdate);
router.delete('/user/:idUser', auth.isAuthorized, auth.isAuthorizedAdminUser, userController.userDelete);
router.get('/user/:idUser', auth.isAuthorized, userController.userFindOne);
router.post('/user/filter', auth.isAuthorized, auth.isAdmin, userController.userFindOp);
router.post('/user/search', auth.isAuthorized, userController.userFindOp);
router.put('/user/admin/:idUser', auth.isAuthorized, auth.isAdmin, userController.userUpdateAdmin)

//api address
router.get('/addresses', auth.isAuthorized, addressController.addressList);
router.post('/address', auth.isAuthorized, addressController.addressCreate);
router.put('/address/:idAddress', auth.isAuthorized, addressController.addressUpdate);
router.delete('/address/:idAddress', auth.isAuthorized, addressController.addressDelete);
router.get('/address/:idAddress', auth.isAuthorized, addressController.addressFindOne);
router.post('/address/search', auth.isAuthorized, addressController.addressFindOp);
router.get('/user/:idUser/addresses', auth.isAuthorized, addressController.listAddressUser);

//api Card
router.get('/cards', auth.isAuthorized, cardController.cardList);
router.post('/card', auth.isAuthorized, cardController.cardCreate);
router.put('/card/:idCard', auth.isAuthorized, auth.isAuthorizedAdminUserCard, cardController.cardUpdate);
router.delete('/card/:idCard', auth.isAuthorized, auth.isAuthorizedAdminUserCard, cardController.cardDelete);
router.get('/card/:idCard', auth.isAuthorized, cardController.cardFindOne);
router.get('/user/:idUser/cards', auth.isAuthorized, cardController.listCardUser);
router.delete('/user/:idUser/cards', auth.isAuthorized, auth.isAdmin, cardController.deleteAllCardUser);
router.post('/card/search', auth.isAuthorized, cardController.cardFindOp);


module.exports = router;