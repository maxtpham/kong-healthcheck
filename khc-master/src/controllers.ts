import * as express from 'express';

export async function get_healthz(req: express.Request, res: express.Response): Promise<void> {
    res.send('OK').status(200);
}

export async function post_worker(req: express.Request, res: express.Response): Promise<void> {
    console.log(req.body);
    res.send('OK').status(200);
}