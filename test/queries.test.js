const chai = require('chai');
const rewire = require('rewire')
const queries = require('./../helpers/queries')
const sinon = require('sinon')
const Promise = require('bluebird')

const { expect } = chai;

const mockClient = class mockClient {
  constructor() { }
  connect() { return {}; }
  end() { return {}; }
  query(sql) {
    if (sql.indexOf('INSERT') !== -1) {
      return {}
    } else
      return {
        rows: [{ avg: 10, sum: 50 }]
      };
  }
};

describe('Queries helper functions', () => {
  let client;
  describe('create event missing parameter', () => {
    it('should return appropriate error response', () => {
      return queries.createEvent(1, 2)
        .catch((err) => {
          expect(err.message).to.eql('Empty parameter supplied');
          expect(err).to.be.instanceOf(Error);
        })
    })
  })
  describe.only('create event missing parameter', () => {
    before(() => {
      // Queries = rewire('./../helpers/queries');
      // Queries.__set__('Client', mockClient);
      sinon.stub(client, 'query').returns(Promise.resolve('boo'))
    })
    it('should return appropriate error response', () => {
      return queries.createEvent(1, 1, 1, 1)
        .then((res) => { console.log(res) })
        .catch((err) => {
          console.log(err)
        })
    })
  })
  describe('retrieve events missing parameter', () => {
    it('should return appropriate error response', () => {
      return queries.retrieveEvents()
        .catch((err) => {
          expect(err.message).to.eql('Empty parameter supplied');
          expect(err).to.be.instanceOf(Error);
        })
    })
  })

})