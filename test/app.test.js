const chai = require('chai');
const chaiHttp = require('chai-http');
const Promise = require('bluebird')
const sinon = require('sinon')
let app = require('./../app')
let Queries = require('./../helpers/queries')

chai.should();
chai.use(chaiHttp);

const userId = 1;
const courseId = 1;

const headers = {
  userid: userId
}
const body = {
  total: 10,
  timeStudied: 20
}

describe('APIs', () => {
  describe('post to the create endpoint and receive error', () => {
    before(() => {
      sinon.stub(Queries.prototype, 'createEvent').rejects(new Error('Parameter missing'))
    })

    after(() => { sinon.restore() })

    it('should catch and return appropriate error response', async () => {
      await chai.request(app)
        .post(`/courses/${courseId}`)
        .set(headers)
        .send(body)
        .then((err) => {
          err.res.statusCode.should.eql(400)
          err.res.text.should.eql('Parameter missing')
        })
    })
  })
  describe('post to the create endpoint', () => {
    before(() => {
      sinon.stub(Queries.prototype, 'createEvent').resolves()
    })

    after(() => { sinon.restore() })

    it('should return successful response', async () => {
      await chai.request(app)
        .post(`/courses/${courseId}`)
        .set(headers)
        .send(body)
        .then((res) => { res.status.should.eql(200) })
    })
  })

  describe('get event summary data and receive error', () => {
    before(() => {
      sinon.stub(Queries.prototype, 'retrieveEvents').rejects(new Error('Parameter missing'))
    })

    after(() => { sinon.restore() })

    it('should catch and return appropriate error response', async () => {
      await chai.request(app)
        .get(`/courses/${courseId}`)
        .set(headers)
        .then((err) => {
          err.res.statusCode.should.eql(400)
          err.res.text.should.eql('Parameter missing')
        })
    })
  })
  describe('get event summary data', () => {
    before(() => {
      sinon.stub(Queries.prototype, 'retrieveEvents').resolves({ avg: 10.3, sum: 50 })
    })

    after(() => { sinon.restore() })

    it('should return successful response', async () => {
      await chai.request(app)
        .get(`/courses/${courseId}`)
        .set(headers)
        .then((res) => {
          res.statusCode.should.eql(200)
          res.body.should.eql({ averageScore: 10.3, totalTimeStudied: 50 })
        })
    })
  })
})