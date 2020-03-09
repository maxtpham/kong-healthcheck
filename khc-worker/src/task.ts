import * as os from 'os';
import * as needle from 'needle'

export const NAME: string = os.hostname();
export const MASTER_URL: string = process.env.MASTER_URL + '/worker';

export async function start(): Promise<void> {
    try {
        await execute();
    } finally {
        setTimeout(start, 1000 * 10);
    }
}

interface IWorkerConfig {
    name: string;
}

async function execute(): Promise<void> {
    await needle('get', MASTER_URL, {  });
    request.post(MASTER_URL, { body: <IWorkerConfig>{ name: NAME }, json: true }, (err, res, body) => {
        console.log(err, body);
    });
}