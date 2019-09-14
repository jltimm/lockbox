import { authenticationService } from '../services/authentication-service';

/**
 * Handles a response.
 * 
 * Check if the response is OK, and if it is not, then send
 * the appropriate message
 * 
 * @param {JSON} response The response 
 */
export function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        authenticationService.logout();
        window.location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
  });
}