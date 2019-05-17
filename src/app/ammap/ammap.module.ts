import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapMainComponent } from './mapmain/mapmain.component';
import { NgxAmapModule } from 'ngx-amap';

@NgModule({
  declarations: [MapMainComponent],
  imports: [
    CommonModule,
    NgxAmapModule.forRoot({
      apiKey: '32768c537be1a88c4fa34c3f92c65db2'
    })
  ],
  exports: [MapMainComponent],
})
export class AmmapModule { }
