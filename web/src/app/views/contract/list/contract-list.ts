import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ClauseType, type Contract } from 'src/types/contract';
import { ContractService } from 'src/services/contract-service';
import { getSeverityForCategory } from 'src/utils';
import type { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'contract-list',
  templateUrl: './contract-list.html',
  imports: [
    CommonModule,
    FormsModule,
    MultiSelectModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TagModule,
  ],
})
export default class ContractList {
  contracts: Contract[] = [];
  loading = false;
  private searchTerm = '';
  private sortField?: string = '-created_at';
  clauseTypeOptions = [
    ClauseType.LimitationOfLiability,
    ClauseType.TerminationForConvenience,
    ClauseType.NonCompete,
  ];
  selectedClauseTypes: ClauseType[] = [];

  constructor(
    private router: Router,
    private contractService: ContractService,
    private cdr: ChangeDetectorRef,
  ) {}

  private loadContracts() {
    this.loading = true;
    this.contractService
      .getContracts({
        search: this.searchTerm || undefined,
        categories: this.selectedClauseTypes.length ? this.selectedClauseTypes : undefined,
        sort: this.sortField,
      })
      .subscribe({
        next: (contracts) => {
          this.contracts = [...contracts];
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Failed to load contracts', error);
          this.loading = false;
        },
      });
  }

  getSeverity(clauseType: ClauseType) {
    return getSeverityForCategory(clauseType);
  }

  viewDetail(id: number) {
    this.router.navigate(['/contracts', id]);
  }

  onLazyLoad(event: TableLazyLoadEvent) {
    const field = (event.sortField as string) || 'created_at';
    const order = (event.sortOrder as 1 | -1 | 0 | undefined) ?? -1;

    if (order === 0 || !order) {
      this.sortField = undefined;
    } else {
      // Encode direction directly for backend: `field` or `-field`
      this.sortField = order === -1 ? `-${field}` : field;
    }

    this.loadContracts();
  }

  searchContracts(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.loadContracts();
  }

  filterByClauseType() {
    this.loadContracts();
  }
}
