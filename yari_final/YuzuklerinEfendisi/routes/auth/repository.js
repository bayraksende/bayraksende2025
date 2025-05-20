const db = require('../../lib/kysely')


const getAdminCookie = async () => {
  return await db  .selectFrom('users')
            .selectAll()
            .where('user', '=', 'administrator')
            .executeTakeFirst()
}


const doesUsernameExist = async (user) => {
  try {
    const result = await db
      .selectFrom('users')
      .select('user')
      .where('user', '=', user)
      .execute();

    return result.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const createUser = async (user, hashedPassword) => {
  try {
    await db
      .insertInto('users')
      .values({
        user: user,
        password: hashedPassword,
        cookie: crypto.randomUUID().replaceAll('-', '')
      })
      .execute();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getHashedPassword = async (user) => {
  try {
    
    const result = await db.selectFrom('users').selectAll().where('user', '=', user).execute()

    return result.length > 0 ? result[0].password : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getUserbyCookie = async (cookie) => {
  return await db .selectFrom('users')
                  .selectAll()
                  .where('cookie', '=', cookie)
                  .executeTakeFirst()
}

const getCookiebyUser = async (user) => {
  return await db .selectFrom('users')
                  .selectAll()
                  .where('user', '=',user)
                  .executeTakeFirst()
}

module.exports = {
  doesUsernameExist,
  createUser,
  getHashedPassword,
  getUserbyCookie,
  getCookiebyUser,
  getAdminCookie
};
