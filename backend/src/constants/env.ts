

const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;

    if(value === undefined) {
        throw new Error (`Missing env variable ${key}`)
    }
    return value
}

export const NODE_ENV = getEnv('NODE_ENV', 'development')
export const MONGO_URI = getEnv('MONGO_URI')
export const PORT = getEnv('PORT', '5000')
export const DB_NAME= getEnv('DB_NAME')
export const CLOUDINARY_CLOUD_NAME= getEnv('CLOUDINARY_CLOUD_NAME')
export const CLOUDINARY_API_KEY= getEnv('CLOUDINARY_API_KEY')
export const CLOUDINARY_API_SECRET= getEnv('CLOUDINARY_API_SECRET')
export const JWT_SECRET = getEnv('JWT_SECRET')
export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET')
export const JWT_EXPIRES_IN = getEnv('JWT_EXPIRES_IN')
export const JWT_REFRESH_EXPIRES_IN = getEnv('JWT_REFRESH_EXPIRES_IN')
export const EMAIL_FROM = getEnv('EMAIL_FROM')
export const MAILTRAP_USERNAME = getEnv('MAILTRAP_USERNAME')
export const MAILTRAP_PASSWORD = getEnv('MAILTRAP_PASSWORD')
export const MAILTRAP_HOST = getEnv('MAILTRAP_HOST')
export const MAILTRAP_PORT = getEnv('MAILTRAP_PORT')
export const MAIL_SECURE = getEnv('MAIL_SECURE')
export const MAIL_POOL =getEnv('MAIL_POOL')
export const BCRYPT_SALT_ROUNDS =getEnv('BCRYPT_SALT_ROUNDS', '12')
export const OTP_EXPIRES_IN =getEnv('OTP_EXPIRES_IN', '15')
export const CORS_ORIGIN = getEnv('CORS_ORIGIN')



