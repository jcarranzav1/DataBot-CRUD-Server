const request = require('supertest');
const app = require('../server');
const config = require('../server/config');
const { connect, disconnect } = require('../server/database');
const User = require('../server/api/users/model');

let userID = '';

beforeAll(async () => {
  connect(config.test_uri);
});

afterAll(async () => {
  await User.deleteMany({});
  disconnect();
});

describe('Users CRUD', () => {
  const userData1 = {
    name: 'Juan Diego',
    lastName: 'Carranza Vega',
    email: 'jcarranzav98@gmail.com',
    phone: 987654321,
    username: 'Jcarranzav1',
  };
  const userData2 = {
    name: 'Juan Carlos',
    lastName: 'Velazques Roldán',
    email: 'juancavr@gmail.com',
    phone: 12345678,
    username: 'juancaVR',
  };
  const createUser = async (data) => {
    const response = await request(app).post('/api/user').send(data);
    return response;
  };
  test('Create User', async () => {
    const response = await createUser(userData1);
    const { body } = response;
    const { data } = body;

    expect(data.name).toBe('Juan Diego');
    expect(data.lastName).toBe('Carranza Vega');
    expect(data.phone).toBe(987654321);
    expect(data.email).toBe('jcarranzav98@gmail.com');
    expect(data.username).toBe('Jcarranzav1');
    expect(data.fullname).toBe('Juan Diego Carranza Vega');
  });

  test('Get All Users', async () => {
    const user2 = await createUser(userData2);
    userID = user2.body.data.id;
    const response = await request(app).get('/api/user');
    const { body } = response;
    const { data } = body;

    expect(data.length).toBe(2);
  });

  test('Update User', async () => {
    const response = await request(app).put(`/api/user/${userID}`).send({
      name: 'Jose Diego',
      phone: 456789852,
    });
    const { body } = response;
    const { data } = body;
    expect(data.fullname).toBe('Jose Diego Velazques Roldán');
    expect(data.phone).toBe(456789852);
  });

  test('Delete User', async () => {
    await request(app).delete(`/api/user/${userID}`);
    const response = await request(app).get('/api/user');
    const { body } = response;
    const { data } = body;
    expect(data.length).toBe(1);
    expect(data[0].fullname).not.toBe('Jose Diego Velazques Roldán');
    expect(data[0].fullname).toBe('Juan Diego Carranza Vega');
  });
});
