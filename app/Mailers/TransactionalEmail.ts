import Mail, { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import View from '@ioc:Adonis/Core/View'
import mjml from 'mjml'

import { MailBody } from 'types'

export default class TransactionalEmail extends BaseMailer {
  public mailer = Mail.use(Env.get('MAIL_DRIVER'))

  private readonly options: MailBody

  constructor(private readonly body: MailBody) {
    super()

    this.options = {
      mjml: true,
      ...this.body,
    }
  }

  public async getHtml() {
    const template = `emails/${this.options.template ?? 'transactional'}`

    const render = await View.render(template, this.options)

    return this.options.mjml ? mjml(render).html : render
  }

  public async prepare(message: MessageContract) {
    const html = await this.getHtml()

    const fromEmail = this.options.fromEmail ?? Env.get('SENDER_MAIL')
    const fromName = this.options.fromName ?? Env.get('SENDER_NAME')

    if (!fromEmail) {
      throw new Error('No sender e-mail provided')
    }

    const email = message
      .from(fromEmail, fromName)
      .to(this.options.toEmail, this.options.toName)
      .subject(this.options.subject)
      .encoding('utf-8')

    const replyToEmail = this.options.replyToEmail ?? Env.get('REPLY_TO_MAIL')
    const replyToName = this.options.replyToName ?? Env.get('REPLY_TO_NAME')

    if (replyToEmail) {
      email.replyTo(replyToEmail, replyToName)
    }

    return email.html(html)
  }
}
