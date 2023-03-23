//create a user login and register route
import { Router } from 'express';
import { createUrl, getUrls } from '../controllers/url';
import { register, login } from '../controllers/user';
import { checkToken } from '../middlewares/verifyUser';
// import { redirectUrl } from '../controllers/url';

const router: Router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.post('/register', register);
router.post('/login', login);
router.post('/shorten', checkToken, createUrl);
router.get('/urls/:id', checkToken, getUrls);

// router.get('/:urlSlug', redirectUrl);

export default router;
