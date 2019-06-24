const EventEmitter = require('events')
const emitter = new EventEmitter()
const iwm = require('./interactsWithMail')

/**
 * Custom LimeDeck Stub transport for NodeMailer, used for testing ONLY.
 *
 * @type {{name: string, version: string, send: Function}}
 */
module.exports = {
  name: 'LDStub',
  version: '1.0.0',

  send: function (mail, callback) {
    let envelope = mail.data.envelope || mail.message.getEnvelope()
    let chunks = []
    let chunkLength = 0

    emitter.emit('envelope', envelope)

    let input = mail.message.createReadStream()

    input.on('data', chunk => {
      chunks.push(chunk)
      chunkLength += chunk.length

      emitter.emit('data', chunk.toString())
    })

    input.on('end', () => {
      setImmediate(() => {
        let messageId = (mail.message.getHeader('message-id')).replace(/[<>\s]/g, '')
        let response = Buffer.concat(chunks, chunkLength)
        let contents = [mail.message.content]
        for (let chunk of mail.message.childNodes) {
          contents.push(chunk.content)
        }
        let info = {
          messageId,
          response,
          envelope: envelope,
          from: envelope.from,
          to: envelope.to,
          content: mail.message.content,
          contents: contents,
          contentType: mail.message.contentType,
          subject: mail.message.getHeader('subject') || ''
        }

        iwm.newMail(info)
        emitter.emit('end', info)
        callback(null, info)
      })
    })
  }
}
