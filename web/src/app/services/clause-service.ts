import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, type Clause } from 'src/types/contract';

interface ClauseUpdatePayload {
  clause_type: Category;
}

@Injectable({
  providedIn: 'root',
})
export class ClauseService {
  private readonly http = inject(HttpClient);

  /**
   * Updates the type of a clause.
   */
  updateClauseType(clauseId: number, clauseType: Category): Observable<Clause> {
    const payload: ClauseUpdatePayload = { clause_type: clauseType };
    return this.http.patch<Clause>(`${environment.apiBaseUrl}/clauses/${clauseId}`, payload);
  }
}
