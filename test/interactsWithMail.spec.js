const test = require('ava')
require('chai').should()
import { interactsWithMail as iwm } from '../lib/main'

const exampleMail = {
  to: 'john@domain.com',
  from: 'jimmy@domain.com',
  subject: 'testing',
  content: 'foo',
  contentType: 'text/plain'
}

test.afterEach(() => iwm.flushMails())

test('it retrieves the last message', () => {
  iwm.newMail(exampleMail)

  let lastMail = iwm.lastMail()

  lastMail.to.should.eq('john@domain.com')
  lastMail.from.should.eq('jimmy@domain.com')
  lastMail.subject.should.eq('testing')
  lastMail.content.should.eq('foo')
  lastMail.contentType.should.eq('text/plain')
})

test('it retrieves a correct count of mails', () => {
  iwm.newMail(exampleMail)

  iwm.sentMailsCount().should.eq(1)

  iwm.newMail(exampleMail)
  iwm.newMail(exampleMail)

  iwm.sentMailsCount().should.eq(3)
})

test('it can flush mails', () => {
  iwm.newMail(exampleMail)

  iwm.sentMailsCount().should.eq(1)

  iwm.flushMails()
  iwm.sentMailsCount().should.eq(0)
})
