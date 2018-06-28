const express = require('express')
const Queries = require('./helpers/queries.js')
var bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.post('/courses/:courseId', async (req, res) => {
  try {
    queries = new Queries(parseInt(req.headers.userid), parseInt(req.params.courseId))
    await queries.createEvent(req.body.total, req.body.timeStudied)
    res.status(200).send()
  } catch (err) {
    res.status(400).send(err.message)
  }
})

app.get('/courses/:courseId', async (req, res) => {
  try {
    queries = new Queries(parseInt(req.headers.userid), parseInt(req.params.courseId))
    const re = await queries.retrieveEvents()
    res.status(200).send({ averageScore: parseFloat(re.avg.toFixed(1)), totalTimeStudied: parseFloat(re.sum.toFixed(1)) })
  } catch (err) {
    res.status(400).send(err.message)
  }
})

module.exports = app.listen(4000, () => {
  console.log('Express app listening on port 4000')
})
