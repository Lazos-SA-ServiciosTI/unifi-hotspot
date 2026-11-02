const request = require('supertest');

jest.mock('../../dist/utils/axios', () => ({ createAxiosInstance: jest.fn() }));
jest.mock('../../dist/utils/logAuthDrivers', () => ({ webhook: jest.fn(), googleSheets: jest.fn() }));

process.env.AUTH = 'userInfo';
process.env.LOG_AUTH_DRIVER = 'webhook';
const { createAxiosInstance } = require('../../dist/utils/axios');
const { webhook } = require('../../dist/utils/logAuthDrivers');
const app = require('../../dist/server').default;

beforeEach(() => {
  jest.clearAllMocks();
});

test('rejects a submitted MAC when the session has none', async () => {
  const res = await request(app).post('/authorise').type('form').send({ mac: 'forged' });
  expect(res.statusCode).toBe(400);
  expect(createAxiosInstance).not.toHaveBeenCalled();
  expect(webhook).not.toHaveBeenCalled();
});

test('uses session MACs for logging and UniFi authorization for 60 minutes', async () => {
  const post = jest.fn().mockResolvedValue({ data: { meta: { rc: 'ok' } } });
  createAxiosInstance.mockReturnValue({ post });
  const agent = request.agent(app);
  await agent.get('/guest/s/default/').query({ id: 'session-client', ap: 'session-ap' });
  const res = await agent.post('/authorise').type('form').send({ name: 'Test', email: 'test@example.com', mac: 'forged', ap_mac: 'forged-ap' });
  expect(res.statusCode).toBe(302);
  expect(webhook).toHaveBeenCalledWith(expect.objectContaining({ mac: 'session-client', ap_mac: 'session-ap' }));
  const authCall = post.mock.calls.find(([url]) => url.includes('/cmd/stamgr'));
  expect(JSON.parse(authCall[1])).toEqual({ cmd: 'authorize-guest', mac: 'session-client', ap_mac: 'session-ap', minutes: 60 });
});
