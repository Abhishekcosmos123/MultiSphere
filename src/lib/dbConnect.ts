import mongoose from 'mongoose';

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseConnection | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiznation';

if (!globalThis.mongoose) {
  globalThis.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  try {
    if (globalThis.mongoose!.conn) {
      return globalThis.mongoose!.conn;
    }

    if (!globalThis.mongoose!.promise) {
      const opts = {
        bufferCommands: false,
      };

      globalThis.mongoose!.promise = mongoose.connect(MONGODB_URI, opts);
    }

    const conn = await globalThis.mongoose!.promise;
    globalThis.mongoose!.conn = conn;

    return conn;
  } catch (error) {
    if (globalThis.mongoose) {
      globalThis.mongoose.promise = null;
    }
    throw error;
  }
};

export default dbConnect;
