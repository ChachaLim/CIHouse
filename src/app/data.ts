export interface House {
    id?: string;
    price?: String;
    hostName?: String;
    houseName?: String;
    address?: String;
    coords?: {
        lat?: string;
        lng?: string;
    };
}
