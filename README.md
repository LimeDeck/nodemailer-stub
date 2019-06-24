# nodemailer-stub

[![Build Status](https://travis-ci.org/LimeDeck/nodemailer-stub.svg?branch=master)](https://travis-ci.org/LimeDeck/nodemailer-stub)
[![Coverage Status](https://coveralls.io/repos/github/LimeDeck/nodemailer-stub/badge.svg?branch=master)](https://coveralls.io/github/LimeDeck/nodemailer-stub?branch=master)
[![npm](https://img.shields.io/npm/dt/nodemailer-stub.svg)](https://www.npmjs.com/package/nodemailer-stub)
[![GitHub release](https://img.shields.io/github/release/limedeck/nodemailer-stub.svg)]()

Nodemailer-stub comes with a stub transport for [Nodemailer](https://github.com/nodemailer/nodemailer). The Stub stores the messages in memory but mimics real mail behaviour. It also contains a smart testing class called InteractsWithMail, which allows users to access, read, count and flush the messages in memory in their testing environment.

## Installation
```console
$ yarn add nodemailer-stub -D
#... or via npm
$ npm install nodemailer-stub --save-dev
```

## Usage
This is an example use case for the Stub.

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

For testing purposes, there is also a transport called `errorTransport`, where
the transport throws an error during execution, to help with testing the
robustness of your mail service logic.

We've also included a testing utility class, called `interactsWithMail`. You can use it in your tests like this:

```javascript
import { interactsWithMail as iwm } from 'nodemailer-stub'

const exampleMail = {
  to: 'john@domain.com',
  from: 'jimmy@domain.com',
  subject: 'testing',
  content: 'foo',
  contents: ['foo'],
  contentType: 'text/plain'
}

test('it retrieves the last message', () => {
  iwm.newMail(exampleMail)

  let lastMail = iwm.lastMail()

  lastMail.to.should.eq('john@domain.com')
  lastMail.from.should.eq('jimmy@domain.com')
  lastMail.subject.should.eq('testing')
  lastMail.content.should.eq(['foo'])
  lastMail.contents.should.eq(['foo'])
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
- contents
- contentType

### `newMail (Object)`
Adds a new mail to the list of all mails.

Available properties:

- from (required)
- to (required)
- subject
- text (required)

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
