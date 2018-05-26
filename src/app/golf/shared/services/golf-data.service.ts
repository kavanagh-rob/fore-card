import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { GolfSearchRequest } from '../../models/golfSearchRequest';
import {consoleTestResultHandler} from 'tslint/lib/test';

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


  getAllGolfCourses() {
    return this.http.get(`${environment.apiUrl}/course`)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  getAllGolfers() {
    return this.http.get(`${environment.apiUrl}/golfer`)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
  getGolfersForRound(roundId) {
    const request = new GolfSearchRequest(roundId, '');
    return this.http.post(`${environment.apiUrl}/golfer`, request)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  getAllGolfRounds() {
    return this.http.get(`${environment.apiUrl}/round`)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  getGolfRound(roundId) {
    return this.http.get(`${environment.apiUrl}/round/` + roundId)
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

  putCourse(data: any) {
    return this.http.put(`${environment.apiUrl}/course`, data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  putRound(data: any) {
    return this.http.put(`${environment.apiUrl}/round`, data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
  getScorecards(scorecardIds) {
    return this.http.post(`${environment.apiUrl}/scorecard`, scorecardIds)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  getScorecardsForRound(roundId) {
    return this.http.get(`${environment.apiUrl}/scorecard/` + roundId)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  putScorecard(data: any) {
    return this.http.put(`${environment.apiUrl}/scorecard` , data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  updateScorecards(data) {
    return this.http.post(`${environment.apiUrl}/scorecard`, data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  getFlashUpdatesPerRound(roundId) {
    return this.http.get(`${environment.apiUrl}/flashupdate/` + roundId)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  putFlashUpdates(data) {
    return this.http.put(`${environment.apiUrl}/flashupdate`, data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
}
