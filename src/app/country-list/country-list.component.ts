// src/app/country-list/country-list.component.ts
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  providers: [CountryService],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush strategy
})
export class CountryListComponent implements OnInit {
  countries: any[] = [];
  page: number = 1;
  pageSize: number = 20; // Number of countries to load per page
  isLoading: boolean = false;

  constructor(private countryService: CountryService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.countryService.getCountriesPaginated(this.page, this.pageSize).subscribe(
      (data) => {
        this.countries = [...this.countries, ...data]; // Append new countries
        this.isLoading = false;
        this.cdr.markForCheck(); // Manually trigger change detection
      },
      (error) => {
        console.error('Error fetching countries:', error);
        this.isLoading = false;
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max && !this.isLoading) {
      this.page++;
      this.loadCountries(); // Load the next batch of countries
    }
  }

  // src/app/country-list/country-list.component.ts
trackByFn(index: number, item: any) {
  return item.name.common; // Use country name as a unique identifier
}

}
