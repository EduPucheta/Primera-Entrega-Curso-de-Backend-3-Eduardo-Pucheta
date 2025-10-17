import { expect } from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../app.js';
import UserModel from '../dao/models/user.model.js';

// Load environment variables
dotenv.config();

const request = supertest(app);

describe('Users API Tests', function() {
    this.timeout(10000); // Set timeout to 10 seconds for database operations

    let testUserId;
    let testUser = {
        first_name: 'Test',
        last_name: 'User',
        email: 'test.user@example.com',
        age: 25,
        password: 'testPassword123',
        role: 'user'
    };

    // Connect to database before running tests
    before(async function() {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URL);
        }
        // Clean up any existing test user
        await UserModel.deleteMany({ email: testUser.email });
    });

    // Clean up test data after all tests
    after(async function() {
        // Clean up test users
        await UserModel.deleteMany({ email: testUser.email });
        await UserModel.deleteMany({ email: 'updated.user@example.com' });
    });

    describe('GET /api/users', function() {
        it('should return all users with status 200', async function() {
            const response = await request.get('/api/users');
            
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
        });
    });

    describe('POST /api/users', function() {
        it('should create a new user with status 201', async function() {
            const response = await request
                .post('/api/users')
                .send(testUser);
            
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('message', 'Usuario creado con éxito');
            expect(response.body).to.have.property('user');
            expect(response.body.user).to.have.property('_id');
            expect(response.body.user).to.have.property('first_name', testUser.first_name);
            expect(response.body.user).to.have.property('last_name', testUser.last_name);
            expect(response.body.user).to.have.property('email', testUser.email);
            expect(response.body.user).to.have.property('age', testUser.age);
            expect(response.body.user).to.have.property('role', testUser.role);
            expect(response.body.user).to.have.property('pets').that.is.an('array');
            
            // Save the user ID for subsequent tests
            testUserId = response.body.user._id;
        });

        it('should return status 500 when trying to create a user with duplicate email', async function() {
            const response = await request
                .post('/api/users')
                .send(testUser);
            
            expect(response.status).to.equal(500);
            expect(response.body).to.have.property('error');
        });
    });

    describe('GET /api/users/:userId', function() {
        it('should return a user by valid ID with status 200', async function() {
            const response = await request.get(`/api/users/${testUserId}`);
            
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('_id', testUserId);
            expect(response.body).to.have.property('first_name', testUser.first_name);
            expect(response.body).to.have.property('email', testUser.email);
        });

        it('should return status 400 for invalid ObjectId format', async function() {
            const response = await request.get('/api/users/invalid-id-format');
            
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'El ID proporcionado no es un ObjectId válido.');
        });

        it('should return status 404 for non-existent user ID', async function() {
            const nonExistentId = new mongoose.Types.ObjectId();
            const response = await request.get(`/api/users/${nonExistentId}`);
            
            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('message', 'Usuario no encontrado.');
        });
    });

    describe('PUT /api/users/:userId', function() {
        it('should update a user by valid ID with status 200', async function() {
            const updatedData = {
                first_name: 'Updated',
                last_name: 'TestUser',
                email: 'updated.user@example.com',
                age: 30
            };

            const response = await request
                .put(`/api/users/${testUserId}`)
                .send(updatedData);
            
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message', 'Usuario actualizado con éxito');
            expect(response.body).to.have.property('user');
            expect(response.body.user).to.have.property('_id', testUserId);
            expect(response.body.user).to.have.property('first_name', updatedData.first_name);
            expect(response.body.user).to.have.property('last_name', updatedData.last_name);
            expect(response.body.user).to.have.property('email', updatedData.email);
            expect(response.body.user).to.have.property('age', updatedData.age);
        });

        it('should return status 400 for invalid ObjectId format', async function() {
            const response = await request
                .put('/api/users/invalid-id-format')
                .send({ first_name: 'Test' });
            
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'El ID proporcionado no es un ObjectId válido.');
        });

        it('should return status 404 for non-existent user ID', async function() {
            const nonExistentId = new mongoose.Types.ObjectId();
            const response = await request
                .put(`/api/users/${nonExistentId}`)
                .send({ first_name: 'Test' });
            
            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('message', 'Usuario no encontrado para actualizar.');
        });
    });

    describe('DELETE /api/users/:userId', function() {
        it('should return status 400 for invalid ObjectId format', async function() {
            const response = await request.delete('/api/users/invalid-id-format');
            
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message', 'El ID proporcionado no es un ObjectId válido.');
        });

        it('should return status 404 for non-existent user ID', async function() {
            const nonExistentId = new mongoose.Types.ObjectId();
            const response = await request.delete(`/api/users/${nonExistentId}`);
            
            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('message', 'Usuario no encontrado para eliminar.');
        });

        it('should delete a user by valid ID with status 200', async function() {
            const response = await request.delete(`/api/users/${testUserId}`);
            
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('message', 'Usuario eliminado con éxito');
            expect(response.body).to.have.property('user');
            expect(response.body.user).to.have.property('_id', testUserId);
            
            // Verify user is actually deleted
            const verifyResponse = await request.get(`/api/users/${testUserId}`);
            expect(verifyResponse.status).to.equal(404);
        });
    });
});

