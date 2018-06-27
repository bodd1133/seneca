const express = require('express')
const queries = require('./helpers/queries.js')

let app = express();

app.listen(3000)

app.get('/', () => {
  'Welcome to the Seneca Web Client App'
})

app.post('/courses/:courseId', (req, res) => {
  try {
    await queries.createEvent(req.header.UserId, req.params.courseId, req.body.total, req.body.timeStudied)
    res.status(200).send()
  } catch (err) {
    res.status(400)
  }
})

app.get('/courses/{courseId}', (req, res) => {
  try {
    const res = await queries.retrieveEvents(req.header.UserId, req.params.courseId)
    res.status(200).send({ averageScore: res.avg.toFixed(1), timeStudied: res.sum.toFixed(1) })
  } catch (err) {
    res.status(400)
  }
})

