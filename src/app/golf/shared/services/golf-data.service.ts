import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class GolfDataService {
  constructor(private http: HttpClient) {}

  extractData(res: any) {
    const body = res.data;
    return body || {};
  }
  handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }


  getGolfCourse() {
    return this.http.post(`${environment.apiUrl}/getCourse`, '')
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  putPlayer(data: any) {
    return this.http.put(`${environment.apiUrl}/golfer`, data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
}
