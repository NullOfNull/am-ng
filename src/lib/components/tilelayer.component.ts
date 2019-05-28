import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'

import { MapService } from '../providers/mapService'
import { BTileLayer, TileLayerOptions, getTilesUrlFunc } from '../types/TileLayer'
import { BPixel } from '../types/Pixel'

@Directive({
  selector: 'tilelayer'
})
export class TileLayerComponent implements OnInit, OnDestroy {
  @Input()
  private getTilesUrl: getTilesUrlFunc
  @Input()
  private options: TileLayerOptions

  @Output()
  private loaded = new EventEmitter()

  private tilelayer: BTileLayer

  constructor(private _service: MapService) {}

  public ngOnInit() {
    const func = this.getTilesUrl

    this._service
      .addTileLayer(() => {
        this.tilelayer = new window.BMap.TileLayer(this.options)

        if (this.getTilesUrl) {
          this.tilelayer.getTilesUrl = function(tileCoord: BPixel, zoom: number) {
            return func(tileCoord, zoom)
          }
        }
        return this.tilelayer
      })
      .then(() => {
        this.loaded.emit(this.tilelayer)
      })
  }

  public ngOnDestroy() {
    this._service.removeTileLayer(this.tilelayer)
  }
}
