import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxAmapComponent } from 'ngx-amap';
import { RestGspService } from 'src/app/service/rest-gsp.service';
import { AmcardlistComponent } from '../amcardlist/amcardlist.component';

@Component({
  selector: 'eam-mapmain',
  templateUrl: './mapmain.component.html',
  styleUrls: ['./mapmain.component.css']
})
export class MapMainComponent implements OnInit {

  @ViewChild('eammap')
  private eammap: NgxAmapComponent;
  @ViewChild('eamcardlist')
  private eamcardlist:AmcardlistComponent;

  private _restGspService: RestGspService;
  public markers: any;
  public cardListData: any[] = [];
  constructor(restGspService: RestGspService) {
    this._restGspService = restGspService;
  }

  ngOnInit() {
    let options = {
      assembly: 'Genersoft.AM.DAGL.AMDAGLCore',
      className: 'Genersoft.AM.DAGL.AMDAGLCore.AMCommCore',
      method: 'GetPosData',
      params: []
    }
    this._restGspService.invoke(options).then(data => {
      this.markers = data;
      this.eammap.setFitView();
    })

  }
  onSelect(e) {
    console.log(e);
    let lng: number = e.poi.location.lng;
    let lat: number = e.poi.location.lat;
    let position: Array<number> = new Array<number>();
    position.push(lng);
    position.push(lat);

    this.eammap.setCenter(position);

  }
  onMarkerClick(e) {
    let posid: string = e.target.getExtData();
    let options: object = {
      assembly: 'Genersoft.AM.DAGL.AMDAGLCore',
      className: 'Genersoft.AM.DAGL.AMDAGLCore.AMCommCore',
      method: 'GetCardList',
      params: [posid]
    }
    if (posid) {
      this._restGspService.invoke(options).then(data => {
        let cardList: Array<object> = data[posid];
        if(cardList){
          this.eamcardlist.setListData(data[posid]);
        }
        else{
          this.eamcardlist.setListData([]);
        }
      })
    }
  }

}
