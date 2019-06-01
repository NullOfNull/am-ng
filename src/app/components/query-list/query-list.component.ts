import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { RestGspService } from 'src/app/service/rest-gsp.service';

@Component({
  selector: 'eam-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.less']
})
export class QueryListComponent implements OnInit {

  constructor(private cdRef: ChangeDetectorRef, private _restGspService: RestGspService) { }
  @Output() itemClick = new EventEmitter();
  ngOnInit() {
  }
  public loading = false;
  public searchResultActive;
  public searchText: string;
  public searchMarkers = [];
  public total: number = 0;
  public pageSize: number = 10;
  public txtKeyup(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }
  //搜索
  public search(pageIndex?) {
    if (!this.searchText) {
      this.clearSearch();
      return;
    }
    this.searchResultActive = true;
    pageIndex = pageIndex || 1;
    var data = {
      page: 1, size: 10, totalSize: 15, content: [{
        id: "58eff8ca7b6411e8bf328cec4b62001a",
        name: "test1"
      }]
    }
    let options = {
      assembly: 'Genersoft.AM.DAGL.AMDAGLCore',
      className: 'Genersoft.AM.DAGL.AMDAGLCore.AMCommCore',
      method: 'GetCompByName',
      params: [this.searchText]
    }
    this.loading = true;
    console.log(this.searchText);
    this._restGspService.invoke(options).then(data => {
      this.total = data.totalSize;
      this.searchMarkers = data[this.searchText];
      this.loading = false;
    }).finally(() => {
      this.loading = false;
    })

    // this.cdRef.detectChanges();
  }
  //关闭搜索
  public closeSearch() {
    this.clearSearch();
    this.searchResultActive = false;
  }
  //清除搜索
  public clearSearch() {
    this.searchText = null;
    this.searchMarkers = [];
    this.total = 0;
  }
  locateSelectMarker(item) {
    this.itemClick.emit(item);
  }
}
