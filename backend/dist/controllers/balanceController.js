"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = void 0;
const getBalance = (req, res) => {
    const balance = parseFloat((Math.random() * 3).toFixed(4));
    res.send({ balance });
};
exports.getBalance = getBalance;
