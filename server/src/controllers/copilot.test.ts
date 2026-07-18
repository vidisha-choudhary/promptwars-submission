import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { GeminiService } from '../ai/gemini';
import { AppError } from '../errors/app-error';

// Mock the GeminiService
vi.mock('../ai/gemini', () => {
  return {
    GeminiService: {
      getClient: vi.fn(),
      generateText: vi.fn(),
      healthCheck: vi.fn(),
    },
  };
});

const mockTelemetry = {
  gates: [
    {
      id: 'G1',
      name: 'Gate A',
      queueLength: 120,
      waitTimeMinutes: 45,
      flowRatePerMin: 15,
      status: 'active',
    },
  ],
  incidents: [
    {
      id: 'I1',
      title: 'Turnstile Failure',
      severity: 'high',
      location: 'Gate A',
      status: 'reported',
      timestamp: '2026-07-10T13:30:00Z',
    },
  ],
  sentiment: {
    averageScore: 68,
    positiveCount: 40,
    negativeCount: 15,
    keyThemes: ['lines', 'waiting'],
  },
};

describe('Organizer AI Copilot Controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/v1/copilot/reason', () => {
    it('should return 200 and reasoning payload on valid input', async () => {
      const mockResult = {
        predictions: [
          {
            prediction: 'Gate A congestion will worsen to severe within 15 minutes.',
            reasoning: 'High current wait times combined with turnstile failure.',
            recommendation: 'Redirect incoming fans to Gate B.',
            confidence: 0.91,
          },
        ],
        redirectionPlan: {
          sourceGateId: 'G1',
          targetGateId: 'G2',
          reason: 'Clear bottleneck at Gate A',
          recommendation: 'Use digital signage to reroute ticket holders.',
        },
        emergencyAnnouncements: {
          language: 'english',
          text: 'Attention fans: Please redirect to Gate B to reduce wait times.',
        },
      };

      vi.mocked(GeminiService.generateText).mockResolvedValueOnce(JSON.stringify(mockResult));

      const response = await request(app)
        .post('/api/v1/copilot/reason')
        .send({
          telemetry: mockTelemetry,
          scenario: 'none',
          targetLanguage: 'english',
          userMessage: 'Assess current queue at Gate A',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.predictions[0]).toHaveProperty('prediction');
      expect(response.body.predictions[0]).toHaveProperty('confidence', 0.91);
      expect(response.body.redirectionPlan).toHaveProperty('sourceGateId', 'G1');
    });

    it('should return 400 Validation Error if telemetry gates are missing', async () => {
      const response = await request(app)
        .post('/api/v1/copilot/reason')
        .send({
          telemetry: {
            incidents: [],
            sentiment: { averageScore: 80, positiveCount: 10, negativeCount: 2, keyThemes: [] },
          },
          scenario: 'none',
          targetLanguage: 'english',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Invalid Copilot telemetry request data');
    });

    it('should return 400 Validation Error if user prompt is empty or just spaces', async () => {
      const response = await request(app)
        .post('/api/v1/copilot/reason')
        .send({
          telemetry: mockTelemetry,
          scenario: 'none',
          targetLanguage: 'english',
          userMessage: '   ',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Prompt message cannot be empty');
    });

    it('should map rate limit errors from Gemini to 429 status code', async () => {
      vi.mocked(GeminiService.generateText).mockRejectedValueOnce(
        new AppError('Gemini API rate limit exceeded. Please try again later.', 429)
      );

      const response = await request(app)
        .post('/api/v1/copilot/reason')
        .send({
          telemetry: mockTelemetry,
          scenario: 'heavy_rain',
          targetLanguage: 'spanish',
        });

      expect(response.status).toBe(429);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('rate limit exceeded');
    });
  });
});
