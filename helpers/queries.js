let { Client } = require('pg');
const connectionString = 'postgres://localhost:5432/postgres'
const Promise = require('bluebird')

const createEvent = async (userId, courseId, total, time) => {
  if (userId === undefined || courseId === undefined || total === undefined || time === undefined) {
    return Promise.reject(new Error('Empty parameter supplied'))
  }
  try {
    console.log(Client)
    const client = new Client({ connectionString });
    console.log(client)
    await client.connect();
    await client.query(`INSERT INTO events VALUES (DEFAULT, ${userId}, ${courseId}, ${total}, ${time})`);
    await client.end();
  } catch (err) { throw err }
}

const retrieveEvents = async (userId, courseId) => {
  if (userId === undefined || courseId === undefined) {
    return Promise.reject(new Error('Empty parameter supplied'))
  }
  try {
    const client = new Client({ connectionString });
    await client.connect();
    const res = await client.query(`SELECT AVG(total), SUM(time) FROM EVENTS WHERE user_id=${userId} and course_id=${courseId}`)
    await client.end();
    return res.rows[0]
  } catch (err) { throw err }
}

module.exports = { createEvent, retrieveEvents }

