import * as express from 'express';

export async function get_healthz(req: express.Request, res: express.Response): Promise<void> {
    res.send('OK').status(200);
}