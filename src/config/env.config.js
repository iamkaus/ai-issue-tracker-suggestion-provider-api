import { config } from 'dotenv'

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`})

export const {
    PORT,
    NODE_ENV,
    JWT_SECRET,
    GEMINI_API_KEY,
    ARCJET_API_KEY,
    GITHUB_AUTHORIZATION_TOKEN,
    GITHUB_API
} = process.env