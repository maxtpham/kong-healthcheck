import * as os from 'os';
import * as request from 'request'
import { IKongUpstream } from './interfaces';

export const NAME: string = os.hostname();
export const KONG_ADMIN_URL: string = process.env.KONG_ADMIN_URL;

export function start(): void {
    try {
        execute();
    } finally {
        setTimeout(start, 1000 * 10);
    }
}

function execute(): void {
    request.get(KONG_ADMIN_URL + '/upstreams', (err, res, body) => {
        if (!err) {
            const upstreams: IKongUpstream = JSON.parse(body);
            console.log(upstreams.data.map(o => o.name));
        } else {
            console.error(err)
        }
    });
}