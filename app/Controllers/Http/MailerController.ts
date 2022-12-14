import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TransactionalEmail from 'App/Mailers/TransactionalEmail'
import SendTransactionalEmailValidator from 'App/Validators/SendTransactionalEmailValidator'
import { MailBody } from 'types'

export default class MailerController {
  public async sendTransactional({ request, response }: HttpContextContract) {
    try {
      await request.validate(SendTransactionalEmailValidator)

      const body = request.body() as MailBody

      return new TransactionalEmail(body).send()
    } catch (error) {
      return response.status(500).json({
        code: 500,
        message: 'Email not sent!',
        error,
      })
    }
  }

  public preview({ request }: HttpContextContract) {
    const body = request.body()
    return new TransactionalEmail(body.user).preview()
  }
}
