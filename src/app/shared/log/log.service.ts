import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LogService {
  constructor (
    private http: Http
  ) {}

  getLog() {
    return this.http.get(`/getlogs/`)
    .map((res:Response) => res.json());
  }

}