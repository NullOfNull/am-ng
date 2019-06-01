import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapMainComponent } from './mapmain/mapmain.component';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { AmcardComponent } from './amcard/amcard.component';
import { AmcardlistComponent } from './amcardlist/amcardlist.component';
import { BaiduMapModule } from '../../lib';
import { QueryListComponent } from '../components/query-list/query-list.component';



registerLocaleData(zh);

@NgModule({
  declarations: [MapMainComponent, AmcardComponent, AmcardlistComponent, QueryListComponent],
  imports: [
    CommonModule,
    BaiduMapModule.forRoot({ ak: 'KiUMBStys8zb5pX1XKOrrA5q6k9msNFR' }),
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  exports: [MapMainComponent],
})
export class AmmapModule { }
