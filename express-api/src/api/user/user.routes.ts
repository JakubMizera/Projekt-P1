import { Router, Request, Response } from "express";
import { User } from "./user.model";

const router = Router();

router.get('/', (req: Request, res: Response<User[]>) => {
    res.json([{
        userName: 'test',
        firstName: 'testname',
        surName: 'testsuername',
        email: 'testmail',
        phoneNumber: 515441512,
        country: 'Poland',
    }]);
});

export default router;