/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),

  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),

  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),

  MAIL_DRIVER: Env.schema.enum(['mailgun', 'smtp'] as const),

  SMTP_HOST: Env.schema.string.optional({ format: 'host' }),
  SMTP_PORT: Env.schema.number.optional(),
  SMTP_SECURE: Env.schema.boolean.optional(),
  SMTP_USERNAME: Env.schema.string.optional(),
  SMTP_PASSWORD: Env.schema.string.optional(),

  MAILGUN_API_KEY: Env.schema.string.optional(),
  MAILGUN_BASE_URL: Env.schema.string.optional(),
  MAILGUN_DOMAIN: Env.schema.string.optional(),

  SENDER_MAIL: Env.schema.string.optional(),
  SENDER_NAME: Env.schema.string.optional(),
  REPLY_TO_MAIL: Env.schema.string.optional(),
  REPLY_TO_NAME: Env.schema.string.optional(),
})
