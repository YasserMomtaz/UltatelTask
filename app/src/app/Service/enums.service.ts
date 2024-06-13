import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {

  private genders = ['Male', 'Female'];
  private countries = ['USA','Egypt', 'Canada', 'UK', 'Australia','Germany'];
  constructor() { }
  getGenders() : string[] {
    return this.genders
  }
  getCountries() : string[] {
    return this.countries
  }
}
