import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app';

describe('Express Server Foundation', () => {
  describe('GET /health', () => {
    it('should return 200 OK and valid health stats payload', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('version', '1.0.0');
      expect(response.body).toHaveProperty('environment', 'test');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should populate correlation headers (x-request-id)', async () => {
      const response = await request(app).get('/health');
      expect(response.headers).toHaveProperty('x-request-id');
      expect(typeof response.headers['x-request-id']).toBe('string');
    });
  });

  describe('GET and HEAD /', () => {
    it('should return 200 OK and valid status json on GET', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('service', 'ArenaMind AI Backend');
      expect(response.body).toHaveProperty('status', 'running');
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should return 200 OK and no body on HEAD', async () => {
      const response = await request(app).head('/');

      expect(response.status).toBe(200);
      expect(response.text).toBeUndefined();
    });
  });

  describe('Security Configurations', () => {
    it('should enable standard Helmet headers', async () => {
      const response = await request(app).get('/health');
      expect(response.headers).toHaveProperty('x-frame-options', 'SAMEORIGIN');
    });
  });

  describe('Error Middleware Configurations', () => {
    it('should intercept unrecognized routes with NotFoundError', async () => {
      const response = await request(app).get('/non-existent-route');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toHaveProperty('message');
      expect(response.body.error.message).toContain('Cannot GET /non-existent-route');
    });
  });
});
