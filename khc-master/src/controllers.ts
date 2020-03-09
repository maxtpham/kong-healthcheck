import * as express from 'express';
import { IWorkerConfig } from './interfaces';

export async function get_healthz(req: express.Request, res: express.Response): Promise<void> {
    res.send('OK').status(200);
}

export async function post_worker(req: express.Request, res: express.Response): Promise<void> {
    console.log((<IWorkerConfig>req.body).name);
    res.send('OK').status(200);
}