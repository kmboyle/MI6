const request = require('request')
const express = require('express')
const path = require('path')
const app = express()

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get('/netflix/', function (req, res) {
  request("https://netflixroulette.net/api/api.php?title=Attack%20on%20titan",
          (err, response, body) => {
            res.json(JSON.parse(body));
          })

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
