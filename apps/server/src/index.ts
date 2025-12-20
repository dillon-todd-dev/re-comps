import 'dotenv/config';
import express, { Request, Response } from 'express';
import pinoHttp from 'pino-http';
import cookieParser from 'cookie-parser';
import { env } from '@src/config/env';
import log from '@src/logger';
import apiRoutes from '@src/routes';

const server = express();

server.use(pinoHttp({ logger: log.child({ name: 'http' }) }));

server.use(express.json());

server.use(cookieParser());

server.get('/health', (req: Request, res: Response) => {
  res.sendStatus(200);
});

server.use('/api', apiRoutes);

server.listen(env.PORT, () => {
  log.info(`Server is listening on http://localhost:${env.PORT}`);
});
