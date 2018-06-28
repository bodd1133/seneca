let { Client } = require('pg');
const connectionString = 'postgres://localhost:5432/postgres';
const Promise = require('bluebird')

module.exports = class Queries {
  constructor(userId, courseId) {
    this.userId = userId || undefined;
    this.courseId = courseId || undefined;
  }
  async createEvent(total, time) {
    if (this.userId === undefined || this.courseId === undefined || total === undefined || time === undefined) {
      return Promise.reject(new Error('Empty parameter supplied'))
    }
    try {
      const client = new Client({ connectionString });
      await client.connect();
      const res = await client.query(`INSERT INTO events VALUES (DEFAULT, ${this.userId}, ${this.courseId}, ${total}, ${time})`);
      await client.end();
      return res
    } catch (err) { throw err }
  }

  async retrieveEvents() {
    if (this.userId === undefined || this.courseId === undefined) {
      return Promise.reject(new Error('Empty parameter supplied'))
    }
    try {
      const client = new Client({ connectionString });
      await client.connect();
      const res = await client.query(`SELECT AVG(total), SUM(time) FROM EVENTS WHERE user_id=${this.userId} and course_id=${this.courseId}`)
      await client.end();
      return res.rows[0]
    } catch (err) { throw err }
  }
}

