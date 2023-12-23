import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });

    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should search', () => {
    const mockResponse = { data: 'Test data' };

    service.search('test').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service.baseUrl + 'products?search=test');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});