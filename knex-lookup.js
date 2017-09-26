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

let searchParam = process.argv[2];

knex.select('first_name', 'last_name', 'birthdate').from('famous_people').where({
  first_name: searchParam
})
.then((res) => {
  console.log(`Found ${res.length} person(s) by the name "${searchParam}":`);
  for (let i = 0; i < res.length; i++) {
    console.log(`- ${res[i].first_name} ${res[i].last_name}, born "${res[i].birthdate}"`);
  }
})
.catch(console.error)
.finally(knex.destroy())