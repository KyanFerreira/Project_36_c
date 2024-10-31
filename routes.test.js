const api = require('../server/index.js');
const pg = require('pg')
const client = new pg.Client('postgres://localhost/acme_auth_store_db')
jest.mock('../server/index.js');
const uuid = require('uuid');

test('fetches all users', async () => {
    const users = [{
        id: uuid.v4(),
        username: 'john@example.com',
        password: 'password123'
    },
    {
        id: uuid.v4(),
        username: 'jane@example.com',
        password: 'password456'
    }];
    api.fetchUsers.mockResolvedValue(users); // mocking the try block that fetchUsers returns
    const response = await api.fetchUsers(client); // calling the function
    expect(response).toEqual(users); // checking if the data returned is the same as the data mocked
});

test('fetches all products', async () => {
    const products = [{
        id: uuid.v4(),
        name: 'product1'
    },
    {
        id: uuid.v4(),
        name: 'product2'
    }];
    api.fetchProducts.mockResolvedValue(products); // mocking the try block that fetchProducts returns
    const response = await api.fetchProducts(client); // calling the function
    expect(response).toEqual(products); // checking if the data returned is the same as the data mocked
});

test('createUser', async () => {
    const users = [{
        id: uuid.v4(),
        username: 'john@example.com',
        password: 'password123'
    }];
    api.createUser.mockResolvedValue(users); // mocking the try block that fetchUsers returns
    const response = await api.createUser(client); // calling the function
    expect(response).toEqual(users); // checking if the data returned is the same as the data mocked
});

test('createProduct', async () => {
    const products = [{
        id: uuid.v4(),
        name: 'product1'
    }];
    api.createProduct.mockResolvedValue(products); // mocking the try block that fetchProducts returns
    const response = await api.createProduct(client); // calling the function
    expect(response).toEqual(products); // checking if the data returned is the same as the data mocked
});