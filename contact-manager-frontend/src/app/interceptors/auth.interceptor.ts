import { HttpInterceptorFn } from '@angular/common/http';

// Intercepts HTTP requests to add the Authorization header if a token exists
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    // Clone the request and add the Authorization header
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // Pass the request as is if no token is found
  return next(req);
};
