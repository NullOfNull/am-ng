import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapMainComponent } from './mapmain/mapmain.component';
import { NgxAmapModule } from 'ngx-amap';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { AmcardComponent } from './amcard/amcard.component';
import { AmcardlistComponent } from './amcardlist/amcardlist.component';

registerLocaleData(zh);

@NgModule({
  declarations: [MapMainComponent, AmcardComponent, AmcardlistComponent],
  imports: [
    CommonModule,
    NgxAmapModule.forRoot({
      apiKey: '32768c537be1a88c4fa34c3f92c65db2'
    }),
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  exports: [MapMainComponent],
})
export class AmmapModule { }
