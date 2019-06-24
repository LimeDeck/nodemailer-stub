const test = require('ava')
require('chai').should()
import { stubTransport } from '../lib/main'
import nodeMailer from 'nodemailer'

const exampleMail = {
  to: 'john@domain.com',
  from: 'jimmy@domain.com',
  subject: 'testing',
  content: 'foo',
  contentType: 'text/plain'
}

test('Nodemailer loads a correct transport', () => {
  let transport = nodeMailer.createTransport(stubTransport)

  transport.transporter.name.should.eq('LDStub')
  transport.transporter.send.should.be.instanceOf(Function)
})

test('it sends a message', async () => {
  let transport = nodeMailer.createTransport(stubTransport)
  let mail = await transport.sendMail({
    from: exampleMail.from,
    to: exampleMail.to,
    subject: exampleMail.subject,
    text: exampleMail.content
  })

  mail.messageId.should.not.be.null
  mail.envelope.should.not.be.null
  mail.response.should.be.instanceOf(Buffer)
  mail.from.should.eq(exampleMail.from)
  mail.to[0].should.eq(exampleMail.to)
  mail.subject.should.eq(exampleMail.subject)
  mail.content.should.eq(exampleMail.content)
  mail.contents.length.should.eq(1)
  mail.contents[0].should.eq(exampleMail.content)
  mail.contentType.should.eq(exampleMail.contentType)
})

test('it falls back to an empty string for subject', async () => {
  let transport = nodeMailer.createTransport(stubTransport)
  let mail = await transport.sendMail({
    from: exampleMail.from,
    to: exampleMail.to,
    text: exampleMail.content
  })

  mail.messageId.should.not.be.null
  mail.response.should.be.instanceOf(Buffer)
  mail.from.should.eq(exampleMail.from)
  mail.to[0].should.eq(exampleMail.to)
  mail.subject.should.eq('')
  mail.content.should.eq(exampleMail.content)
  mail.contents.length.should.eq(1)
  mail.contents[0].should.eq(exampleMail.content)
  mail.contentType.should.eq(exampleMail.contentType)
})
