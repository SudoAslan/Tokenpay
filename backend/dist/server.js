"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const balance_1 = __importDefault(require("./routes/balance"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const mongodb_1 = require("./lib/mongodb");
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, mongodb_1.connectToMongoDB)();
app.use("/balance", balance_1.default);
app.use("/transaction", transactions_1.default);
app.listen(port, () => {
    console.log(`Backend läuft auf http://localhost:${port}`);
});
