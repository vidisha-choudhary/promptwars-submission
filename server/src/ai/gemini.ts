import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env';
import { GenerateTextOptions } from './types';
import { AppError } from '../errors/app-error';

export class GeminiService {
  private static instance: GoogleGenAI | null = null;

  public static getClient(): GoogleGenAI {
    if (!this.instance) {
      const apiKey = env.GEMINI_API_KEY;

      // In production, we must fail if missing. Zod validation does that.
      // In other envs, we handle lack of api key gracefully on execution.
      if (!apiKey) {
        throw new AppError('Gemini API key is not configured.', 500);
      }

      try {
        this.instance = new GoogleGenAI({ apiKey });
      } catch (err: any) {
        throw new AppError(`Failed to initialize Gemini client: ${err.message}`, 500);
      }
    }
    return this.instance;
  }

  /**
   * Generates text content based on the provided prompt and options.
   */
  public static async generateText(
    prompt: string,
    options?: GenerateTextOptions & { systemInstruction?: string }
  ): Promise<string> {
    try {
      const client = this.getClient();
      const model = options?.model || 'gemini-3.1-flash-lite';

      const response = await client.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: options?.temperature ?? 0.2,
          maxOutputTokens: options?.maxOutputTokens,
          responseMimeType: options?.responseMimeType,
          responseSchema: options?.responseSchema,
          systemInstruction: options?.systemInstruction,
        },
      });

      if (!response.text) {
        throw new AppError('Empty response received from Gemini API.', 502);
      }

      return response.text;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }
      throw this.mapGeminiError(error);
    }
  }

  /**
   * Performs an offline verification checks:
   * - Checks that the GEMINI_API_KEY is configured.
   * - Verifies client initialization runs successfully.
   */
  public static async healthCheck(): Promise<boolean> {
    try {
      const apiKey = env.GEMINI_API_KEY;
      if (!apiKey) {
        return false;
      }
      const client = this.getClient();
      return !!client;
    } catch {
      return false;
    }
  }

  /**
   * Maps Google Gen AI SDK errors to customized instances of AppError.
   */
  private static mapGeminiError(error: any): Error {
    const message = error.message || '';
    const status = error.status || error.statusCode || 0;

    // Detect Invalid API Key
    if (
      message.includes('API key') ||
      message.includes('API_KEY_INVALID') ||
      message.includes('API key not valid') ||
      status === 400 ||
      status === 401
    ) {
      return new AppError('Invalid Gemini API Key configuration.', 401);
    }

    // Detect Rate Limits
    if (
      message.includes('429') ||
      message.includes('RESOURCE_EXHAUSTED') ||
      message.includes('Quota exceeded') ||
      status === 429
    ) {
      return new AppError('Gemini API rate limit exceeded. Please try again later.', 429);
    }

    // Default error mapping
    return new AppError(`Gemini service error: ${message}`, 502);
  }
}
