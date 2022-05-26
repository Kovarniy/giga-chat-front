import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private configuration: any = {};

  constructor() { }

  getValue(key: string, defaultValue?: string): any {
    return this.configuration[key] || defaultValue;
  }

}
