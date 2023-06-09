import mongoose from 'mongoose';

const conn: any = {
  isConnected: false,
};

// Db

const dbName = process.env.MONGO_DB as string;

// eslint-disable-next-line consistent-return
export default async function dbConnect() {
  try {
    // Check if database is already connected
    if (conn.isConnected === 1) return console.log('Already Connected');

    // Connect to database
    const db = await mongoose.connect(process.env.MONGO_URI as string, {
      dbName,
    });

    // set the connection state to connected

    conn.isConnected = db.connections[0].readyState;

    console.log({
      message: 'Database is connected',
      status: conn.isConnected,
      url: db.connection.name,
      host: db.connection.host,
      port: db.connection.port,
      name: db.connection.name,
      connection: conn.isConnected,
    });
  } catch (error) {
    console.log(error);
  }

  // Event Listeners

  mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected');
  });

  mongoose.connection.on('connected', () => {
    console.log('Database connected');
  });

  mongoose.connection.on('error', (error: any) => {
    console.log('Database error', error);
  });
}
