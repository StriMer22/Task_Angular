import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RatesInfoResult } from "../utils/converter-types";

@Injectable({
  providedIn: 'root',
})
export class ConverterService {

  constructor(private http: HttpClient) { }

  getRates(date?: string) {
    const dateValue = date ? date + '/' : '';
    const rate = `https://api.nbp.pl/api/exchangerates/tables/A/${dateValue}?format=json`;

    return this.http.get<RatesInfoResult[]>(rate);
  }
}
