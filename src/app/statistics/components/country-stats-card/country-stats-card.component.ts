import { Component, Input } from '@angular/core';
import { CountryStatsItem } from '@app/statistics/types/country-stats-item';

@Component({
  selector: 'app-country-stats-card',
  template: `
    <div fxLayout="row" fxLayoutAlign="start start" fxLayoutGap="10px">
      <mat-card fxFlex="33%">
        <mat-card-title>Cases</mat-card-title>
        <mat-card-content>
          <mat-list>
            <mat-list-item>
              News: {{ (countryStats.cases?.new | number) ?? 'No data' }}
            </mat-list-item>
            <mat-list-item>
              Active: {{ (countryStats.cases?.active | number) ?? 'No data' }}
            </mat-list-item>
            <mat-list-item>
              Critical:
              {{ (countryStats.cases?.critical | number) ?? 'No data' }}
            </mat-list-item>
            <mat-list-item>
              Recovered:
              {{ (countryStats.cases?.recovered | number) ?? 'No data' }}
            </mat-list-item>
            <mat-list-item>
              per million:
              {{ (countryStats.cases?.oneMilPop | number) ?? 'No data' }}
            </mat-list-item>
            <mat-list-item>
              Total: {{ (countryStats.cases?.total | number) ?? 'No data' }}
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
      <mat-card fxFlex="33%">
        <mat-card-title>Deaths</mat-card-title>
        <mat-card-content>
          <mat-list>
            <mat-list-item>
              News: {{ (countryStats.deaths?.new | number) ?? 'No data' }}
            </mat-list-item>
            <mat-list-item>
              per million:
              {{ (countryStats.deaths?.oneMilPop | number) ?? 'No data' }}
            </mat-list-item>
            <mat-list-item>
              Total: {{ (countryStats.deaths?.total | number) ?? 'No data' }}
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
      <mat-card fxFlex="33%">
        <mat-card-title>Tests</mat-card-title>
        <mat-card-content>
          <mat-list>
            <mat-list-item>
              per million:
              {{ (countryStats.tests?.oneMilPop | number) ?? 'No data' }}
            </mat-list-item>
            <mat-list-item>
              Total: {{ (countryStats.tests?.total | number) ?? 'No data' }}
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class CountryStatsCardComponent {
  @Input() countryStats: CountryStatsItem;
}
