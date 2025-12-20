import { z } from 'zod';

const EnvSchema = z.object({
  DATABASE_URL: z.url(),
  PORT: z.string().transform(Number).default(8080),
  RESEND_API_KEY: z.string(),
  EMAIL_FROM: z.email(),
  BRIDGE_ACCESS_TOKEN: z.string(),
  GOOGLE_API_KEY: z.string(),
  JWT_SECRET: z.string(),
  BRIDGE_ODATA_URL: z.url(),
  BRIDGE_URL: z.url(),
  FRONTEND_URL: z.url(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export const env: z.infer<typeof EnvSchema> = EnvSchema.parse(process.env);
