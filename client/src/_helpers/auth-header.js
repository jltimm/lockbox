import { authenticationService } from '../services/authentication-service';

/**
 * Return authorization header with jwt token
 */
export function authHeader() {
  const currentUser = authenticationService.currentUserValue;
  if (currentUser && currentUser.token) {
      return { Authorization: `Bearer ${currentUser.token}` };
  } else {
      return {};
  }
}