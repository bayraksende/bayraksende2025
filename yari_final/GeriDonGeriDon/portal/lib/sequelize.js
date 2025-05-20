const { Sequelize } = require('sequelize');

// Sequelize bağlantısını oluştur
const sequelize = new Sequelize('csrf_soru', 'urbatek_user', 'cibrxpass123', {
  host: 'soru.bayraksende.com', // MySQL sunucusunun adresi
  dialect: 'mysql', // Kullanılacak veritabanı türü
  port: 4607, // MySQL portu (varsayılan 3306)
  logging: false, // Konsola SQL sorgularını yazdırmak istemiyorsanız false yapabilirsiniz
});

// Bağlantıyı test et
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize ile veritabanına başarıyla bağlanıldı.');
  } catch (error) {
    console.error('Veritabanına bağlanırken hata oluştu:', error);
  }
})();

module.exports = sequelize;
