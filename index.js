require('node-env-file')(__dirname + '/.env');
const express = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')

const api_key = process.env.API_KEY;
const domain = 'jamesdonaldharrington.com'

const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})

express.use(cors())
express.use(bodyParser.json())


const data = {
  from: 'error@jamesdonaldharrington.com',
  to: 'hello@jamesdonaldharrington.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};


express.post('/mail', function (req, res) {
    data.text = req.body.name +'  \n\n' + req.body.message
    data.from = req.body.email

    mailgun.messages().send(data, function (error, body) {
        const obj = {success:!error, body:body}
        if(error) obj.error = error
        res.status(200).json(obj)
    });
})

express.listen(3000, function () {
  console.log('mailgun proxy listening on port 3000!')
})