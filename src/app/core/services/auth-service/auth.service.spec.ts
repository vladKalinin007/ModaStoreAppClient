import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';


describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user on login', () => {
    const dummyLoginInfo = { username: 'test', password: 'password' };

    service.login(dummyLoginInfo).subscribe(res => {
      expect(res).toEqual(dummyLoginInfo);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}authentication/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyLoginInfo);
  });

  it('should handle error on login', () => {
    const dummyLoginInfo = { username: 'test', password: 'password' };
  
    service.login(dummyLoginInfo).subscribe(res => {
      fail('should have failed with 500 error');
    }, (error: HttpErrorResponse) => {
      expect(error.status).toEqual(500);
    });
  
    const req = httpMock.expectOne(`${environment.apiUrl}authentication/login`);
    expect(req.request.method).toBe('POST');
    req.flush('500 error', { status: 500, statusText: 'Server Error' });
  });

  it('should logout user', () => {
    service.logout().subscribe(res => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.apiUrl}authentication/logout`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});