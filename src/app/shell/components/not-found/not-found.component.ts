import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: `
    <div fxLayout="row" fxLayoutAlign="center center">
      <div>
        <mat-card class="container">
          <mat-card-title class="text-upper">Item not found</mat-card-title>
          <mat-card-content>
            <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="10px">
              <mat-icon>warning</mat-icon>
              <p>
                The item does not exist. It may have been deleted. To visit the
                previous page, hit the "Back to home" button.
              </p>
            </div>
          </mat-card-content>
          <mat-card-footer>
            <button mat-raised-button color="primary" (click)="onBack()">
              Back to home
            </button>
          </mat-card-footer>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(private router: Router) {}
  onBack() {
    this.router.navigate(['/', 'statistics']);
  }
}
