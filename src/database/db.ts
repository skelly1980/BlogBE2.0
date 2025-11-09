/* eslint-disable */
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async (): Promise<void> => {
    try {
        if (!MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        const conn = await mongoose.connect(MONGO_URI);
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    } catch (_error) {
        console.error('Connection to MongoDB failed', _error);
        throw _error;
    }
};

