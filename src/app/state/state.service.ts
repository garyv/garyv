import { Injectable } from '@angular/core';

@Injectable()
export class StateService {
  static localStorageDetected:boolean;

  static get(key) {
    return StateService.detectLocalStorage()?
           StateService.getLocal(key): 
           StateService.getCookie(key);
  }

  static set(key, value) {
    return StateService.detectLocalStorage()?
           StateService.setLocal(key, value): 
           StateService.setCookie(key, value);
  }

  static getLocal(key):string {
    return localStorage.getItem(key);
  }

  static setLocal(key, value) {
    localStorage.setItem(key, value);
  }

  static getCookie(key) {
    let x = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return x ? x[2] : null;
  }

  static setCookie(key, value) {
    let expires = new Date();
    expires.setTime(expires.getTime() + 9 * 365*24*60*60*1000); 
    document.cookie = key + '=' + value + ';path=/;expires=' + expires.toUTCString();
  }

  static detectLocalStorage() {
    // prevent errors with local storage 
    // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js#L20
    if (typeof StateService.localStorageDetected != 'undefined') {
      return StateService.localStorageDetected;
    }
    if (!window['localStorage']) { 
      return StateService.localStorageDetected = false; 
    }
    let local:string = 'local';
    try {
      localStorage.setItem(local, local);
      localStorage.removeItem(local);
      return StateService.localStorageDetected = true;
    } catch (err) {
      return StateService.localStorageDetected = false;
    }
  }
}
