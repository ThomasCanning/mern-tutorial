import * as dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

export const JWT_KEY = process.env.JWT_KEY
export const ATLAS_URI = process.env.ATLAS_URI