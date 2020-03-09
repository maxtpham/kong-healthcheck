export interface IWorkerConfig {
    name: string;
}

export interface IKongUpstream {
    next: any;
    data: IKongUpstreamItem[]
}

export interface IKongUpstreamItem {
    id: string;
    name: string;
}