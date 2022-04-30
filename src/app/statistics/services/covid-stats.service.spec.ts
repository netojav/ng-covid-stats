import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CovidStatsService } from './covid-stats.service';
import {
  CountryStatsItem,
  CovidStatisticsResponse
} from '../types/country-stats-item';

describe('CovidStatsService', () => {
  let covidStatsService: CovidStatsService;
  let httpMock: HttpTestingController;
  const countryStats = [
    {
      continent: 'continent-1',
      country: 'country-1',
      population: 100000,
      cases: {
        new: null,
        active: 10,
        critical: null,
        recovered: 1000,
        '1M_pop': '2732',
        total: 2000
      },
      deaths: {
        new: null,
        '1M_pop': '33',
        total: 225
      },
      tests: {
        '1M_pop': null,
        total: 300
      },
      day: '2022-04-28',
      time: '2022-04-28T17:00:06+00:00'
    },
    {
      continent: 'continent-2',
      country: 'country-2',
      population: 100000,
      cases: {
        new: null,
        active: 10,
        critical: null,
        recovered: 1000,
        '1M_pop': '2732',
        total: 2000
      },
      deaths: {
        new: null,
        '1M_pop': '33',
        total: 225
      },
      tests: {
        '1M_pop': '10',
        total: 200
      },
      day: '2022-04-28',
      time: '2022-04-28T17:00:06+00:00'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CovidStatsService]
    });

    covidStatsService = TestBed.inject(CovidStatsService);
    httpMock = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getStatistics', () => {
    it('should return covid 19 statistics', () => {
      // Arrange
      const mockResponse: CovidStatisticsResponse = {
        response: [...countryStats]
      };

      const expectResult = mockResponse.response.map(
        (_) =>
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
      );

      // Act
      const statistics$ = covidStatsService.getStatistics();

      // Assert
      statistics$.subscribe((response) => {
        expect(response).toEqual(expectResult);
      });
      httpMock.expectOne({}).flush(mockResponse);
    });

    it('should return a single item when specify a country name', () => {
      const mockResponse: CovidStatisticsResponse = {
        response: [countryStats[0]]
      };

      // Act
      const statistics$ = covidStatsService.getStatistics('country-1');

      // Assert
      statistics$.subscribe((response) => {
        expect(response).toHaveSize(1);
      });
      httpMock.expectOne({}).flush(mockResponse);
    });
  });
});
