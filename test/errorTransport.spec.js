const { errorTransport } = require('../lib/main')
const nodeMailer = require('nodemailer')

const exampleMail = {
  to: 'john@domain.com',
  from: 'jimmy@domain.com',
  subject: 'testing',
  content: 'foo',
  contentType: 'text/plain'
}

describe('Error transport', () => {
  it('should load a correct transport', () => {
    const transport = nodeMailer.createTransport(errorTransport)

    expect(transport.transporter.name).toBe('ErrorTransport')
    expect(transport.transporter.send).toBeInstanceOf(Function)
  })

  it('should fail to send a message', async () => {
    const transport = nodeMailer.createTransport(errorTransport)
    expect.assertions(2)

    try {
      await transport.sendMail({
        from: exampleMail.from,
        to: exampleMail.to,
        subject: exampleMail.subject,
        text: exampleMail.content
      })
    } catch (err) {
      expect(err.message).toBe('The transport has an error, by design')
      expect(err).toBeInstanceOf(Error)
    }
  })
})
