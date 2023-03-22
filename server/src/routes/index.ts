//create a user login and register route
import { Router } from 'express';
import { createUrl } from '../controllers/url';
import { register, login } from '../controllers/user';
import { checkToken } from '../middlewares/verifyUser';

const router: Router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/shorten', checkToken, createUrl);

export default router;
