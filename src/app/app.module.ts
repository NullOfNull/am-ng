import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmmapModule } from './ammap/ammap.module';
import { WindowRef, DocumentRef } from './service/browers-globals';
import { RestGspService } from './service/rest-gsp.service';
import { CommonHelper } from './service/common-helper';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmmapModule,
  ],
  providers: [
    WindowRef,
    DocumentRef,
    RestGspService,
    CommonHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
