export interface IUpstream {
    next: any;
    data: IUpstreamItem[]
}

export interface IUpstreamItem {
    id: string;
    name: string;
}