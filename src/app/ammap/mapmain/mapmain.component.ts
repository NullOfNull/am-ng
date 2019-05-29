import { Component, OnInit, ViewChild } from '@angular/core';
import { RestGspService } from 'src/app/service/rest-gsp.service';
import { AmcardlistComponent } from '../amcardlist/amcardlist.component';
import { MarkerClustererOptions, BMarkerClusterer } from 'src/lib/types/MarkerClusterer';
import { Marker, MapTypeControlOptions, MapTypeControlType, MapTypeEnum, GeolocationControlOptions, NavigationControlOptions, ControlAnchor, NavigationControlType, BGeolocationControl } from 'src/lib';

@Component({
  selector: 'eam-mapmain',
  templateUrl: './mapmain.component.html',
  styleUrls: ['./mapmain.component.css']
})
export class MapMainComponent implements OnInit {

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
  public mapTypeOpts: MapTypeControlOptions
  public naviOpts: NavigationControlOptions
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
    this.mapTypeOpts = {
      type: MapTypeControlType.BMAP_MAPTYPE_CONTROL_HORIZONTAL,
      mapTypes: [MapTypeEnum.BMAP_NORMAL_MAP, MapTypeEnum.BMAP_SATELLITE_MAP]
    }
    this.naviOpts = {
      anchor: ControlAnchor.BMAP_ANCHOR_TOP_LEFT,
      type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE,
    }

  }
  ngOnInit() {

  }
  /**
   * 点聚合加载后事件
   * @param e 
   */
  markerClustererLoaded(e: BMarkerClusterer) {
    this.getMarkers();
  }
  /**
   * 获取设置资产点标记
   */
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
  /**
   * 设置地图位置点
   * @param lng 
   * @param lat 
   */
  setMapCenter(lng: number, lat: number) {
    this.opts = {
      centerAndZoom: {
        lng: lng,
        lat: lat,
        zoom: 13,
      }
    }
  }
  /**
   * 定位框选择地址后执行事件
   * @param e 
   */
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
  /**
   * 标记点点击事件
   * @param e 
   */
  onMarkerClick(e) {
    let posid: string = e.marker.extData;
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
          this.eamcardlist.setListData(data[posid]);
        }
        else {
          this.eamcardlist.setListData([]);
        }
      })
    }
  }
  /**
   * 资产检索点击事件
   */
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
