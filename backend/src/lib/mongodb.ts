import mongoose from "mongoose";

export const connectToMongoDB = async () => {
    try {
      const uri = "mongodb://127.0.0.1:27017/eth_wallet";
      if (!uri) {
        throw new Error('MongoDB URI ist nicht definiert!');
      }
  
      await mongoose.connect(uri);
  
      console.log('MongoDB verbunden');
    } catch (error) {
      console.error('Fehler bei MongoDB-Verbindung:', error);
    }
  };