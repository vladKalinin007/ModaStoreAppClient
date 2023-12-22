import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { of } from 'rxjs';
import { ReviewService } from '../review-service/review.service';
import { IProductReview } from 'src/app/core/models/catalog/product-review';
import { IProduct } from 'src/app/core/models/product';
import { IUser } from 'src/app/core/models/user';
import { IAddress } from 'src/app/core/models/address';
import { ILogin } from 'src/app/core/models/identity/login.interface';
import { IRegister } from 'src/app/core/models/identity/register.interface';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;
  let reviewService: ReviewService;
  let authService: AuthService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService, 
        ReviewService,
        AuthService,
        HttpClient
      ]
    });
    
    httpMock = TestBed.inject(HttpTestingController);
    reviewService = TestBed.inject(ReviewService);
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should register a user successfully and log in', () => {
    const user = {
      displayName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      password: 'password123',
    };

    const registerForm = {
      displayName: user.displayName,
      userName: user.email,
      email: user.email,
      phone: user.phone,
      password: user.password,
    };

    spyOn(httpClient, 'post').and.returnValue(of({})); // Mock the http post request

    spyOn(userService, 'loginUser').and.returnValue(of({
      id: '123',
      email: user.email,
      phone: user.phone,
      displayName: user.displayName,
      token: 'token123'
    })); 

    spyOn(userService, 'getUser').and.returnValue(of({ id: '123', email: user.email, phone: user.phone, displayName: user.displayName, token: 'token123' })); // Mock the getUser method

    userService.registerUser(user).subscribe((response) => {
      expect(response.id).toEqual('123');
      expect(response.email).toEqual(user.email);
      expect(response.phone).toEqual(user.phone);
      expect(response.displayName).toEqual(user.displayName);
      expect(response.token).toEqual('token123');
    });

    expect(httpClient.post).toHaveBeenCalledWith(userService.API_URL, registerForm);
    expect(userService.loginUser).toHaveBeenCalledWith({ email: user.email, password: user.password });
    expect(userService.getUser).toHaveBeenCalled();
  });

  it('should get user', () => {
    const response: IUser = {
      id: 'test-id',
      email: 'test@example.com',
      phone: '1234567890',
      displayName: 'Test User',
      token: 'test-token'
    };
  
    userService.getUser().subscribe(res => {
      expect(res).toEqual(response);
    });
  
    const req = httpMock.expectOne(userService.API_URL);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
  
  it('should update user', () => {
    const user: IUser = {
      id: 'test-id',
      email: 'test@example.com',
      phone: '1234567890',
      displayName: 'Test User',
      token: 'test-token'
    };
  
    userService.updateUser(user).subscribe(res => {
      expect(res).toEqual(user);
    });
  
    const req = httpMock.expectOne(userService.API_URL);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(user);
    req.flush(user);
  });

  it('should get user address', () => {
    const response: IAddress = {
      firstName: 'Test',
      lastName: 'User',
      street: 'Test Street',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345',
    };
  
    userService.getAddress().subscribe(res => {
      expect(res).toEqual(response);
    });
  
    const req = httpMock.expectOne(`${userService.API_URL}/address`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should update user address', () => {
    const address: IAddress = {
      firstName: 'Test',
      lastName: 'User',
      street: 'Test Street',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345',
    };
  
    const response: IAddress = {
      firstName: 'Test',
      lastName: 'User',
      street: 'Test Street',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345',
    };

    userService.updateAddress(address).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${userService.API_URL}/address`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(address);
    req.flush(response);
  });


  it('should add user review', () => {
    const review = {
      id: 'test',
      rating: 5,
      comment: 'Great product!',
      userId: 'test',
      productId: '1',
      createdOnUtc: new Date(),
      productName: 'Product 1',
      userName: 'Test User',
      pictureUrl: 'url',
  } as IProductReview;

  const product: IProduct = {
    id: 'test',
    name: 'Test Product',
    description: 'This is a test product',
    shortDescription: 'Test product',
    price: 100,
    oldPrice: 120,
    specialPrice: 80,
    discountPercentage: 20,
    stockQuantity: 50,
    quantity: 1,
    displayOrder: 1,
    pictureUrl: 'https://example.com/test-product.jpg',
    productType: 'Test Type',
    productBrand: 'Test Brand',
    isBestSeller: false,
    isNew: true,
    category: 'Test Category',
    color: 'Red',
    season: 'Summer',
    material: 'Cotton',
    style: 'Casual',
    pattern: 'Solid',
    occasion: 'Casual',
    sleeve: 'Short Sleeve',
    neckline: 'Round Neck',
    dressLength: 'Short',
    waistline: 'Natural',
    silhouette: 'A-Line',
    decoration: 'None',
    closureType: 'Zipper',
    pantClosureType: 'Button',
    pantLength: 'Short',
    pantStyle: 'Regular',
    fitType: 'Regular',
    colors: [],
    pictures: ['https://example.com/test-product.jpg'],
    productReviews: [],
    sizes: [],
    relatedProducts: [],
    isInWishlist: false
  };

    spyOn(userService, 'addUserReview').and.returnValue(of(review));

    userService.addUserReview(review, product).subscribe(res => {
      expect(res).toEqual(review);
    });
  });

  it('should check if email exists', () => {
    const email = 'test@example.com';

    userService.checkEmailExists(email).subscribe();

    const req = httpMock.expectOne(userService.API_URL + '/check-email-exists/' + email);
    expect(req.request.method).toBe('GET');
  });
});