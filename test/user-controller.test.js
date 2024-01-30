import request from 'supertest';
import web from "../src/application/web.js";

let authToken; // To store the authentication token

describe('user-controller', () => {
    describe('Register user', () => {
        it('Should register a new user', async () => {
            const response = await request(web).post('/api/users/register').send({
                username: 'testuser',
                password: 'password',
                name: 'Test User',
            });

            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty('username', 'testuser');
        });
    });

    describe('Login user', () => {
        it('Login user and get authentication token', async () => {
            const response = await request(web).post('/api/users/login').send({
                username: 'testuser',
                password: 'password',
            });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            authToken = response.body.data.token;
        });
    });

    describe('Authenticated user routes', () => {
        it('Get current user information', async () => {
            const response = await request(web)
                .get('/api/users/current')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            // Add more assertions for the user information if needed
        });

        it('Update current user information', async () => {
            const response = await request(web)
                .patch('/api/users/current')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'Updated User',
                });

            expect(response.status).toBe(200);
            // Add more assertions for the updated user information if needed
        });

        it('Logout current user', async () => {
            const response = await request(web)
                .delete('/api/users/logout')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
        });
    });
});
