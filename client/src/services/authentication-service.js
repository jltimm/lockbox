import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../_helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
  login,
  register,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue () { return currentUserSubject.value }
};

/**
 * Sends a post request to the server, registering the user
 * 
 * @param {string} email The email 
 * @param {string} password The password
 */
function register(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    return fetch(`/api/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        })
}

/**
 * Sends a post request to the server, logging the user in
 * 
 * @param {string} email The email
 * @param {string} password The password
 */
function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    return fetch(`/api/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

/**
 * Logs the user out
 */
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}