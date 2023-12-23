import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { PLATFORM_ID } from '@angular/core';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService, { provide: PLATFORM_ID, useValue: 'browser' }]
    });

    service = TestBed.inject(StorageService);
  });

  it('should set item', () => {
    const spy = spyOn(localStorage, 'setItem');
    service.setItem('test', 'data');
    expect(spy).toHaveBeenCalledWith('test', 'data');
  });

  it('should get item', () => {
    const spy = spyOn(localStorage, 'getItem').and.returnValue('data');
    const result = service.getItem('test');
    expect(spy).toHaveBeenCalledWith('test');
    expect(result).toBe('data');
  });

  it('should remove item', () => {
    const spy = spyOn(localStorage, 'removeItem');
    service.removeItem('test');
    expect(spy).toHaveBeenCalledWith('test');
  });
});