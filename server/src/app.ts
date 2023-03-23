import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { redirectUrl } from './controllers/url';

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', '..', 'client', 'build')));

app.get('/', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
});

app.get('/login', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
});

app.get('/register', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
});

app.get('/error', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
});
app.get('/logout', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
});

app.use('/api', routes);

app.get('/:urlSlug', redirectUrl);

export default app;
