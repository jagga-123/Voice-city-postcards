import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Vice City Postcards API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

export default router;
