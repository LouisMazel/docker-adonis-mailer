export interface MailBody {
  toEmail: string
  subject: string
  mjml?: boolean
  fromEmail?: string
  fromName?: string
  toName?: string
  replyToEmail?: string
  replyToName?: string
  template?: string
}
