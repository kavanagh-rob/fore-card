import { TestBed, inject } from '@angular/core/testing';

import { WebScraperService } from './web-scraper.service';

describe('WebScraperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebScraperService]
    });
  });

  it('should be created', inject([WebScraperService], (service: WebScraperService) => {
    expect(service).toBeTruthy();
  }));
});
