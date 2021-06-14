import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {

  @Input() message: string = '';
  @Input() title: string = ''

  constructor() { }

  ngOnInit() {}

}
