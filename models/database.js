const pg = require('pg');
const connectionString = 'postgres://localhost:5432/postgres';

const client = new pg.Client(connectionString);
client.connect();
client.query(
  `CREATE TABLE events(id SERIAL PRIMARY KEY, user_id INTEGER not null, course_id INTEGER not null, total INTEGER not null, time INTEGER not null)`, (err) => {
    if (err) { throw err }
    client.end()
  })
