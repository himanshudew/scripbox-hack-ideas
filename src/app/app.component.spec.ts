import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'scripbox-hack-ideas'`, () => {
    expect(component.title).toEqual('scripbox-hack-ideas');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('scripbox-hack-ideas');
  });

  it('#ngOnint() user not logged in', () => {
    component.ngOnInit();
    expect(component.isUserLoggedIn).toBeFalse();
  });

  it('#ngOnint() user logged in', () => {
    component.ngOnInit();
    component.isUserLoggedIn = true;
    fixture.detectChanges();
    expect(component.isUserLoggedIn).toBeTrue();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.btn').textContent).toContain('LogOut');
  });
});
