import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load .env from root workspace
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  GEMINI_API_KEY: z.string().optional(),
}).refine((data) => {
  if (data.NODE_ENV === 'production' && !data.GEMINI_API_KEY) {
    return false;
  }
  return true;
}, {
  message: 'GEMINI_API_KEY is required in production environment',
  path: ['GEMINI_API_KEY'],
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('❌ Invalid environment configuration:');
  console.error(JSON.stringify(result.error.format(), null, 2));
  process.exit(1);
}

export const env = result.data;
export type Env = z.infer<typeof envSchema>;
