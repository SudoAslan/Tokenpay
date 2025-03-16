import { Request, Response } from "express";

export const getBalance = (req: Request, res: Response) => {
    const balance = parseFloat((Math.random() * 3).toFixed(4)); 
    res.send({balance});  
};
