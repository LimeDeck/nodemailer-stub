const { stubTransport } = require('../lib/main')
const nodeMailer = require('nodemailer')

const exampleMail = {
  to: 'john@domain.com',
  from: 'jimmy@domain.com',
  subject: 'testing',
  content: 'foo',
  contentType: 'text/plain'
}

describe('stubTransport', () => {
  it('Nodemailer loads a correct transport', () => {
    const transport = nodeMailer.createTransport(stubTransport)

    expect(transport.transporter.name).toBe('LDStub')
    expect(transport.transporter.send).toBeInstanceOf(Function)
  })

  it('should send a message', async () => {
    const transport = nodeMailer.createTransport(stubTransport)
    const mail = await transport.sendMail({
      from: exampleMail.from,
      to: exampleMail.to,
      subject: exampleMail.subject,
      text: exampleMail.content
    })

    expect(mail).toMatchObject({
      messageId: expect.any(String),
      envelope: {
        from: 'jimmy@domain.com',
        to: ['john@domain.com']
      },
      response: expect.any(Buffer),
      from: 'jimmy@domain.com',
      to: ['john@domain.com'],
      content: 'foo',
      contents: ['foo'],
      contentType: 'text/plain',
      subject: 'testing'
    })
  })

  it('should fall back to an empty string for subject', async () => {
    const transport = nodeMailer.createTransport(stubTransport)
    const mail = await transport.sendMail({
      from: exampleMail.from,
      to: exampleMail.to,
      text: exampleMail.content
    })

    expect(mail).toMatchObject({
      messageId: expect.any(String),
      envelope: {
        from: 'jimmy@domain.com',
        to: ['john@domain.com']
      },
      response: expect.any(Buffer),
      from: 'jimmy@domain.com',
      to: ['john@domain.com'],
      content: 'foo',
      contents: ['foo'],
      contentType: 'text/plain',
      subject: ''
    })
  })
})
