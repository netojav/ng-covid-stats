import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CovidStatsService } from '@app/statistics/services/covid-stats.service';
import { CountryStatsItem } from '@app/statistics/types/country-stats-item';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs/operators';

interface CountryStatsState {
  searchTerm: string;
  loading: boolean;
  country: CountryStatsItem;
}
@Injectable()
export class CountryStatsStore extends ComponentStore<CountryStatsState> {
  searchTerm$ = this.select(state => state.searchTerm);
  countryStats$ = this.select(state => state.country);
  loading$ = this.select(state => state.loading);

  setSearchTerm = this.updater((state, searchTerm: string) => ({
    ...state,
    searchTerm
  }));

  filterStatsByCountryName = this.effect((action$: Observable<string>) =>
    action$.pipe(
      filter(searchTerm => !!searchTerm),
      switchMap(searchTerm => {
        return this.router.navigate(['/', 'statistics'], {
          queryParams: {
            searchTerm: encodeURIComponent(searchTerm)
          }
        });
      })
    )
  );

  loadCountryStats = this.effect((action$: Observable<null>) =>
    action$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.activatedRoute.paramMap),
      tap(([, params]) => console.log(params.get('country'))),
      switchMap(([, params]) =>
        this.covidStatsService.getStatistics(params.get('country')).pipe(
          tapResponse(
            response => {
              if (response.length > 0) {
                return this.patchState({
                  country: response[0],
                  loading: false
                });
              }
              return this.router.navigate(['/', 'not-found']);
            },
            error => {
              return this.router.navigate(['/', 'not-found']);
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
    super({
      searchTerm: null,
      loading: false,
      country: null
    });

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        const navigation = router.getCurrentNavigation();
        this.setSearchTerm(navigation.extras.state?.['searchTerm']);
      });
  }
}
