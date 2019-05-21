import { Component, OnInit } from '@angular/core';
import { RestGspService } from './service/rest-gsp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'am-ng';
  _rest: RestGspService;
  constructor(rest: RestGspService) {
    this._rest = rest;
  }
  ngOnInit(): void {
    this._rest.load();

  }
}
