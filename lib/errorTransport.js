/**
 * A transport that errors out, for mail service tests
 *
 * @type {{name: string, version: string, send: Function, error: any}}
 */
module.exports = {
  name: 'ErrorTransport',
  version: '1.0.0',

  error: new Error('The transport has an error, by design'),

  send: function (mail, callback) {
    const self = this
    setImmediate(() => {
      return callback(self.error)
    })
  }
}
