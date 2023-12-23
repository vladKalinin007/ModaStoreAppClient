import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { ICategory } from 'src/app/core/models/category';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;
  let mockCategory: ICategory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);

    mockCategory = {
      id: 'test-id',
      name: 'Test Category',
      displayOrder: 1,
      pictureUrl: 'test.jpg'
    };
  });

  it('should get categories', (done) => {
    const mockCategories = [mockCategory];
  
    service.getCategories();
  
    service.categories$.subscribe(categories => {
      expect(categories).toEqual(mockCategories);
      done();
    });
  
    const req = httpMock.expectOne(service.BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should get category by id', () => {
    service.getCategoriesById('test-id').subscribe(category => {
      expect(category).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}test-id`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategory);
  });

  it('should create category', () => {
    service.createCategory(mockCategory).subscribe(category => {
      expect(category).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}categories`);
    expect(req.request.method).toBe('POST');
    req.flush(mockCategory);
  });

  it('should update category', () => {
    service.updateCategory(mockCategory).subscribe(category => {
      expect(category).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}categories`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockCategory);
  });

  it('should delete category', () => {
    service.deleteCategory('test-id').subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service.BASE_URL}test-id`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  afterEach(() => {
    httpMock.verify();
  });
});