import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() {
  }

  public get(key: string): any | string {
    if (key.includes(':')) {
      const keys = key.split(':');

      const primaryKey = keys[0];
      const secondaryKey = keys[1];

      const object = JSON.parse(localStorage.getItem(primaryKey));

      if (typeof object !== 'undefined' && object != null) {
        if (typeof object[secondaryKey] !== 'undefined' && object[secondaryKey] != null) {
          try {
            return JSON.parse(object[secondaryKey]);
          } catch (error) {
            return object[secondaryKey];
          }
        }
      } else {
        return null;
      }
    } else {
      const object = JSON.parse(localStorage.getItem(key));
      if (typeof object != 'undefined' && object != null) {
        try {
          return JSON.parse(localStorage.getItem(key));
        } catch (error) {
          return localStorage.getItem(key);
        }
      }
      return null;
    }
  }

  public put(key: string, value: any): void {
    if (key.includes(':')) {
      const keys = key.split(':');

      const primaryKey = keys[0];
      const secondaryKey = keys[1];

      let object = JSON.parse(localStorage.getItem(primaryKey));

      if (typeof object !== 'undefined' && object != null) {
        object[secondaryKey] = value;
        localStorage.setItem(primaryKey, JSON.stringify(object));
      } else {
        object = {};
        object[secondaryKey] = value;
        localStorage.setItem(primaryKey, JSON.stringify(object));
      }
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        localStorage.setItem(key, value);
      }
    }
  }

}
