import * as express from 'express';
import state, { IWorkerRequest, registerWorker, pingWorker } from './state';

export async function get_healthz(req: express.Request, res: express.Response): Promise<void> {
    res.send('OK').status(200);
}

export async function post_worker(req: express.Request, res: express.Response): Promise<void> {
    const workerReq: IWorkerRequest = req.body;
    if (!workerReq || !workerReq.name) {
        res.send('Not Found').status(404);
    } else {
        if (!state.workers[workerReq.name]) {
            registerWorker(workerReq.name);
        } else {
            pingWorker(workerReq.name);
        }
        if (!state.workers[workerReq.name].updated) {
            res.send('OK').status(204); // no content
        } else {
            state.workers[workerReq.name].updated = false;
            res.send(state.workers[workerReq.name].job).status(200);
        }
    }
}