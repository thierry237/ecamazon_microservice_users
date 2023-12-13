const request = require('supertest');
const app = require('../server');
const db = require('../models/index');
const server = require('../server.js');

const User = db.User;

describe('API /users', () => {
    let testUserId;


    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    afterAll((done) => {
        server.close(done);
    });


    afterEach(async () => {
        if (testUserId) {
            const userToDelete = await User.findByPk(testUserId);
            console.log('Before user deletion:', userToDelete);

            const deletionResult = await User.destroy({ where: { idUser: testUserId } });
            console.log('Deletion result:', deletionResult);

            // Recherchez à nouveau l'utilisateur après la suppression
            const userAfterDeletion = await User.findByPk(testUserId);

            // Si l'utilisateur n'existe plus, userAfterDeletion sera null
            if (userAfterDeletion) {
                console.log('After user deletion', userAfterDeletion.dataValues);
            } else {
                console.log('User has been deleted');
            }
        }
    });

    it('POST /user - Créer un utilisateur et se connecter', async () => {

        console.log('Before creating user');
        const newUser = {
            lastname: 'Doe',
            firstname: 'John',
            username: 'john_doe',
            email: 'john@example.com',
            password: 'password',
            isAdmin: false,
        };

        const createResponse = await request(app).post('/user').send(newUser);

        // Vérification de la réponse de création
        expect(createResponse.statusCode).toBe(201);
        expect(createResponse.body).toHaveProperty('idUser');
        expect(createResponse.body).toHaveProperty('username', newUser.username);
        expect(createResponse.body).toHaveProperty('isAdmin', newUser.isAdmin);
        testUserId = createResponse.body.idUser;


        const loginCredentials = {
            email: newUser.email,
            password: newUser.password,

        };
        console.log('login', loginCredentials);


        const loginResponse = await request(app).post('/login').send(loginCredentials);
        console.log('response', loginResponse.statusCode);

        // Vérification de la réponse de connexion
        expect(loginResponse.statusCode).toBe(200);
        expect(loginResponse.body).toHaveProperty('idUser');
        expect(loginResponse.body).toHaveProperty('username', newUser.username);
        expect(loginResponse.body).toHaveProperty('isAdmin', newUser.isAdmin);


    });

    it('DELETE /user - supprimer utilisateur', async () => {
        try {


            // Créez un nouvel utilisateur
            const newUser = {
                lastname: 'Doe',
                firstname: 'John',
                username: 'john_doe',
                email: 'john@example.com',
                password: 'password',
                isAdmin: false,
            };

            const createResponse = await request(app).post('/user').send(newUser);

            // Vérification de la réponse de création
            expect(createResponse.statusCode).toBe(201);
            expect(createResponse.body).toHaveProperty('idUser');
            expect(createResponse.body).toHaveProperty('username', newUser.username);
            expect(createResponse.body).toHaveProperty('isAdmin', newUser.isAdmin);
            let delUserId = createResponse.body.idUser;


            // Effectuez une demande de suppression de l'utilisateur avec le token
            const deleteResponse = await request(app)
                .delete(`/user/${delUserId}`);

            // Vérification de la réponse de suppression
            expect(deleteResponse.statusCode).toBe(200);

            // Vérifiez que l'utilisateur a été supprimé
            const userAfterDeletion = await User.findByPk(delUserId);

            // Si l'utilisateur n'existe plus, userAfterDeletion sera null
            if (userAfterDeletion) {
                console.log('User has not been deleted');
            } else {
                console.log('User has been deleted');
            }
        } catch (error) {
            console.error('Create and delete user test failed with error:', error);
            throw error;
        }
    });

});
