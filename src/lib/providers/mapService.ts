import { Injectable, Inject } from '@angular/core'
import { isBoolean, isNull, omit } from '../helpers/object'
import { nullCheck } from '../helpers/validate'
import { BControl } from '../types/Control'
import { ScriptLoaderConfig } from './scriptLoader'
import { BMapInstance, MapOptions, isMapTypeEnum } from '../types/Map'
import { Overlay } from '../types/Overlay'
import { BTileLayer } from '../types/TileLayer'

import { toPoint } from '../helpers/transformer'

import { ScriptLoader } from './scriptLoader'
import { BPoint } from '../types/Point';

@Injectable()
export class MapService {
  private _config: ScriptLoaderConfig

  private _map: Promise<BMapInstance>
  private _mapResolver: (value: BMapInstance) => void

  constructor(@Inject(ScriptLoaderConfig) config: ScriptLoaderConfig, private _loader: ScriptLoader) {
    nullCheck(config.ak, 'ak must be provided')

    this._config = config

    this._map = new Promise<BMapInstance>((resolve: () => void) => {
      this._mapResolver = resolve
    })
  }

  public createMap(el: HTMLElement, mapOptions: MapOptions): Promise<BMapInstance> {
    const URL = `https://api.map.baidu.com/api?v=3.0&ak=${this._config.ak}&callback=baidumapinit`

    return new Promise(resolve => {
      this._loader.load(URL, true, () => {
        const map = new window.BMap.Map(el, omit(mapOptions, 'mapType'))
        this.setOptions(mapOptions)
        this._mapResolver(map)
        resolve(map)
      })
    })
  }

  public setOptions(opts: MapOptions): void {
    const {
      disableDragging,
      enableScrollWheelZoom,
      disableDoubleClickZoom,
      enableKeyboard,
      enableInertialDragging,
      enableAutoResize,
      enableContinuousZoom,
      disablePinchToZoom
    } = opts

    if (isBoolean(disableDragging)) {
      this._map.then(map => map[(disableDragging ? 'disable' : 'enable') + 'Dragging']())
    }
    if (isBoolean(enableScrollWheelZoom)) {
      this._map.then(map => map[(enableScrollWheelZoom ? 'enable' : 'disable') + 'ScrollWheelZoom']())
    }
    if (isBoolean(enableAutoResize)) {
      this._map.then(map => map[(enableAutoResize ? 'enable' : 'disable') + 'AutoResize']())
    }
    if (isBoolean(disableDoubleClickZoom)) {
      this._map.then(map => map[(disableDoubleClickZoom ? 'disable' : 'enable') + 'DoubleClickZoom']())
    }
    if (isBoolean(enableKeyboard)) {
      this._map.then(map => map[(enableKeyboard ? 'enable' : 'disable') + 'Keyboard']())
    }
    if (isBoolean(enableInertialDragging)) {
      this._map.then(map => map[(enableInertialDragging ? 'enable' : 'disable') + 'InertialDragging']())
    }
    if (isBoolean(enableContinuousZoom)) {
      this._map.then(map => map[(enableContinuousZoom ? 'enable' : 'disable') + 'ContinuousZoom']())
    }
    if (isBoolean(disablePinchToZoom)) {
      this._map.then(map => map[(disablePinchToZoom ? 'disable' : 'enable') + 'PinchToZoom']())
    }
    if (!isNull(opts.cursor)) {
      this._map.then(map => map.setDefaultCursor(opts.cursor))
    }
    if (!isNull(opts.draggingCursor)) {
      this._map.then(map => map.setDraggingCursor(opts.draggingCursor))
    }
    if (!isNull(opts.currentCity)) {
      this._map.then(map => map.setCurrentCity(opts.currentCity))
    }
    if (!isNull(opts.centerAndZoom)) {
      this._map.then(map => {
        map.centerAndZoom(toPoint(opts.centerAndZoom), opts.centerAndZoom.zoom)
      })
    }
    if (!isNull(opts.mapType)) {
      this._map.then(map => {
        const realType = isMapTypeEnum(opts.mapType) ? window[opts.mapType] : opts.mapType
        map.setMapType(realType)
      })
    }
  }

  public addOverlay(cb: (map: BMapInstance) => Overlay): Promise<{ map: BMapInstance; overlay: Overlay }> {
    return this._map.then((map: BMapInstance) => {
      const overlay = cb(map)
      map.addOverlay(overlay)
      return { map, overlay }
    })
  }

  public removeOverlay(overlay: Overlay): Promise<void> {
    return this._map.then((map: BMapInstance) => {
      map.removeOverlay(overlay)
    })
  }

  public addTileLayer(
    cb: (map: BMapInstance) => BTileLayer
  ): Promise<{ map: BMapInstance; tilelayer: BTileLayer }> {
    return this._map.then((map: BMapInstance) => {
      const tilelayer = cb(map)
      map.addTileLayer(tilelayer)
      return { map, tilelayer }
    })
  }

  public removeTileLayer(tilelayer: BTileLayer): Promise<void> {
    return this._map.then((map: BMapInstance) => {
      map.removeOverlay(tilelayer)
    })
  }

  public addControl(cb: (map: BMapInstance) => BControl): Promise<{ map: BMapInstance; control: BControl }> {
    return this._map.then((map: BMapInstance) => {
      const control = cb(map)
      map.addControl(control)
      return { map, control }
    })
  }

  public removeControl(control: BControl): Promise<void> {
    return this._map.then((map: BMapInstance) => {
      map.removeControl(control)
    })
  }

  public getNativeMap(): Promise<BMapInstance> {
    return this._map
  }
  public setZoom(points: Array<BPoint>) {
    if (points.length > 0) {
      var maxLng = points[0].lng;
      var minLng = points[0].lng;
      var maxLat = points[0].lat;
      var minLat = points[0].lat;
      var res;
      for (var i = points.length - 1; i >= 0; i--) {
        res = points[i];
        if (res.lng > maxLng) maxLng = res.lng;
        if (res.lng < minLng) minLng = res.lng;
        if (res.lat > maxLat) maxLat = res.lat;
        if (res.lat < minLat) minLat = res.lat;
      };
      var cenLng = (maxLng + minLng) / 2;
      var cenLat = (maxLat + minLat) / 2;
      this.getZoom(maxLng, minLng, maxLat, minLat).then((e) => {
        e.map.centerAndZoom(new window.BMap.Point(cenLng, cenLat), e.zoom)
      })
      //map.centerAndZoom(new BMap.Point(cenLng, cenLat), zoom);
    } else {
      //没有坐标，显示全中国  
      //map.centerAndZoom(new BMap.Point(103.388611, 35.563611), 5);
    }
  }
  public getZoom(maxLng, minLng, maxLat, minLat): Promise<{ map: BMapInstance; zoom: number }> {
    var zoom = [50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 25000, 50000, 100000, 200000, 500000, 1000000, 2000000]//级别18到3。  
    var pointA = new window.BMap.Point(maxLng, maxLat);  // 创建点坐标A  
    var pointB = new window.BMap.Point(minLng, minLat);  // 创建点坐标B  
    return this._map.then((map: BMapInstance) => {
      let distance: number = parseFloat(map.getDistance(pointA, pointB).toFixed(1));
      for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
        if (zoom[i] - distance > 0) {
          let z = 18 - i + 3
          return { map, zoom: z };//之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。  
        }
      };
    })


  }
}