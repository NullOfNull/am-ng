import { Component, OnInit, Input, Output } from '@angular/core';
import { RestGspService } from '../../service/rest-gsp.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'eam-amcardlist',
  templateUrl: './amcardlist.component.html',
  styleUrls: ['./amcardlist.component.css']
})
export class AmcardlistComponent implements OnInit {
  private _restGspService: RestGspService;
  private loading: boolean = false;
  public pageSize: number = 5;
  public pageTotal: number = 0;
  public pageIndex: number = 1;
  data: any[] = [];//与当前列表数据绑定
  listData: Array<object> = [];//完整的list数据
  constructor(restGspService: RestGspService) {
    this._restGspService = restGspService;
  }

  ngOnInit() {
  }
  onPageChange(index: number) {
    this.loading = true;
    let offset: number = (index - 1) * this.pageSize;
    if ((offset + this.pageSize) >= this.listData.length) {
      this.data = this.listData.slice(offset);
    }
    else {
      this.data = this.listData.slice(offset, offset + this.pageSize);
    }
    this.loading = false;
  }
  /**
   * setListData设置表单数据
   */
  public setListData(list: Array<object>) {
    this.loading = true;
    this.listData = list;
    if (this.listData && this.listData.length > 0) {
      this.pageTotal = this.listData.length;
      this.pageIndex = 1;
      let firstPageData = this.listData.slice(0, 5);
      this.data = firstPageData;
    }
    else {
      this.data = [];
      this.pageTotal = 0;
    }
    this.loading = false;
  }
}
