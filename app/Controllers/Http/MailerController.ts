import Logger from '@ioc:Adonis/Core/Logger'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TransactionalEmail from 'App/Mailers/TransactionalEmail'
import SendTransactionalEmailValidator from 'App/Validators/SendTransactionalEmailValidator'
import { MailBody } from 'types'

export default class MailerController {
  public async sendTransactional({ request, response }: HttpContextContract) {
    try {
      Logger.info('Request to send e-mail received')

      await request.validate(SendTransactionalEmailValidator)

      const body = request.body() as MailBody

      const response = await new TransactionalEmail(body).send()

      Logger.info('Email sent with success')

      return response
    } catch (error) {
      const errorMessage = error.message ?? error

      Logger.error(`[MailerController](sendTransactional) ${errorMessage}`)

      return response.status(500).json({
        code: 500,
        message: 'Email not sent!',
        error: error,
      })
    }
  }

  public preview({ request, response }: HttpContextContract) {
    try {
      Logger.info('Request to preview e-mail received')
      const body = request.body()
      return new TransactionalEmail(body.user).preview()
    } catch (error) {
      const errorMessage = error.message ?? error

      Logger.error(`[MailerController](sendTransactional) ${errorMessage}`)

      return response.status(500).json({
        code: 500,
        message: 'Cannot preview e-mail',
        error: error,
      })
    }
  }
}
