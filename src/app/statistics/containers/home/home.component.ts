import { Component, OnInit } from '@angular/core';
import { HomeStore } from './store';

@Component({
  selector: 'app-home-container',
  template: `
    <mat-card class="container mat-elevation-z0">
      <p>
        <img class="logo" src="assets/logo.png" alt="covid-19 logo" />
      </p>
      <mat-card-title
        >Statistics for all countries about COVID-19</mat-card-title
      >
      <mat-card-content>
        <div fxLayout="column" fxLayoutGap="10px">
          <app-search-box
            [searchTerm]="store.searchTerm$ | async"
            (searchChange)="store.filterStatsByCountryName($event)"
          ></app-search-box>

          <app-loader
            *ngIf="store.loading$ | async; else statsList"
            [size]="1.5"
            message="Loading countries statistics..."
          ></app-loader>
          <ng-template #statsList>
            <app-countries-stats-list
              [countriesByContinents]="store.countries$ | async"
              [searchTerm]="store.searchTerm$ | async"
            ></app-countries-stats-list>
          </ng-template>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./home.component.scss'],
  providers: [HomeStore]
})
export class HomeComponent implements OnInit {
  constructor(public store: HomeStore) {}
  ngOnInit(): void {
    this.store.loadCountriesStats();
  }
}
