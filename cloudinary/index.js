const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: 'dedseoasc',
    api_key: 935224653874767,
    api_secret: '8ARiE5IongfV8dRZtomZvitQamg',

});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile',
        allowedFormats: ['jpg', 'jpeg', 'png']
        //   format: async (req, file) => ['jpeg','png','jpg'] // supports promises as well

    },
});


const parser = multer({ storage: storage });
module.exports = { cloudinary, storage, parser };