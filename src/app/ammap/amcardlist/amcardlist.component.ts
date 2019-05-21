import { Component, OnInit } from '@angular/core';
import { RestGspService } from '../../service/rest-gsp.service';

@Component({
  selector: 'eam-amcardlist',
  templateUrl: './amcardlist.component.html',
  styleUrls: ['./amcardlist.component.css']
})
export class AmcardlistComponent implements OnInit {
  private _restGspService: RestGspService;
  constructor(restGspService: RestGspService) {
    this._restGspService = restGspService;
  }
  data = [
    {
      title: 'Title 1'
    },
    {
      title: 'Title 2'
    },
    {
      title: 'Title 3'
    },
    {
      title: 'Title 4'
    }
  ];
  ngOnInit() {
  }
  onLoadMore() {
    var options = {
      assembly: 'Genersoft.AM.Web.BizCommon',
      className: 'Genersoft.AM.Web.BizCommon.AMTest',
      method: 'GetInfo',
      params: ['asdfasdf']
    }
    this._restGspService.invoke(options).then(function (ss) {
      console.log(ss);
    }).catch(function (ff) {
      console.log(ff)
    })
  }
}
