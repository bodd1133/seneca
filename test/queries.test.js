const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const rewire = require('rewire')
let Queries = require('./../helpers/queries')
const testData = require('./testData')

chai.should();
const { expect } = chai;
chai.use(chaiAsPromised);

describe('Queries', () => {
  let queries;
  before(async () => {
    await testData.seedTable()
  })
  describe('Database retrieve queries', () => {
    describe('query to seeded database for user id 1 and course id 1', () => {
      before(() => {
        queries = new Queries(testData.userId1, testData.courseId1)
      })

      it('retrieves correct info', () => {
        return queries.retrieveEvents()
          .then((res) => {
            Math.round(res.avg).should.equal(15)
            res.sum.should.equal('480')
          })
      })
    })
    describe('query to seeded database for user id 2 and course id 1', () => {
      before(() => {
        queries = new Queries(testData.userId2, testData.courseId1)
      })

      it('retrieves correct info', () => {
        return queries.retrieveEvents()
          .then((res) => {
            Math.round(res.avg).should.equal(30)
            res.sum.should.equal('100')
          })
      })
    })
    describe('query to seeded database for user id 1 and course id 2', () => {
      before(() => {
        queries = new Queries(testData.userId1, testData.courseId2)
      })

      it('retrieves correct info', () => {
        return queries.retrieveEvents()
          .then((res) => {
            Math.round(res.avg).should.equal(10)
            res.sum.should.equal('180')
          })
      })
    })
  })
  describe('Queries helper functions', () => {
    describe('create event missing parameter', () => {
      before(() => { queries = new Queries(testData.userId1, testData.courseId1) })
      it('should return appropriate error response', () => {
        return queries.createEvent(1)
          .catch((err) => {
            expect(err.message).to.eql('Empty parameter supplied');
            expect(err).to.be.instanceOf(Error);
          })
      })
    })
    describe('create event', () => {
      before(() => {
        Queries = rewire('./../helpers/queries');
        Queries.__set__('Client', testData.mockClient);
        queries = new Queries(testData.userId1, testData.courseId1)
      })
      it('should return success message', () => queries.createEvent(1, 1).should.eventually.eql('Data Inserted'))
    })
    describe('retrieve events missing parameter', () => {
      before(() => { queries = new Queries(testData.userId1, testData.courseId1) })
      it('should return appropriate error response', () => {
        return queries.retrieveEvents()
          .catch((err) => {
            expect(err.message).to.eql('Empty parameter supplied');
            expect(err).to.be.instanceOf(Error);
          })
      })
    })
    describe('retrieve events', () => {
      before(() => {
        Queries = rewire('./../helpers/queries');
        Queries.__set__('Client', testData.mockClient);
        queries = new Queries(testData.userId1, testData.courseId1)
      })
      it('should return summary data', () => queries.retrieveEvents().should.eventually.eql({ avg: 10, sum: 50 }))
    })
  })
})