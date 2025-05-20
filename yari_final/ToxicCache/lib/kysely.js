const { Kysely, SqliteDialect } = require('kysely');
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt')
const crypto = require('crypto')


// Veritabanı bağlantısı
const kysely = new Kysely({
  dialect: new SqliteDialect({
    database: new Database('./database.sqlite'),
  }),
});

// Tablo oluşturma fonksiyonu
kysely.schema
  .createTable('users')
  .ifNotExists()
    .addColumn('id', 'integer', (c) => c.autoIncrement().primaryKey())
    .addColumn('user', 'varchar', (c) => c.unique().notNull())
    .addColumn('password', 'varchar')
    .addColumn('cookie', 'varchar(255)')
    .addColumn('date', 'integer')
  .execute();
// Modülleri dışa aktar
module.exports = kysely


const main = async () => {

  await kysely.schema.createTable('users')
  .ifNotExists()
    .addColumn('id', 'integer', (c) => c.autoIncrement().primaryKey())
    .addColumn('user', 'varchar', (c) => c.unique().notNull())
    .addColumn('password', 'varchar')
    .addColumn('cookie', 'varchar', c => c.unique())
    .addColumn('date', 'integer')
  .execute();

  const admin = await kysely
    .selectFrom('users')
    .selectAll()
    .where('user', '=', 'administrator')
    .executeTakeFirst()
  
  if(!admin) {
    // admin kullanıcısı yoksa oluştur
    await kysely.insertInto('users')
    .values({
      user: 'administrator',
      password: "cibrx123asjdıasjd9wjkokd32ok*d",
      cookie: '4ec57727abee4a22bba6fb0fb414dd67',
      date: new Date().getTime()
    }).executeTakeFirstOrThrow()
  }  
}

main()