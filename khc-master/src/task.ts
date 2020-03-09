import * as os from 'os';
import * as needle from 'needle'
import * as kong from './kong';
import state from './state';

export const NAME: string = os.hostname();
export const KONG_ADMIN_UPSTREAMS_URL: string = process.env.KONG_ADMIN_URL + '/upstreams';

export async function start(): Promise<void> {
    try {
        await execute();
    } finally {
        setTimeout(start, 1000 * 10);
    }
}

async function execute(): Promise<void> {
    try {
        const upstreamsRes =  await needle('get', KONG_ADMIN_UPSTREAMS_URL);
        if (upstreamsRes.statusCode === 200) {
            const upstreams: kong.IUpstream = upstreamsRes.body;
            if (state.jobs.upstreams.length != upstreams.data.length) {
                state.jobs.upstreams = upstreams.data.map(o => o.name);
            }
        }
    } catch (err) {
        console.error('Error while executing the background task', err);
    }
}