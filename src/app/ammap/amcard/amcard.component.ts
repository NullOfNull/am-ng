import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CardInfo } from 'src/app/types/enity';

@Component({
  selector: 'eam-amcard',
  templateUrl: './amcard.component.html',
  styleUrls: ['./amcard.component.css']
})
export class AmcardComponent implements OnInit {
  @Output() itemClick = new EventEmitter();
  @Input() data: CardInfo;
  constructor() { }

  ngOnInit() {
  }
  onLocationClick(e) {
    this.itemClick.emit({
      event: e,
      data: this.data
    });
  }
}
