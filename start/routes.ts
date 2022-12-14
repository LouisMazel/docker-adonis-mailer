import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/emails/send', 'MailerController.sendTransactional')
Route.post('/emails/send/preview', 'MailerController.preview')
