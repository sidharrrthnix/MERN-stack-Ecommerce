const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.upload = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: 'auto',
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

exports.remove = async (req, res) => {
  let image_id = req.body.public_id;
  try {
    const del = await cloudinary.uploader.destroy(image_id);
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false, e });
  }
};
