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

interface IWorkerJob {
    /** its assigned upstreams healthchecks */
    upstreams: string[];
}

async function execute(): Promise<void> {
    try {
        const workerRes = await needle('post', MASTER_URL, <IWorkerConfig>{ name: NAME }, { json: true });
        if (workerRes.statusCode === 200) {
            const workerJob: IWorkerJob = workerRes.body;
            console.log(workerRes.statusCode, workerJob);
        }
    } catch (err) {
        console.error('Error while executing the background task', (<Error>err).message || '');
    }
}