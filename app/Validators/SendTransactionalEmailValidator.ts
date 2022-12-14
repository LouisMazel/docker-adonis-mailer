import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SendMissionEmailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fromEmail: schema.string({ trim: true }, [rules.email()]),
    fromName: schema.string.optional({ trim: true }),
    toEmail: schema.string({ trim: true }, [rules.email()]),
    toName: schema.string.optional({ trim: true }),
    subject: schema.string({ trim: true }, [rules.minLength(1)]),
    replyToEmail: schema.string.optional({ trim: true }, [rules.email()]),
    replyToName: schema.string.optional({ trim: true }),
    mjml: schema.boolean.optional(),
    template: schema.string.optional({ trim: true }),
  })

  public messages: CustomMessages = {
    '*': (field, rule, _arrayExpressionPointer, _options) => {
      return `${rule} validation error on ${field}`
    },
  }
}
