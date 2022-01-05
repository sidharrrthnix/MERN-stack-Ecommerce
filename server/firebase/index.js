var admin = require('firebase-admin');

var serviceAccount = require('../config/ServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
