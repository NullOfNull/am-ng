import { Component, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import { RestGspService } from '../../service/rest-gsp.service';
import { EventEmitter } from '@angular/core';
import { CardInfo } from 'src/app/types/enity';

@Component({
  selector: 'eam-amcardlist',
  templateUrl: './amcardlist.component.html',
  styleUrls: ['./amcardlist.component.css']
})
export class AmcardlistComponent implements OnInit {
  @Output() rowClick = new EventEmitter();
  @Output() cardClick = new EventEmitter();
  @Input() loading: boolean = false;
  private _restGspService: RestGspService;
  public pageSize: number = 5;
  public pageTotal: number = 0;
  public pageIndex: number = 1;
  public data: Array<CardInfo> = [];//与当前列表数据绑定
  listData: Array<CardInfo> = [];//完整的list数据
  constructor(restGspService: RestGspService, private changeRef: ChangeDetectorRef) {
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
  onItemClick(e) {
    this.rowClick.emit(e);
    //console.log(item);
  }
  onCardClick(e) {
    this.cardClick.emit(e)
  }
  /**
   * setListData设置表单数据
   */
  public setListData(list: Array<CardInfo>) {
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
      this.pageIndex = 0;
    }
    this.changeRef.detectChanges();
  }
}
