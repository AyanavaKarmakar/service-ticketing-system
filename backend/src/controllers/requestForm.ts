/// <reference path="../types/custom.d.ts" />

import type { Request, Response } from "express";

export const requestForm = (req: Request, res: Response) => {
  return res.status(200).json({ customerID: req.customer?.username });
};
