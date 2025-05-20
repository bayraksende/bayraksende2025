const { Kysely, SqliteDialect } = require('kysely');
const Database = require('better-sqlite3');

const db = new Database('database.sqlite'); // DB dosyasını sabit bir isimle aç

const kysely = new Kysely({
  dialect: new SqliteDialect({
    database: db
  }),
  log: ["error", 'query']
});

// Tablo oluşturma fonksiyonu
kysely.schema
  .createTable('users')
  .ifNotExists()
    .addColumn('id', 'integer', (c) => c.autoIncrement().primaryKey())
    .addColumn('user', 'varchar(255)', (c) => c.unique().notNull())
    .addColumn('password', 'varchar(255)')
    .addColumn('cookie', 'varchar(255)')
  .execute();

// Modülleri dışa aktar
module.exports = kysely


const main = async () => {

  await kysely.schema.createTable('users')
  .ifNotExists()
    .addColumn('id', 'integer', (c) => c.autoIncrement().primaryKey())
    .addColumn('user', 'varchar(255)', (c) => c.unique().notNull())
    .addColumn('password', 'varchar(255)')
    .addColumn('cookie', 'varchar(255)', c => c.unique())
  .execute();

  await kysely.schema.createTable('cart')
  .ifNotExists()
    .addColumn('id', 'integer', (c) => c.autoIncrement().primaryKey())
    .addColumn('username', 'varchar(255)', (c) => c.unique().notNull())
    .addColumn('totalprice', 'smallint', (c) => c.defaultTo(0))
  .execute();

}

main()