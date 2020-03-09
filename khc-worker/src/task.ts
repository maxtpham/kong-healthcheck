import * as os from 'os';
import * as request from 'request'

export const NAME: string = os.hostname();
export const MASTER_URL: string = process.env.MASTER_URL + '/worker';

export function start(): void {
    try {
        execute();
    } finally {
        setTimeout(start, 1000 * 10);
    }
}

interface IWorkerConfig {
    name: string;
}

function execute(): void {
    request.post(MASTER_URL, { body: <IWorkerConfig>{ name: NAME }, json: true }, (err, res, body) => {
        console.log(err, body);
    });
}