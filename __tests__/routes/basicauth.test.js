const request = require('supertest');

beforeAll(() => {
  process.env.AUTH = 'userInfo';
});

afterAll(() => {
  delete process.env.AUTH;
});

test('user information portal renders the client and access point MACs', async () => {
  const app = require('../../dist/server').default;
  const res = await request(app).get('/guest/s/default/').query({ id: 'client-mac', ap: 'ap-mac' });
  expect(res.statusCode).toBe(200);
  expect(res.text).toContain('value="client-mac"');
  expect(res.text).toContain('value="ap-mac"');
});
