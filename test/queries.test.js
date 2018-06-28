const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const rewire = require('rewire')
let Queries = require('./../helpers/queries')
const Promise = require('bluebird')

chai.should();
const { expect } = chai;
chai.use(chaiAsPromised);

const mockClient = class mockClient {
  constructor() { }
  connect() { return {}; }
  end() { return {}; }
  query(sql) {
    if (sql.indexOf('INSERT') !== -1) {
      return Promise.resolve('Data Inserted')
    } else
      return Promise.resolve({
        rows: [{ avg: 10, sum: 50 }]
      });
  }
};

const userId = 1;
const courseId = 1;

describe('Queries helper functions', () => {
  let queries;
  describe('create event missing parameter', () => {
    before(() => { queries = new Queries(userId, courseId) })
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
      Queries.__set__('Client', mockClient);
      queries = new Queries(userId, courseId)
    })
    it('should return success message', () => queries.createEvent(1, 1).should.eventually.eql('Data Inserted'))
  })
  describe('retrieve events missing parameter', () => {
    before(() => { queries = new Queries(userId, courseId) })
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
      Queries.__set__('Client', mockClient);
      queries = new Queries(userId, courseId)
    })
    it('should return summary data', () => queries.retrieveEvents(1, 1).should.eventually.eql({ avg: 10, sum: 50 }))
  })
})