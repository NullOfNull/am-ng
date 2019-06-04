import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange
} from '@angular/core'

import { nullCheck } from '../helpers/validate'
import { isUndefined } from '../helpers/object'
import { toMarkerClustererOptions, toPoint, toMarkerOptions, toTextIconStyle } from '../helpers/transformer'
import { MapService } from '../providers/mapService'
import { MarkerClustererOptions, BMarkerClusterer } from '../types/MarkerClusterer'
import { ScriptLoader } from '../providers/scriptLoader'
import { BMapInstance } from '../types/Map'
import { BMarker } from '../types/Marker';
import { BPoint } from '../types/Point';

const LIB_URLS = {
  key: 'markerClusterer',
  scripts: [
    '/cwbase/web/amweb/am-map/assets/MarkerCluster.js',
    'https://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js'
  ]
}

@Directive({
  selector: 'marker-clusterer'
})
export class MarkerClustererComponent implements OnInit, OnChanges, OnDestroy {
  @Input() private options: MarkerClustererOptions

  @Output() private loaded = new EventEmitter()
  @Output() private markerClick = new EventEmitter();
  private markerClusterer: BMarkerClusterer

  constructor(private _service: MapService, private scriptLoader: ScriptLoader) { }

  public ngOnInit() {
    nullCheck(this.options, 'options is required for <marker-clusterer>')

    this._service.getNativeMap().then((map: BMapInstance) => {
      return this.scriptLoader.load(LIB_URLS, false, () => {
        this.markerClusterer = new window.BMapLib.MarkerClusterer(map, toMarkerClustererOptions(this.options))

        this.loaded.emit(this.markerClusterer)
      })
    })
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes.options && !changes.options.isFirstChange()) {
      this.resetOptions(changes.options.currentValue)
    }
  }

  private resetOptions(options: MarkerClustererOptions) {
    if (!this.markerClusterer) return;//修复由于ngonit中异步加载的脚本可能导致此处执行时markerClusterer为空
    if (!isUndefined(options.girdSize)) {
      this.markerClusterer.setGridSize(options.girdSize)
    }
    if (!isUndefined(options.maxZoom)) {
      this.markerClusterer.setMaxZoom(options.maxZoom)
    }
    if (options.styles) {
      this.markerClusterer.setStyles(options.styles.filter(s => s).map(s => toTextIconStyle(s)))
    }
    if (options.markers) {
      this.markerClusterer.clearMarkers()
      let points: Array<BPoint> = [];
      this.markerClusterer.addMarkers(
        options.markers.map(m => {
          points.push(toPoint(m.point));
          let marker: BMarker = new window.BMap.Marker(toPoint(m.point), toMarkerOptions(m.options));
          if (m.options.extData) {
            marker['extData'] = m.options.extData;
          }
          this.addListener(marker);
          return marker;
        })
      )
      this._service.setZoom(points);
    }

  }
  private addListener(marker: BMarker) {
    marker.addEventListener('click', (e: any) => {
      this.markerClick.emit({
        e,
        marker
      })
    })
  }
  public ngOnDestroy() {
    this.markerClusterer.clearMarkers()
  }
}
