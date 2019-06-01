import { BMarker, Marker } from './Marker'
import { BTextIconStyle, TextIconStyle } from './TextIconOverlay'
import { BMapInstance } from './Map'
import { BPoint } from './Point';

export interface BMarkerClustererConstructor {
  new(map: BMapInstance, options?: BMarkerClustererOptions): BMarkerClusterer
}

export interface BMarkerClusterer {
  addMarker(marker: BMarker): void
  addMarkers(markers: Array<BMarker>): void
  clearMarkers(): void
  getClustersCount(): number
  getGridSize(): number
  getMap(): BMapInstance
  getMarkers(): Array<BMarker>
  getMaxZoom(): number
  getMinClusterSize(): number
  getStyles(): Array<BTextIconStyle>
  isAverageCenter(): boolean
  removeMarker(marker: BMarker): boolean
  removeMarkers(markers: Array<BMarker>): boolean
  setGridSize(gridSize: number): void
  setMaxZoom(maxZoom: number): void
  setMinClusterSize(size: number): void
  setStyles(styles: Array<BTextIconStyle>): void
  getClusters(): Array<BCluster>
  setUpdateTextFunc(func: Function): void
}
export interface BCluster {
  isMarkerInCluster(marker: BMarker): boolean
  isReal(): boolean
  getCenter(): BPoint
}
export interface BMarkerClustererOptions {
  markers?: Array<BMarker>
  girdSize?: number
  maxZoom?: number
  minClusterSize?: number
  isAverangeCenter?: boolean
  styles?: Array<BTextIconStyle>
  updateText?: Function
}

export interface MarkerClustererOptions {
  markers?: Array<Marker>
  girdSize?: number
  maxZoom?: number
  minClusterSize?: number
  isAverangeCenter?: boolean
  styles?: Array<TextIconStyle>
  updateText?: Function
}
