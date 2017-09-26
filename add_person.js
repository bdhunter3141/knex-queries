const pg = require('pg');
const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
})

let addParam = process.argv.slice(2);

knex('famous_people').insert({
  first_name: addParam[0],
  last_name: addParam[1],
  birthdate: addParam[2]
})
.then(() => {
  knex.select('first_name', 'last_name', 'birthdate').from('famous_people').where({
    first_name: addParam[0]
  })
})
.then((res) => {
  console.log(`Insert 1 person by the name "${addParam[0]} ${addParam[1]}":`);
})
.catch(console.error)
.finally(knex.destroy())