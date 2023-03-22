import app from './app';
import dotenv from 'dotenv';
import connectDB from './database';

dotenv.config();

const port: number = Number(process.env.PORT) || 3000;
const address: string = `http://localhost:${port}`;

connectDB().then(() => {
    app.listen(port, function () {
        if (process.env.NODE_ENV !== 'production')
            console.log(`starting app on: ${address}`);
    });
});
