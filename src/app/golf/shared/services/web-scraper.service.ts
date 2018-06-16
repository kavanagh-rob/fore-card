import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { CourseSearchTypeEnum } from '../../models/courseSearchTypeEnum';

@Injectable()
export class WebScraperService {
  constructor(private http: HttpClient) {}

  extractData(res: any) {
    const body = res.data;
    return body || {};
  }
  handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  searchCourses(searchType: CourseSearchTypeEnum, searchValue) {
    return this.http.get(`${environment.scrapeUrl}?to=10&from=0&` + searchType + '=' + searchValue)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

}
