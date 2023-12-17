// userController.test.js
// https://bcrypt-generator.com/

const { loginUser, userCreate } = require('../controllers/userController');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const mockReq = (body) => ({ body });
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const cookieMock = jest.fn(); // Déclarez le cookieMock en dehors de res

const res = {
    status: jest.fn().mockReturnValue({ cookie: cookieMock }),
    json: jest.fn(),
    cookie: cookieMock,
};
res.json.mockReturnValue(res);



describe('userController', () => {
    describe('userCreate', () => {
        let findOneMock;
        let createMock;

        beforeEach(() => {
            findOneMock = jest.spyOn(User, 'findOne');
            createMock = jest.spyOn(User, 'create');
        });

        afterEach(() => {
            findOneMock.mockRestore();
            createMock.mockRestore();
        });

        test('devrait renvoyer 400 en cas de paramètres manquants', async () => {
            const req = mockReq({});
            const res = mockRes();

            await userCreate(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ 'error': 'missing parameters' });
        });

        test('devrait renvoyer 201 si l\'utilisateur est créé avec succès', async () => {
            const req = mockReq({
                lastname: 'Doe',
                firstname: 'John',
                username: 'johndoe',
                email: 'john.doe@example.com',
                password: 'password',
                isAdmin: false,
            });
            const res = mockRes();

            findOneMock.mockResolvedValue(null);
            createMock.mockResolvedValue({
                idUser: 1,
                username: 'johndoe',
                isAdmin: false,
            });

            await userCreate(req, res);

            expect(findOneMock).toHaveBeenCalled();
            expect(createMock).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                'idUser': 1,
                'username': 'johndoe',
                'isAdmin': false,
            });
        });


    });

    describe('loginUser', () => {
        let findOneMock;
        let compareMock;
        let signMock;

        beforeEach(() => {
            findOneMock = jest.spyOn(User, 'findOne');
            compareMock = jest.spyOn(bcrypt, 'compare');
            signMock = jest.spyOn(jwt, 'sign');
        });

        afterEach(() => {
            findOneMock.mockRestore();
            compareMock.mockRestore();
            signMock.mockRestore();
        });

        test('devrait renvoyer 400 si l\'utilisateur n\'existe pas', async () => {
            // Test setup
            const req = mockReq({
                email: 'john.doe@example.com',
                password: 'password',
            });
            const res = mockRes();

            // Mock user does not exist
            findOneMock.mockResolvedValue(null);

            // Test execution
            await loginUser(req, res);

            // Assertions
            expect(findOneMock).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ 'message': 'user doesnt exist (check your email)' });
        });

        test('devrait renvoyer 400 si le mot de passe est incorrect', async () => {
            // Test setup
            const req = mockReq({
                email: 'john.doe@example.com',
                password: 'incorrectPassword',
            });
            const res = mockRes();

            // Mock user exists
            const mockUser = {
                idUser: 1,
                email: 'john.doe@example.com',
                password: 'incorrectPassword', // Replace with a valid hash
            };
            findOneMock.mockResolvedValue(mockUser);

            // Mock password comparison fails
            compareMock.mockResolvedValue(false);

            // Test execution
            await loginUser(req, res);

            // Assertions
            expect(findOneMock).toHaveBeenCalled();
            expect(compareMock).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ 'message': 'incorrect password' });
        });
    });
});
