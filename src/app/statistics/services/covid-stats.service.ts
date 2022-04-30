import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountryStatsItem } from '../types/country-stats-item';
import { environment } from '@env/environment';

@Injectable()
export class CovidStatsService {
  constructor(private httpClient: HttpClient) {}

  getStatistics(country?: string): Observable<CountryStatsItem[]> {
    let endPoint = `/statistics`;

    if (country) {
      endPoint += `?country=${country}`;
    }
    return this.httpClient
      .get<{ response: { [key: string]: any }[] }>(endPoint)
      .pipe(
        map(body =>
          body.response.map(
            _ =>
              ({
                ..._,
                cases: {
                  ..._['cases'],
                  ...(_['cases']?.['1M_pop'] && {
                    oneMilPop: +_['cases']['1M_pop']
                  })
                },
                deaths: {
                  ..._['deaths'],
                  ...(_['deaths']?.['1M_pop'] && {
                    oneMilPop: +_['deaths']['1M_pop']
                  })
                },
                tests: {
                  ..._['tests'],
                  ...(_['tests']?.['1M_pop'] && {
                    oneMilPop: +_['tests']['1M_pop']
                  })
                }
              } as CountryStatsItem)
          )
        )
      );
  }
}
