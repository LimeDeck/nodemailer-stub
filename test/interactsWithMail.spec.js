const { interactsWithMail: iwm } = require('../lib/main')

const exampleMail = {
  to: 'john@domain.com',
  from: 'jimmy@domain.com',
  subject: 'testing',
  content: 'foo',
  contentType: 'text/plain'
}

describe('interactsWithMail', () => {
  afterEach(() => iwm.flushMails())

  it('retrieves the last message', () => {
    iwm.newMail(exampleMail)

    let lastMail = iwm.lastMail()

    expect(lastMail).toMatchObject({
      to: 'john@domain.com',
      from: 'jimmy@domain.com',
      subject: 'testing',
      content: 'foo',
      contentType: 'text/plain'
    })
  })

  it('retrieves the correct count of mails', () => {
    iwm.newMail(exampleMail)

    expect(iwm.sentMailsCount()).toBe(1)

    iwm.newMail(exampleMail)
    iwm.newMail(exampleMail)

    expect(iwm.sentMailsCount()).toBe(3)
  })

  it('can flush mails', () => {
    iwm.newMail(exampleMail)

    expect(iwm.sentMailsCount()).toBe(1)

    iwm.flushMails()
    expect(iwm.sentMailsCount()).toBe(0)
  })
})
