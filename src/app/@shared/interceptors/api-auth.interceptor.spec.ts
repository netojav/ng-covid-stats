import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { ApiAuthInterceptor } from './api-auth.interceptor';

describe('ApiPrefixInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiAuthInterceptor,
          multi: true
        }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add X-RapidAPI headers to request', () => {
    http.get('/toto').subscribe();

    const httpRequest = httpMock.expectOne('/toto');

    expect(httpRequest.request.headers.has('X-RapidAPI-Key')).toBeTruthy();
    expect(httpRequest.request.headers.has('X-RapidAPI-Host')).toBeTruthy();

    expect(httpRequest.request.headers.get('X-RapidAPI-Key')).toBe(
      environment.key
    );
    expect(httpRequest.request.headers.get('X-RapidAPI-Host')).toBe(
      environment.host
    );
  });
});
