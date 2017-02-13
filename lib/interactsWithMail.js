class InteractsWithMail {
  /**
   * InteractsWithMail constructor.
   */
  constructor () {
    this.mails = []
  }

  /**
   * Retrieve last mail.
   * Accessible properties: from, to, subject, content, contentType
   * @returns {*}
   */
  lastMail () {
    return this.mails[0]
  }

  /**
   * Add a new mail to the list of all mails.
   *
   * @param {Object} mail
   * @returns {InteractsWithMail}
   */
  newMail (mail) {
    this.mails.unshift(mail)
    return this
  }

  /**
   * Flush all messages. Useful when testing multiple occurrences of mailer,
   * and should be used in afterAll or afterEach in your tests.
   *
   * @returns void
   */
  flushMails () {
    this.mails = []
  }

  /**
   * Get a count of how many emails were sent in the last mailer call.
   *
   * @returns {Number}
   */
  sentMailsCount () {
    return this.mails.length
  }
}

module.exports = new InteractsWithMail()
