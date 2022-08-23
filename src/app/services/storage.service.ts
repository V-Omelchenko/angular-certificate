import { Injectable } from '@angular/core';
import {StorageType} from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getItem(key: StorageType): string {
    return localStorage.getItem(key);
  }

  setItem(key: StorageType, value: string) {
    localStorage.setItem(key, value);
  }

  deleteItem(key: StorageType) {
    localStorage.removeItem(key);
  }
}
