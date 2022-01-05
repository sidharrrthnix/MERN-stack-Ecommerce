const Category = require('../models/category');
const slugify = require('slugify');
const Sub = require('../models/sub');
const Product = require('../models/product');
exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (e) {
    res.status(400).send('try creating category after a while');
  }
};
exports.list = async (req, res) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};
exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  let products = await Product.find({ category }).populate('category').exec();
  res.json({ category, products });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (e) {
    res.status(400).send('try updating properly');
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (e) {
    res.status(400).send('try deleting properly');
  }
};

exports.getSubs = async (req, res) => {
  try {
    const subs = await Sub.find({ parent: req.params._id });
    res.json(subs);
  } catch (e) {
    console.log(e);
  }
};
