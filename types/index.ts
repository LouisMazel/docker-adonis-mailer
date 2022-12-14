export interface MailBody {
  fromEmail: string
  toEmail: string
  subject: string
  mjml?: boolean
  fromName?: string
  toName?: string
  replyToEmail?: string
  replyToName?: string
  template?: string
}
