import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginComponent],
      providers: [FormBuilder]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
    spyOn(authService,'login').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update userid from form changes and loginForm valid true', fakeAsync(() => {
    component.loginForm.controls['userid'].setValue('admin');
    expect(component.form.userid.value).toEqual('admin');
    expect(component.loginForm.invalid).toBeFalse();
  }));

  it('if userid is empty, loginForm valid to be false', fakeAsync(() => {
    component.loginForm.controls['userid'].setValue('');
    expect(component.loginForm.invalid).toBeTrue();
  }));

  it('#login when userid is empty', () => {
    component.loginForm.controls['userid'].setValue('');
    component.login();
    expect(component.message).toBe('Please input your userid.');
  });

  it('#login when userid is notadmin', () => {
    component.loginForm.controls['userid'].setValue('notadmin');
    component.login();
    expect(component.message).toBe('Please check your userid.');
  });

  it('#login when userid is admin', () => {
    component.loginForm.controls['userid'].setValue('admin');
    component.login();
    expect(authService.login).toHaveBeenCalledWith('admin');
  });
});
