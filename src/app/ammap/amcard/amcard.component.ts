import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'eam-amcard',
  templateUrl: './amcard.component.html',
  styleUrls: ['./amcard.component.css']
})
export class AmcardComponent implements OnInit {
  @Input() data: any = {};
  constructor() { }

  ngOnInit() {
  }

}
