import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category, Contract } from 'src/types/contract';

const API_BASE_URL = 'http://localhost:8000';

interface ContractListRequestParams {
  search?: string;
  categories?: Category[];
  sort?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private readonly http = inject(HttpClient);

  /**
   * Fetches contracts based on search criteria.
   * @param search
   * @param categories
   * @param sort
   * @returns
   */
  getContracts({ search, categories, sort }: ContractListRequestParams = {}): Observable<
    Contract[]
  > {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    if (categories && categories.length) {
      categories.forEach((category) => {
        params = params.append('categories', category);
      });
    }
    if (sort) {
      params = params.set('sort', sort);
    }
    return this.http.get<Contract[]>(`${API_BASE_URL}/contracts/`, { params });
  }
}
