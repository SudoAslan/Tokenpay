"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToMongoDB = async () => {
    try {
        const uri = "mongodb://127.0.0.1:27017/eth_wallet";
        if (!uri) {
            throw new Error('MongoDB URI ist nicht definiert!');
        }
        await mongoose_1.default.connect(uri);
        console.log('MongoDB verbunden');
    }
    catch (error) {
        console.error('Fehler bei MongoDB-Verbindung:', error);
    }
};
exports.connectToMongoDB = connectToMongoDB;
