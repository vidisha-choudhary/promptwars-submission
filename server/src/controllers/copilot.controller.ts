import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { GeminiService } from '../ai/gemini';
import { ValidationError, AppError } from '../errors/app-error';
import { COPILOT_SYSTEM_INSTRUCTION, COPILOT_RESPONSE_SCHEMA } from '../ai/copilot.prompts';

// Validation schemas using Zod
const incidentSchema = z.object({
  id: z.string(),
  title: z.string(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  location: z.string(),
  status: z.enum(['reported', 'investigating', 'resolved']),
  timestamp: z.string(),
});

const gateTelemetrySchema = z.object({
  id: z.string(),
  name: z.string(),
  queueLength: z.number().nonnegative(),
  waitTimeMinutes: z.number().nonnegative(),
  flowRatePerMin: z.number(),
  status: z.enum(['active', 'inactive', 'restricted']),
});

const sentimentMetricsSchema = z.object({
  averageScore: z.number().min(0).max(100),
  positiveCount: z.number().nonnegative(),
  negativeCount: z.number().nonnegative(),
  keyThemes: z.array(z.string()),
});

const telemetrySchema = z.object({
  gates: z.array(gateTelemetrySchema),
  incidents: z.array(incidentSchema),
  sentiment: sentimentMetricsSchema,
});

const simulatedScenarioSchema = z.enum([
  'none',
  'gate_closure',
  'heavy_rain',
  'medical_emergency',
  'vip_arrival',
]);

const announcementLanguageSchema = z.enum(['english', 'hindi', 'spanish']);

const copilotRequestSchema = z.object({
  telemetry: telemetrySchema,
  scenario: simulatedScenarioSchema,
  targetLanguage: announcementLanguageSchema,
  userMessage: z.string().optional(),
});

export class CopilotController {
  public static async reason(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // 1. Validate request payload structure
      const parsed = copilotRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new ValidationError('Invalid Copilot telemetry request data', {
          issues: parsed.error.issues,
        });
      }

      const { telemetry, scenario, targetLanguage, userMessage } = parsed.data;

      // Ensure that if userMessage is provided, it is not just blank/whitespace
      if (userMessage !== undefined && userMessage.trim() === '') {
        throw new ValidationError('Prompt message cannot be empty');
      }

      // 2. Format system input context
      const gateDetails = telemetry.gates
        .map(
          (g) =>
            `- ${g.name} (${g.id}): Queue: ${g.queueLength} people, Wait: ${g.waitTimeMinutes}m, Flow: ${g.flowRatePerMin}/min, Status: ${g.status}`
        )
        .join('\n');

      const incidentDetails =
        telemetry.incidents.length === 0
          ? 'None'
          : telemetry.incidents
            .map(
              (i) =>
                `- [${i.severity.toUpperCase()}] ${i.title} at ${i.location} (Status: ${i.status})`
            )
            .join('\n');

      const sentimentDetails = `- Average Score: ${telemetry.sentiment.averageScore}/100\n- Positive: ${telemetry.sentiment.positiveCount}, Negative: ${telemetry.sentiment.negativeCount}\n- Key Themes: ${telemetry.sentiment.keyThemes.join(', ')}`;

      const promptContext = `--- STADIUM REAL-TIME TELEMETRY ---
GATES METRICS:
${gateDetails}

ACTIVE INCIDENTS LOG:
${incidentDetails}

FAN SENTIMENT SUMMARY:
${sentimentDetails}

SIMULATION TRIGGERED:
- Active Scenario: ${scenario.toUpperCase()}

COMMUNICATIONS SETTING:
- Target Language: ${targetLanguage.toUpperCase()}

ORGANIZER REQUEST:
"${userMessage || 'Perform a general crowd control and queue optimization analysis based on current state.'}"`;

      // 3. Call the Gemini service requesting a structured response matching the schema
      const rawResponseText = await GeminiService.generateText(promptContext, {
        model: 'gemini-3.1-flash-lite',
        responseMimeType: 'application/json',
        responseSchema: COPILOT_RESPONSE_SCHEMA,
        systemInstruction: COPILOT_SYSTEM_INSTRUCTION,
      });

      // 4. Parse the structured output
      let resultPayload;
      try {
        resultPayload = JSON.parse(rawResponseText);
      } catch {
        throw new AppError('Received malformed JSON from Gemini service.', 502);
      }

      // 5. Respond to client
      res.status(200).json({
        success: true,
        ...resultPayload,
      });
    } catch (err) {
      next(err);
    }
  }
}
