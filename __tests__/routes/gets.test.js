const request = require('supertest');
const app = require('../../dist/server').default;

test('root redirects to the configured guest portal', async () => {
  const res = await request(app).get('/');
  expect(res.statusCode).toBe(301);
  expect(res.headers.location).toBe('/guest/s/default/');
});

test('unknown route returns 404', async () => {
  const res = await request(app).get('/unknown-test-route');
  expect(res.statusCode).toBe(404);
});
