export interface CardInfo {
    cardid?: string;
    amid: string;
    amcode: string;
    amname: string;
    posid: string;
    pos: Array<number>;
    compname: string;
    usecompname: string;
    amqty?: number
    orival?: number
}
export interface PosInfo {
    posid: string;
    posname: string;
    poscode: string;
    amqty?: number;
    orival?: number;
    pos: Array<number>;
}
export interface CompanyInfo {
    code: string;
    name: string;
    id: string;
}
export interface PaginationData {
    page: number;
    size: number;
    totalSize: number;
    content: Array<any>;
}
