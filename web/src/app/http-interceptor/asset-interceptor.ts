// tslint:disable:no-any

declare var require: any;

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

const { readFileSync, existsSync, readJsonSync } = require('fs-extra');
const { resolve } = require('path');

@Injectable()
export class AssetInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    for (const dir of ['web/src', 'public']) {
      const path = resolve(dir, req.url.slice(1));
      if (existsSync(path)) {
        return of(
          new HttpResponse<any>({
            body: path.endsWith('.json')
              ? readJsonSync(path)
              : readFileSync(path).toString(),
            status: 200,
            statusText: 'OK',
            url: req.url,
          }),
        );
      }
    }

    return of(
      new HttpResponse<any>({
        body: '',
        status: 404,
        statusText: 'Not Found',
        url: req.url,
      }),
    );
  }
}
