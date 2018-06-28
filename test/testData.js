let { Client } = require('pg');
const connectionString = 'postgres://localhost:5432/postgres'
const Promise = require('bluebird')

const userId1 = 1;
const courseId1 = 1;

const userId2 = 2;
const courseId2 = 5;

const headers = {
  userid: userId1
}
const body = {
  total: 10,
  timeStudied: 20
}

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

const valArray = [
  { userid: userId1, courseid: courseId1, total: 10, time: 180 },
  { userid: userId1, courseid: courseId1, total: 20, time: 300 },
  { userid: userId2, courseid: courseId1, total: 30, time: 100 },
  { userid: userId1, courseid: courseId2, total: 10, time: 180 },
]

const addItem = async (client) => {
  valArray.forEach(async (item) => {
    try {
      await client.query(`INSERT INTO events VALUES (DEFAULT, ${item.userid}, ${item.courseid}, ${item.total}, ${item.time})`)
    } catch (err) { throw err }
  })
  return
}

const seedTable = async () => {
  try {
    const client = new Client({ connectionString });
    await client.connect();
    await client.query('TRUNCATE events')
    await addItem(client)
    return
  } catch (err) { throw err }
}


module.exports = {
  userId1,
  courseId1,
  userId2,
  courseId2,
  seedTable,
  headers,
  body,
  mockClient
}


