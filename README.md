# nodemailer-stub

[![Build Status](https://travis-ci.org/LimeDeck/nodemailer-stub.svg?branch=master)](https://travis-ci.org/LimeDeck/nodemailer-stub)
[![Coverage Status](https://coveralls.io/repos/github/LimeDeck/nodemailer-stub/badge.svg?branch=master)](https://coveralls.io/github/LimeDeck/nodemailer-stub?branch=master)
[![npm](https://img.shields.io/npm/v/nodemailer-stub.svg)](https://www.npmjs.com/package/nodemailer-stub)

Stub transport for Nodemailer. Testing your mails in Node.js is now easy.

## Installation
```console
$ yarn add nodemailer-stub -D
#... or via npm
$ npm install nodemailer-stub --save-dev
```

## Usage
This is an example use case for the stub.

```javascript
import { stubTransport } from 'nodemailer-stub'
import nodeMailer from 'nodemailer'

let transport = nodeMailer.createTransport(stubTransport)

let mail = await transport.sendMail({
  from: 'john.doe@domain.com',
  to: 'jim@otherdomain.com',
  subject: 'Nodemailer stub works!',
  text: 'Wohoo'
})
```

We've also included a neat testing utility class, called `interactsWithMail`. You can use it in your tests like this:

```javascript
import { interactsWithMail as iwm } from 'nodemailer-stub'

const exampleMail = {
  to: 'john@domain.com',
  from: 'jimmy@domain.com',
  subject: 'testing',
  content: 'foo',
  contentType: 'text/plain'
}

test('it retrieves the last message', () => {
  iwm.newMail(exampleMail)

  let lastMail = iwm.lastMail()

  lastMail.to.should.eq('john@domain.com')
  lastMail.from.should.eq('jimmy@domain.com')
  lastMail.subject.should.eq('testing')
  lastMail.content.should.eq('foo')
  lastMail.contentType.should.eq('text/plain')
})
```

**Available methods for `interactsWithMail`**:
### `lastMail()`
Retrieves last mail.
Accessible properties: 

- from
- to
- subject
- content
- contentType

### `newMail (Object)`
Adds a new mail to the list of all mails.

Available properties:

- from (required)
- to (required)
- subject
- content (required)
- contentType

### `flushMails ()`
Flushes all messages. Useful when testing multiple occurrences of mailer, and should be used in afterAll or afterEach hooks in your tests.

### `sentMailsCount ()`
Retrieves a count of how many emails were sent in the last mailer call.

## Testing
All tests can be executed with the following command:

```console
$ yarn test
```

## License
See LICENSE file.
