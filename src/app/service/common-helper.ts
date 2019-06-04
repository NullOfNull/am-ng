import { Injectable } from '@angular/core';
import { WindowRef, DocumentRef } from './browers-globals';

@Injectable()
export class CommonHelper {
    constructor(private w: WindowRef, private d: DocumentRef) {
    }
    /**
     * 前端分页
     * @param list 分页目标
     */
    public GetPageData(list: Array<any>, pageIndex: number, pageSize: number) {
        let data: Array<any> = [];
        let offset: number = (pageIndex - 1) * pageSize;
        if ((offset + pageSize) >= list.length) {
            data = list.slice(offset);
        }
        else {
            data = list.slice(offset, offset + pageSize);
        }
        return { pageTotal: list.length, pageIndex: pageIndex, pageSize: pageSize, content: data }
    }
}