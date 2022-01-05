const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
  const { name, email, picture } = req.user;

  const user = await User.findOneAndUpdate({ email }, { name: email.split('@')[0], picture }, { new: true });
  if (user) {
    res.json(user);
    console.log('user updated', user);
  } else {
    const newUser = await new User({
      email,
      name: email.split('@')[0],
      picture,
    }).save();
    res.json(newUser);
    console.log('user created', newUser);
  }
};

exports.currentUser = async (req, res) => {
  await User.findOne({ email: req.user.email }).exec((e, user) => {
    if (e) {
      throw new Error(e);
    }
    res.json(user);
  });
};
