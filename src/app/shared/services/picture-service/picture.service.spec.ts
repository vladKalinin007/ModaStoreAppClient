import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PictureService } from './picture.service';
import { TestBed } from '@angular/core/testing';

describe('PictureService', () => {
  let service: PictureService;
  let httpMock: HttpTestingController;
  let mockPictures: string[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PictureService]
    });

    service = TestBed.inject(PictureService);
    httpMock = TestBed.inject(HttpTestingController);

    mockPictures = ['picture1.jpg', 'picture2.jpg', 'picture3.jpg'];
  });

  it('should get carousel pictures', () => {
    service.getCarouselPictures();

    service.carouselPictures$.subscribe(pictures => {
      expect(pictures).toEqual(mockPictures);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/carousel`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPictures);
  });

  afterEach(() => {
    httpMock.verify();
  });
});