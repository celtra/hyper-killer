var aws4 = require('hyper-aws4')
var fetch = require('node-fetch')

class Hyper {
  constructor(accessKey, secretKey, host = 'us-west-1.hyper.sh') {
    this.accessKey = accessKey
    this.secretKey = secretKey
    this.host = host
  }

  request(method, path, body = '') {
    const signOption = {
      url: `https://${this.host}/${path}`,
      method: method,
      body: body,
      credential: {
        accessKey: this.accessKey,
        secretKey: this.secretKey
      }
    }

    const headers = aws4.sign(signOption)

    return fetch(signOption.url, { method: method, headers: headers }).then(response => {
      if (Math.floor(response.status/100) == 2) {
        return response.json()
      } else {
        return response.text()
          .catch(reason => {
            throw new Error(`${method} ${path} returned code ${response.status} (no body)`)
          })
          .then(body => {
            throw new Error(`${method} ${path} returned code ${response.status}: ${body}`)
          })
      }
    })
  }
}

module.exports = Hyper
