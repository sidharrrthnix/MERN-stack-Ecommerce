const admin = require('../firebase');
const User = require('../models/user');
exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
    next();
  } catch (e) {
    res.status(401).json({
      res: 'please check your token',
    });
  }
};
exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email }).exec();
  if (adminUser.role !== 'admin') {
    res.status(403).json({
      err: 'Admin Route, can be visible to admins',
    });
  } else {
    next();
  }
};
