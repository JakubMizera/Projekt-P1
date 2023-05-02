import { Router, Request, Response } from "express";
import { User, UserWithId, Users } from "./user.model";

const router = Router();

router.get('/', async (req: Request, res: Response<UserWithId[]>) => {
    const result = await Users.find().toArray();
    res.json(result);
});

export default router;