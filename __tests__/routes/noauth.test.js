const request = require('supertest');

beforeAll(() => {
  process.env.AUTH = 'none';
});

afterAll(() => {
  delete process.env.AUTH;
});

test('no-auth portal is displayed', async () => {
  const app = require('../../dist/server').default;
  const res = await request(app).get('/guest/s/default/');
  expect(res.statusCode).toBe(200);
  expect(res.text).toContain('<title>Portal Page - No Auth</title>');
});
