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

import { isNull, isUndefined } from '../helpers/object'
import { toPoints } from '../helpers/transformer'
import { nullCheck } from '../helpers/validate'
import { MapService } from '../providers/mapService'
import { BPolyline, PolylineOptions } from '../types/Polyline'
import { Point } from '../types/Point'

@Directive({
  selector: 'polyline'
})
export class PolylineComponent implements OnInit, OnChanges, OnDestroy {
  @Input() private points: Array<Point>
  @Input() private options: PolylineOptions

  @Output() private loaded = new EventEmitter()

  private polyline: BPolyline

  constructor(private _service: MapService) {}

  public ngOnInit() {
    nullCheck(this.points, 'points is required for <polyline>')

    this._service
      .addOverlay(() => {
        return (this.polyline = new window.BMap.Polyline(toPoints(this.points), this.options))
      })
      .then(() => {
        this.loaded.emit(this.polyline)
      })
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes.points && !changes.points.isFirstChange()) {
      this.polyline.setPath(toPoints(changes.points.currentValue))
    }
    if (changes.options && !changes.options.isFirstChange()) {
      this.setOptions(changes.options.currentValue)
    }
  }

  public ngOnDestroy() {
    this._service.removeOverlay(this.polyline)
  }

  private setOptions(options: PolylineOptions): void {
    if (isNull(options)) {
      return
    }
    if (!isUndefined(options.enableEditing)) {
      if (options.enableEditing) {
        this.polyline.enableEditing()
      } else {
        this.polyline.disableEditing()
      }
    }
    if (!isUndefined(options.enableMassClear)) {
      if (options.enableEditing) {
        this.polyline.enableMassClear()
      } else {
        this.polyline.disableMassClear()
      }
    }
    if (!isUndefined(options.strokeColor)) {
      this.polyline.setStrokeColor(options.strokeColor)
    }
    if (!isUndefined(options.strokeOpacity)) {
      this.polyline.setStrokeOpacity(options.strokeOpacity)
    }
    if (!isUndefined(options.strokeStyle)) {
      this.polyline.setStrokeStyle(options.strokeStyle)
    }
    if (!isUndefined(options.strokeWeight)) {
      this.polyline.setStrokeWeight(options.strokeWeight)
    }
  }
}
