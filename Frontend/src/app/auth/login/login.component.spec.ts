import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenService } from 'src/app/_services/token.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let tokenService: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    tokenService = jasmine.createSpyObj('TokenService', ['saveToken']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: TokenService, useValue: tokenService }
      ],
      imports: [FormsModule]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear password error', () => {
    component.clearPasswordError();
    expect(component.password_error).toBeNull();
  });

  it('should call login on submit', () => {
    // Arrange
    const mockForm = { email: 'test@test.com', password: 'password123' };
    authService.login.and.returnValue(of({ token: 'mockToken' }));

    // Act
    component.form = mockForm;
    component.onSubmit();

    // Assert
    expect(authService.login).toHaveBeenCalledWith(mockForm);
    expect(tokenService.saveToken).toHaveBeenCalledWith('mockToken');
  });

  it('should handle login error', () => {
    // Arrange
    const mockForm = { email: 'test@test.com', password: 'password123' };
    const mockError = new HttpErrorResponse({ error: { message: 'user doesnt exist (check your email)' } });
    authService.login.and.returnValue(throwError(mockError));

    // Act
    component.form = mockForm;
    component.onSubmit();

    // Assert
    expect(authService.login).toHaveBeenCalledWith(mockForm);
    expect(component.email_error).toEqual('e-mail incorrect');
    expect(tokenService.saveToken).not.toHaveBeenCalled();
  });
});
