const state: IState = {
    workers: {},
    jobs: { upstreams: [] }
};
export default state;

/** Milliseconds timeout for Workers */
const WorkerTimeout = 1000 * 20;

/**
 * Worker config that's sent by Worker to register its info with server
 */
export interface IWorkerRequest {
    name: string;
}

export interface IWorkerConfig {
    /** Its recent PING time */
    time: number;

    /** Send to client if any update to its job */
    updated: boolean;

    /** Its assigned job detail */
    job: IWorkerJob;
}

export interface IWorkerJob {
    /** its assigned upstreams healthchecks */
    upstreams: string[];
}

/**
 * Global master state, that will be managed by backgroud-task
 */
export interface IState {
    /** Map from worker code to its configs */
    workers: { [code: string]: IWorkerConfig };

    /** All the jobs that will need to distribute to all workers */
    jobs: IWorkerJob;
}

export function pingWorker(code: string) {
    state.workers[code].time = Date.now();
    if (timeoutWorkers()) {
        rebalanceJobs();
    }
}

export function registerWorker(code: string) {
    timeoutWorkers();
    state.workers[code] = {
        time: Date.now(),
        updated: true,
        job: { upstreams: [] }
    };
    console.log(`Worker[${code}] registered!`);
    rebalanceJobs();
}

export function timeoutWorkers(): boolean {
    let updated: boolean = false;
    const timeout = Date.now() - WorkerTimeout;
    for (const code in state.workers) {
        if (state.workers[code].time < timeout) {
            delete state.workers[code];
            updated = true;
            console.log(`Worker[${code}] timeout!`);
        }
    }
    return updated;
}

export function rebalanceJobs() {
    const codes = Object.getOwnPropertyNames(state.workers);
    if (codes.length > 0) {
        rebalanceJobsUpstreams(codes);
    }
}

export function rebalanceJobsUpstreams(codes: string[]) {
    if (codes.length <= 1) {
        // Only 1 worker, assign all the jobs
        state.workers[codes[0]].job.upstreams = state.jobs.upstreams;
        state.workers[codes[0]].updated = true;
        console.log(`Worker[${codes[0]}].upstreams = `, JSON.stringify(state.jobs.upstreams));
    } else if (state.jobs.upstreams.length <= 0) {
        // Reset all worker to no jobs
        for (let w = 0; w < codes.length; w++) {
            state.workers[codes[w]].job.upstreams = [];
            state.workers[codes[w]].updated = true;
            console.log(`Worker[${codes[w]}].upstreams = <EMPTY>`);
        }
    } else {
        // Distribute the jobs for all workers by hash index the worker's code
        for (let w = 0; w < codes.length; w++) {
            state.workers[codes[w]].job.upstreams = state.jobs.upstreams.filter(us => (hashCode(us) % codes.length) === w);
            state.workers[codes[w]].updated = true;
            console.log(`Worker[${codes[w]}].upstreams = ${JSON.stringify(state.workers[codes[w]].job.upstreams)}`);
        }
    }
}

function hashCode(str: string): number {
    var hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}