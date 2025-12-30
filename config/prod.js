module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
    EMAIL: process.env.EMAIL_USER,
    PASSWORD: process.env.EMAIL_PASSWORD,
    ELASTIC_HOST: process.env.ELASTIC_HOST,
    BULK_BATCH_SIZE: 50000,
}
