import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { unSluglify } from '@shared/utils';
import { CountryStatsItem } from '@app/statistics/types/country-stats-item';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-countries-stats-list',
  template: `
    <div
      *ngIf="isEmpty(countriesByContinents); else countryList"
      fxLayout="column"
      fxLayoutAlign="center center"
      class="error-message"
    >
      <h3>No Countries stats were found with your search criteria :(</h3>
    </div>
    <ng-template #countryList>
      <div fxLayout="column" fxLayoutGap="20px">
        <div fxLayout="row" fxLayoutAlign="end center">
          <button
            [matTooltip]="expanded ? 'Collapse All' : 'Expand All'"
            mat-mini-fab
            color="accent"
            (click)="onToggleAccordion()"
          >
            <mat-icon>
              {{ expanded ? 'unfold_less' : 'unfold_more' }}
            </mat-icon>
          </button>
        </div>
        <mat-accordion multi>
          <mat-expansion-panel
            expanded
            *ngFor="let continent of countriesByContinents | keyvalue"
          >
            <mat-expansion-panel-header>
              <mat-panel-title>
                {{ unSluglify(continent.key) }}
              </mat-panel-title>
            </mat-expansion-panel-header>
            <mat-list>
              <a
                mat-list-item
                [routerLink]="['country', country.country]"
                [state]="{ searchTerm: searchTerm }"
                class="country-item"
                *ngFor="let country of continent.value"
              >
                <mat-icon matListIcon>flag</mat-icon>

                <h3 matLine>{{ unSluglify(country.country) }}</h3>

                <p matLine>
                  <span>
                    Total Cases: {{ country.cases?.total ?? 0 | number }}
                  </span>
                  <span>
                    | Population:
                    {{ (country.population | number) ?? 'No data' }}
                  </span>
                  <span>
                    | Updated On: {{ country.time | date: 'MM/dd/YYYY HH:mm' }}
                  </span>
                </p>
              </a>
            </mat-list>
          </mat-expansion-panel>
        </mat-accordion>
      </div>
    </ng-template>
  `,
  styleUrls: ['./countries-stats-list.component.scss']
})
export class CountriesStatsListComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  @Input() countriesByContinents: { [continent: string]: CountryStatsItem[] };
  @Input() searchTerm: string;

  expanded = true;

  isEmpty = isEmpty;

  unSluglify = unSluglify;

  constructor() {}

  ngOnInit() {}

  onToggleAccordion() {
    if (this.expanded) {
      this.accordion.closeAll();
    } else {
      this.accordion.openAll();
    }
    this.expanded = !this.expanded;
  }
}
