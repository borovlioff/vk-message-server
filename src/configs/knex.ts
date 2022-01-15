import { Knex, knex } from 'knex'

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: 'data.sqlite3',
  },
};

export default  knex(config);

