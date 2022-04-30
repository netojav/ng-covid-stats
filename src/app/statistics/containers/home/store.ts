import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { unSluglify } from '@shared/utils';
import { CovidStatsService } from '@app/statistics/services/covid-stats.service';
import { CountryStatsItem } from '@app/statistics/types/country-stats-item';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap, map, tap, withLatestFrom, filter } from 'rxjs/operators';

export interface HomeState {
  searchTerm: string;
  countries: CountryStatsItem[];
  loading: boolean;
}
@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  private searchUriTerm$ = this.select(
    this.activatedRoute.queryParams,
    params => params['searchTerm']
  );
  searchTerm$ = this.select(
    this.searchUriTerm$,
    searchUriTerm => searchUriTerm && decodeURIComponent(searchUriTerm)
  );

  loading$ = this.select(state => state.loading);
  countries$ = this.select(this.searchTerm$, this.state$, (searchTerm, state) =>
    state.countries
      .filter(_ => (_.continent ? _.continent.toLowerCase() !== 'all' : true))
      .filter(_ =>
        !!searchTerm
          ? unSluglify(_.country)
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          : true
      )
      .reduce((groups, country) => {
        const { continent } = country;

        return {
          ...groups,
          [continent ?? 'No-Continent']: [
            ...(groups[continent ?? 'No-Continent'] || []),
            country
          ]
        };
      }, {})
  );

  filterStatsByCountryName = this.effect((action$: Observable<string>) =>
    action$.pipe(
      switchMap(searchTerm => {
        this.patchState({ searchTerm });

        return this.router.navigate([], {
          queryParams: {
            searchTerm: !!searchTerm ? encodeURIComponent(searchTerm) : null
          },
          relativeTo: this.activatedRoute,
          queryParamsHandling: 'merge'
        });
      }),
      withLatestFrom(this.state$),
      filter(([, state]) => state.countries?.length === 0),
      map(_ => this.loadCountriesStats())
    )
  );

  loadCountriesStats = this.effect((action$: Observable<undefined>) =>
    action$.pipe(
      tap(() => this.patchState({ loading: true, countries: [] })),
      switchMap(() =>
        this.covidStatsService.getStatistics().pipe(
          tapResponse(
            countries => {
              this.patchState({ countries, loading: false });
            },
            error => {
              this.patchState({ loading: false });
            }
          )
        )
      )
    )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private covidStatsService: CovidStatsService
  ) {
    super({ searchTerm: null, countries: [], loading: false });
  }
}
