const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('csrf_soru', 'urbatek_user', 'cibrxpass123', {
  host: 'soru.bayraksende.com',
  dialect: 'mysql',
  port: 4607,
  logging: false, 
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize ile veritabanına başarıyla bağlanıldı.');
  } catch (error) {
    console.error('Veritabanına bağlanırken hata oluştu:', error);
  }
})();

module.exports = sequelize;
