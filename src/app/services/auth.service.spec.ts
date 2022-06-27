import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login', () => {
    spyOn(service, 'setLoginData');
    service.login('admin');
    expect(service.setLoginData).toHaveBeenCalledWith('admin', true);
  });

  it('logout', () => {
    spyOn(service, 'setLoginData');
    service.logout();
    expect(service.setLoginData).toHaveBeenCalledWith('', false);
  });

  it('isLoggedIn true', () => {
    service.login('admin');
    expect(localStorage.getItem('isLoggedIn')).toBe('true');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('isLoggedIn false', () => {
    service.logout();
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('setLoginData', () => {
    service.setLoginData('admin', true);
    service.getUserId.subscribe(res => {
      expect(res).toBe('admin');
    });
    service.isUserLoggedIn.subscribe(res => {
      expect(res).toBe(true);
    })
  });
});
