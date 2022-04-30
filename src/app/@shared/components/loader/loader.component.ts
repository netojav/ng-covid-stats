import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <mat-progress-spinner
        mode="indeterminate"
        [strokeWidth]="2"
        [diameter]="32 * size"
      ></mat-progress-spinner>
      <span class="message">{{ message }}</span>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() size = 1;
  @Input() message: string;

  constructor() {}

  ngOnInit() {}
}
