const test = require('ava')
require('chai').should()
import { errorTransport } from '../lib/main'
import nodeMailer from 'nodemailer'

const exampleMail = {
  to: 'john@domain.com',
  from: 'jimmy@domain.com',
  subject: 'testing',
  content: 'foo',
  contentType: 'text/plain'
}

test('Nodemailer loads a correct transport', () => {
  let transport = nodeMailer.createTransport(errorTransport)

  transport.transporter.name.should.eq('ErrorTransport')
  transport.transporter.send.should.be.instanceOf(Function)
})

test('it fails to send a message', async () => {
  let transport = nodeMailer.createTransport(errorTransport)
  let failed = null
  try {
    await transport.sendMail({
      from: exampleMail.from,
      to: exampleMail.to,
      subject: exampleMail.subject,
      text: exampleMail.content
    })
  } catch (transportError) {
    failed = transportError
  }

  failed.should.not.be.null
})
