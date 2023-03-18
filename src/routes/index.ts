//create a user login and register route
import { Router } from 'express';
import { createUrl } from '../controllers/url';

const router: Router = Router();

router.get('/register', (req, res) => {
    res.send('register');
});
router.get('/login', (req, res) => {
    res.send('login');
});

router.post('/shorten', createUrl);
export default router;
