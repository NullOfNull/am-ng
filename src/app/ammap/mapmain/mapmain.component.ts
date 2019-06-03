import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { RestGspService } from 'src/app/service/rest-gsp.service';
import { AmcardlistComponent } from '../amcardlist/amcardlist.component';
import { MarkerClustererOptions, BMarkerClusterer } from 'src/lib/types/MarkerClusterer';
import { Marker, MapTypeControlOptions, MapTypeControlType, MapTypeEnum, NavigationControlOptions, ControlAnchor, NavigationControlType, MarkerOptions, BMarker, Animation } from 'src/lib';
import { CardInfo, PosInfo, CompanyInfo } from 'src/app/types/enity';
import { CityListControlOptinos } from 'src/lib/types/Control';

@Component({
  selector: 'eam-mapmain',
  templateUrl: './mapmain.component.html',
  styleUrls: ['./mapmain.component.css']
})
export class MapMainComponent implements OnInit {

  @ViewChild('eamcardlist')
  private eamcardlist: AmcardlistComponent;
  private _restGspService: RestGspService;
  public markerOptions: Array<object> = [];
  public queryType: string = 'AMCode';
  public queryValue: string = '';
  public opts: any = {};
  public clustererOptions: MarkerClustererOptions;
  public bmarkers: Array<Marker> = [];
  public mapTypeOpts: MapTypeControlOptions
  public naviOpts: NavigationControlOptions
  public cityListOpts: CityListControlOptinos
  public loading: boolean = false
  constructor(restGspService: RestGspService, private changeRef: ChangeDetectorRef) {
    this._restGspService = restGspService;
    this.opts = {
      centerAndZoom: {
        lng: 121.506191,
        lat: 31.245554,
        zoom: 15,
      },
      enableScrollWheelZoom: true,
    };
    this.clustererOptions = {
      updateText: (markers: Array<BMarker>) => {
        if (markers.length > 0) {
          let sum: number = 0;
          for (const marker of markers) {
            sum += marker['extData'].amqty
          }
          return sum
        }
        else {
          return 0;
        }
      }
    };
    this.mapTypeOpts = {
      type: MapTypeControlType.BMAP_MAPTYPE_CONTROL_HORIZONTAL,
      mapTypes: [MapTypeEnum.BMAP_NORMAL_MAP, MapTypeEnum.BMAP_SATELLITE_MAP]
    }
    this.naviOpts = {
      anchor: ControlAnchor.BMAP_ANCHOR_TOP_LEFT,
      type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE,
    }
    this.cityListOpts = {
      anchor: 1,
      offset: { width: 100, height: 10 }
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
      className: 'Genersoft.AM.DAGL.AMDAGLCore.AMMapCoreNew',
      method: 'GetPosData',
      params: []
    }
    let invokeObject: Promise<void> = new Promise<void>((resolve: Function, reject: Function) => {
      this._restGspService.invoke(options).then((data) => {
        let dataObj: Array<PosInfo> = JSON.parse(data)
        for (const item of dataObj) {
          this.bmarkers.push({
            point: {
              lng: item.pos[0],
              lat: item.pos[1]
            },
            options: {
              extData: {
                posid: item.posid,
                amqty: item.amqty,
                orival: item.orival
              },
              title: item.posname + '\n点击后左侧显示该地区资产列表'
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
    //this.changeRef.detectChanges();
  }
  /**
   * 标记点点击事件
   * @param e 
   */
  onMarkerClick(e) {
    let posid: string = e.marker.extData.posid;
    let options: object = {
      assembly: 'Genersoft.AM.DAGL.AMDAGLCore',
      className: 'Genersoft.AM.DAGL.AMDAGLCore.AMMapCoreNew',
      method: 'GetCardListByPos',
      params: [posid]
    }
    if (posid) {
      this.loading = true;
      this._restGspService.invoke(options).then(data => {
        let cardList: Array<CardInfo> = JSON.parse(data)
        if (cardList) {
          this.eamcardlist.setListData(cardList);
        }
        else {
          this.eamcardlist.setListData([]);
        }
        this.loading = false;
      }).finally(() => { this.loading = false; })
    }
  }
  /**
   * 资产检索点击事件
   */
  onSearchClick() {
    if (this.queryType && this.queryValue) {
      let options: object = {
        assembly: 'Genersoft.AM.DAGL.AMDAGLCore',
        className: 'Genersoft.AM.DAGL.AMDAGLCore.AMMapCoreNew',
        method: 'GetCardList',
        params: [this.queryType, this.queryValue]
      }
      this.loading = true;
      this._restGspService.invoke(options).then(data => {
        let cardList: Array<CardInfo> = JSON.parse(data)
        if (cardList) {
          this.eamcardlist.setListData(cardList);
          if (cardList.length == 1) {
            let card: CardInfo = cardList[0];
            this.setMapCenter(card.pos[0], card.pos[1]);
          }
        }
        else {
          this.eamcardlist.setListData([]);
        }
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      })
    }
  }
  /**
   * 左侧资产列表点击定位标记事件
   * @param e 
   */
  onRowClick(e) {
    let card: CardInfo = e.data;
    if (card.pos) {
      this.setMapCenter(card.pos[0], card.pos[1]);
      let markers = [];
      markers.push({
        point: {
          lng: card.pos[0],
          lat: card.pos[1]
        },
        options: {
          extData: { posid: card.posid }
        }
      })
      this.markerOptions = markers;
      this.clustererOptions = {
        markers: []
      }
      this.changeRef.markForCheck();
    }
  }
  /**
   * 使用单位点击事件
   * @param e 
   */
  onItemClick(e: CompanyInfo) {
    let options = {
      assembly: 'Genersoft.AM.DAGL.AMDAGLCore',
      className: 'Genersoft.AM.DAGL.AMDAGLCore.AMMapCoreNew',
      method: 'GetPosListByComp',
      params: [e.id]
    }
    this.loading = true;
    this._restGspService.invoke(options).then((data) => {
      let markers = [];
      let dataObj: Array<PosInfo> = JSON.parse(data)
      for (const item of dataObj) {
        markers.push({
          point: {
            lng: item.pos[0],
            lat: item.pos[1]
          },
          options: {
            extData: { posid: item.posid }
          }
        })
      }
      this.markerOptions = markers;
      this.clustererOptions = {
        markers: []
      }
      this.loading = false;
    }).finally(() => { this.loading = false; })
  }
  onAllClick(e) {
    this.markerOptions = []
    this.bmarkers = []
    this.getMarkers();
  }
  onMarkerLoaded(e: BMarker) {
    e.setAnimation(Animation.BMAP_ANIMATION_BOUNCE);
  }
  onSingleMarkerClicked(e) {
    let posid: string = e.marker.extData.posid;
    let options: object = {
      assembly: 'Genersoft.AM.DAGL.AMDAGLCore',
      className: 'Genersoft.AM.DAGL.AMDAGLCore.AMMapCoreNew',
      method: 'GetCardListByPos',
      params: [posid]
    }
    this.loading = true;
    if (posid) {
      this._restGspService.invoke(options).then(data => {
        let cardList: Array<CardInfo> = JSON.parse(data)
        if (cardList) {
          this.eamcardlist.setListData(cardList);
        }
        else {
          this.eamcardlist.setListData([]);
        }
        this.loading = false;
      }).finally(() => { this.loading = false; })
    }
  }
}
