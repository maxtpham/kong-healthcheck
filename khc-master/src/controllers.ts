import * as express from 'express';
import state, { IWorkerRequest, registerWorker, pingWorker } from './state';

export async function get_healthz(req: express.Request, res: express.Response): Promise<void> {
    res.status(200).send('OK');
}

export async function post_worker(req: express.Request, res: express.Response): Promise<void> {
    const workerReq: IWorkerRequest = req.body;
    if (!workerReq || !workerReq.name) {
        res.status(404).send('Not Found');
    } else {
        if (!state.workers[workerReq.name]) {
            registerWorker(workerReq.name);
        } else {
            pingWorker(workerReq.name);
        }
        if (!state.workers[workerReq.name].updated) {
            res.status(204).send('OK'); // no content
        } else {
            state.workers[workerReq.name].updated = false;
            res.status(200).send(state.workers[workerReq.name].job);
        }
    }
}