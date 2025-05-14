import http from 'http';
import express from 'express';
import cors from 'cors';
import getServicesRouter from './services/Route/get-services.js';

const app = express();
const server = http.createServer(app);

app.use(cors());

app.use(express.json());

app.use('/api/icons', getServicesRouter);

const PORT = 3002;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});  