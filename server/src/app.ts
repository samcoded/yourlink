import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import { redirectUrl } from './controllers/url';

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req: Request, res: Response) {
    res.send('Hello, Welcome to the yourlink backend API');
});

app.use('/api', routes);
app.get('/:urlSlug', redirectUrl);
export default app;
