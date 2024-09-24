// src/app/country-details/country-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [CountryService],
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  country: any = null;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    const countryName = this.route.snapshot.paramMap.get('name');
    if (countryName) {
      this.loadCountryDetails(countryName);
    }
  }

  loadCountryDetails(name: string) {
    this.countryService.getCountries().subscribe((countries) => {
      this.country = countries.find(
        (country) => country.name.common.toLowerCase() === name.toLowerCase()
      );
    });
  }
}
