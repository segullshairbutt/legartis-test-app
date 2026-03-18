import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClauseType, Contract, type ContractDetail } from 'src/types/contract';
import { environment } from 'src/environments/environment';

interface ContractListRequestParams {
  search?: string;
  categories?: ClauseType[];
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
      categories.forEach((clauseType) => {
        params = params.append('categories', clauseType);
      });
    }
    if (sort) {
      params = params.set('sort', sort);
    }
    return this.http.get<Contract[]>(`${environment.apiBaseUrl}/contracts/`, { params });
  }

  /**
   * Creates a new contract by uploading a file.
   * @param name Contract title/name
   * @param file Text or markdown file containing the contract clauses
   */
  createContract(name: string, file: File): Observable<Contract> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);

    return this.http.post<Contract>(`${environment.apiBaseUrl}/contracts/`, formData);
  }

  /**
   * Fetches detailed information for a single contract, including its clauses.
   */
  getContractDetail(id: number): Observable<ContractDetail> {
    return this.http.get<ContractDetail>(`${environment.apiBaseUrl}/contracts/${id}`);
  }
}
