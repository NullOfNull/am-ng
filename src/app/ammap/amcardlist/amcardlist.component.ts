import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eam-amcardlist',
  templateUrl: './amcardlist.component.html',
  styleUrls: ['./amcardlist.component.css']
})
export class AmcardlistComponent implements OnInit {

  constructor() { }
  data = [
    {
      title: 'Title 1'
    },
    {
      title: 'Title 2'
    },
    {
      title: 'Title 3'
    },
    {
      title: 'Title 4'
    }
  ];
  ngOnInit() {
  }

}
