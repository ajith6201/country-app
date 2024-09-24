// src/app/services/country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'http://localhost:3000/api/countries'; // Update with your Node.js API
  private cache: { [key: string]: any[] } = {}; // Cache object for memoization

  constructor(private http: HttpClient) {}

  getCountries(region: string = '', search: string = '', sort: string = 'asc'): Observable<any[]> {
    let url = `${this.apiUrl}?sort=${sort}`;
    if (region) url += `&region=${region}`;
    if (search) url += `&search=${search}`;
    return this.http.get<any[]>(url);
  }

  // Modify this method to accept page number and size for pagination
  // Fetch paginated countries with memoization
  getCountriesPaginated(page: number, pageSize: number): Observable<any[]> {
    const cacheKey = `${page}-${pageSize}`;

    // Return cached data if available
    if (this.cache[cacheKey]) {
      return of(this.cache[cacheKey]);
    }

    // Fetch data from API and cache it
    const url = `${this.apiUrl}?_page=${page}&_limit=${pageSize}`;
    return this.http.get<any[]>(url).pipe(
      tap((data) => {
        this.cache[cacheKey] = data; // Store data in cache
      })
    );
  }
}
