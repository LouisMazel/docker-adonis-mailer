/**
 * Config source: https://git.io/JvgAf
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { mailConfig } from '@adonisjs/mail/build/config'

export default mailConfig({
  /*
  |--------------------------------------------------------------------------
  | Default mailer
  |--------------------------------------------------------------------------
  |
  | The following mailer will be used to send emails, when you don't specify
  | a mailer
  |
  */
  mailer: 'smtp',

  /*
  |--------------------------------------------------------------------------
  | Mailers
  |--------------------------------------------------------------------------
  |
  | You can define or more mailers to send emails from your application. A
  | single `driver` can be used to define multiple mailers with different
  | config.
  |
  */
  mailers: {
    mailgun: {
      driver: 'mailgun',
      baseUrl: Env.get('MAILGUN_BASE_URL') as string,
      key: Env.get('MAILGUN_API_KEY') as string,
      domain: Env.get('MAILGUN_DOMAIN') as string,
    },
    smtp: {
      driver: 'smtp',
      secure: Env.get('SMTP_SECURE') as boolean,
      host: Env.get('SMTP_HOST') as string,
      port: Env.get('SMTP_PORT') as number,
      auth: {
        user: Env.get('SMTP_USERNAME') as string,
        pass: Env.get('SMTP_PASSWORD') as string,
        type: 'login',
      },
    },
  },
})
