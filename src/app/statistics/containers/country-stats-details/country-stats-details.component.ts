import { Component, OnInit } from '@angular/core';
import { unSluglify } from '@app/@shared/utils';
import { CountryStatsStore } from './store';

@Component({
  selector: 'app-country-stats-details-container',
  template: `
    <mat-card class="container mat-elevation-z0">
      <p>
        <img class="logo" src="assets/logo.png" alt="covid-19 logo" />
      </p>

      <mat-card-content>
        <div fxLayout="column" fxLayoutGap="10px">
          <app-search-box
            [searchTerm]="store.searchTerm$ | async"
            (searchChange)="store.filterStatsByCountryName($event)"
          ></app-search-box>
          <app-loader
            *ngIf="store.loading$ | async; else countryDetails"
            [size]="1.5"
            message="Loading country statistics..."
          ></app-loader>
          <ng-template #countryDetails>
            <ng-container *ngIf="store.countryStats$ | async as countryStats">
              <mat-card-title
                >Statistics for {{ unSluglify(countryStats.country) }} about
                COVID-19 updated on
                {{ countryStats.time | date: 'MM/dd/YYYY HH:mm' }}
              </mat-card-title>
              <app-country-stats-card
                [countryStats]="countryStats"
              ></app-country-stats-card>
            </ng-container>
          </ng-template>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./country-stats-details.component.scss'],
  providers: [CountryStatsStore]
})
export class CountryStatsDetailsComponent implements OnInit {
  unSluglify = unSluglify;
  constructor(public store: CountryStatsStore) {}
  ngOnInit(): void {
    this.store.loadCountryStats();
  }
}
