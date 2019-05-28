import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'

import { MapService } from '../providers/mapService'
import { BTrafficLayer, TrafficLayerOptions } from '../types/TrafficLayer'

@Directive({
  selector: 'trafficlayer'
})
export class TrafficLayerComponent implements OnInit, OnDestroy {
  @Input()
  private options: TrafficLayerOptions

  @Output()
  private loaded = new EventEmitter()

  private trafficlayer: BTrafficLayer

  constructor(private _service: MapService) {}

  public ngOnInit() {
    this._service
      .addTileLayer(() => {
        this.trafficlayer = new window.BMap.TrafficLayer(this.options)
        return this.trafficlayer
      })
      .then(() => {
        this.loaded.emit(this.trafficlayer)
      })
  }

  public ngOnDestroy() {
    this._service.removeTileLayer(this.trafficlayer)
  }
}
