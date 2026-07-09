import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load .env from root workspace
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const isTest = process.env.NODE_ENV === 'test';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  GEMINI_API_KEY: isTest
    ? z.string().default('mock_gemini_key_for_testing')
    : z
        .string({
          required_error: 'GEMINI_API_KEY is required in development or production',
        })
        .min(1, 'GEMINI_API_KEY cannot be empty'),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('❌ Invalid environment configuration:');
  console.error(JSON.stringify(result.error.format(), null, 2));
  process.exit(1);
}

export const env = result.data;
export type Env = z.infer<typeof envSchema>;
