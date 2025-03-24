import mongoose from 'mongoose';

declare global {
  var mongoose: { conn: any; promise: Promise<any> | null };
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiznation';

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  try {
    if (global.mongoose.conn) {
      return global.mongoose.conn;
    }

    if (!global.mongoose.promise) {
      const opts = {
        bufferCommands: false,
      };

      global.mongoose.promise = mongoose.connect(MONGODB_URI, opts);
    }

    const conn = await global.mongoose.promise;
    global.mongoose.conn = conn;

    return conn;
  } catch (error) {
    global.mongoose.promise = null;
    throw error;
  }
};

export default dbConnect;
