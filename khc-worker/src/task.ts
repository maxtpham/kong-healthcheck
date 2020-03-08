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

function execute(): void {
    request.post(MASTER_URL, { body: NAME }, (err, res, body) => {
        console.log(err, res, body);
    });
}