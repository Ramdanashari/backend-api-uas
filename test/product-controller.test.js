import request from 'supertest';
import web from "../src/application/web.js";

let authToken;

// Assuming you have a login test as in the previous script
describe('product-controller', () => {
    beforeAll(async () => {
        // Log in and get the authentication token
        const loginResponse = await request(web)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'password',
            });
        authToken = loginResponse.body.data.token;
    });

    describe('Product Routes', () => {
        it('Should get all products', async () => {
            const response = await request(web)
                .get('/api/products')
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(200);
            // Add more assertions for the retrieved products if needed
        });

        it('Should get a product by ID', async () => {
            // Assuming there is a product with ID 1 in your database
            const productId = 1;
            const response = await request(web)
                .get(`/api/products/${productId}`)
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(200);
            // Add more assertions for the retrieved product if needed
        });

        it('Should create a new product', async () => {
            const response = await request(web)
                .post('/api/products')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'New Product',
                    description: 'A new product',
                    price: 99.99,
                    stock: 50,
                    userId: 4, // Change the user ID accordingly
                });
            expect(response.status).toBe(201);
            // Add more assertions for the created product if needed
        });

        it('Should update a product by ID', async () => {
            // Assuming there is a product with ID 1 in your database
            const productId = 1;
            const response = await request(web)
                .put(`/api/products/${productId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'Updated Product',
                    description: 'An updated product',
                    price: 129.99,
                    stock: 30,
                });
            expect(response.status).toBe(200);
            // Add more assertions for the updated product if needed
        });

        it('Should delete a product by ID', async () => {
            // Assuming there is a product with ID 1 in your database
            const productId = 1;
            const response = await request(web)
                .delete(`/api/products/${productId}`)
                .set('Authorization', `Bearer ${authToken}`);
            expect(response.status).toBe(200);
            // Add more assertions for the result of the delete operation if needed
        });
    });
});
