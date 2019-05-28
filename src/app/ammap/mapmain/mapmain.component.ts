import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxAmapComponent } from 'ngx-amap';
import { RestGspService } from 'src/app/service/rest-gsp.service';
import { AmcardlistComponent } from '../amcardlist/amcardlist.component';
import { MarkerClustererOptions, BMarkerClusterer } from 'src/lib/types/MarkerClusterer';
import { Marker } from 'src/lib';

@Component({
  selector: 'eam-mapmain',
  templateUrl: './mapmain.component.html',
  styleUrls: ['./mapmain.component.css']
})
export class MapMainComponent implements OnInit {

  @ViewChild('eammap')
  private eammap: NgxAmapComponent;
  @ViewChild('eamcardlist')
  private eamcardlist: AmcardlistComponent;
  private _restGspService: RestGspService;
  public markers: any;
  public cardListData: any[] = [];
  public queryType: string = 'AMCode';
  public queryValue: string = '';
  public opts: any = {};
  public clustererOptions: MarkerClustererOptions;
  public bmarkers: Array<Marker> = [];
  constructor(restGspService: RestGspService) {
    this._restGspService = restGspService;
    this.opts = {
      centerAndZoom: {
        lng: 121.506191,
        lat: 31.245554,
        zoom: 15,
      },
      enableScrollWheelZoom: true,
    };
    this.clustererOptions = {};
  }

  ngOnInit() {

  }
  markerClustererLoaded(e: BMarkerClusterer) {
    this.getMarkers().then(data=>{
      e.getMarkers().map(marker => {
        marker.addEventListener("click", function (event) {
          console.log(event)
        });
      })
    })

  }
  getMarkers() {
    let options = {
      assembly: 'Genersoft.AM.DAGL.AMDAGLCore',
      className: 'Genersoft.AM.DAGL.AMDAGLCore.AMCommCore',
      method: 'GetPosData',
      params: []
    }
    let invokeObject: Promise<void> = new Promise<void>((resolve: Function, reject: Function) => {
      this._restGspService.invoke(options).then(data => {
        for (const item of data) {
          this.bmarkers.push({
            point: {
              lng: item.pos[0],
              lat: item.pos[1]
            },
            options: {
              extData: item.posid
            }
          })
        }
        this.clustererOptions = {
          markers: this.bmarkers
        }
        resolve();
      })
    });
    return invokeObject
  }
  setMapCenter(lng: number, lat: number) {
    this.opts = {
      centerAndZoom: {
        lng: lng,
        lat: lat,
        zoom: 13,
      }
    }
  }
  onSelect(e) {
    console.log(e);
    let lng: number = e.poi.location.lng;
    let lat: number = e.poi.location.lat;
    this.opts = {
      centerAndZoom: {
        lng: lng,
        lat: lat,
        zoom: 13,
      }
    }

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
        if (cardList) {
          this.eamcardlist.setListData(cardList);
        }
        else {
          this.eamcardlist.setListData([]);
        }
      })
    }
  }
  onSearchClick() {
    if (this.queryType && this.queryValue) {
      let options: object = {
        assembly: 'Genersoft.AM.DAGL.AMDAGLCore',
        className: 'Genersoft.AM.DAGL.AMDAGLCore.AMCommCore',
        method: 'GetCardByName',
        params: [this.queryType, this.queryValue]
      }
      this._restGspService.invoke(options).then(data => {
        let cardList: Array<any> = data[this.queryValue];
        if (cardList) {
          this.eamcardlist.setListData(cardList);
          if (cardList.length == 1) {
            let card = cardList[0];
            this.setMapCenter(card.pos[0], card.pos[1]);
          }
        }
        else {
          this.eamcardlist.setListData([]);
        }
      })
    }

  }

}
