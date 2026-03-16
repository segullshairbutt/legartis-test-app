import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table, TableModule, TableLazyLoadEvent, TablePageEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { Category, type Contract } from 'src/types/contract';
import { SortEvent } from 'primeng/api';

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
export default class ContractList implements OnInit {
  contracts: Contract[] = [];
  totalRecords: number = 0;
  page: number = 0;
  pageSize: number = 10;
  categoryOptions = [
    Category.LimitationOfLiability,
    Category.TerminationForConvenience,
    Category.NonCompete,
  ];
  selectedCategories: Category[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Initial load with default lazy load event
    this.loadContracts({} as TableLazyLoadEvent);
  }

  loadContracts(event: TableLazyLoadEvent) {
    // Build API parameters from lazy load event
    const sortField = event.sortField;
    const sortOrder = event.sortOrder; // 1 for ascending, -1 for descending
    const page = event.first || 0;
    const pageSize = event.rows || 10;

    console.log('Sort field:', sortField);
    console.log('Sort order:', sortOrder);
    console.log('Page:', page, 'Rows:', pageSize);

    // TODO: Replace with actual API call
    // this.contractService.getContracts({ sortField, sortOrder, first, rows }).subscribe(...)

    // Demo data - later this will come from API
    this.totalRecords = this.contracts.length;
    this.contracts = [
      {
        id: 1,
        title: 'Service Agreement',
        numberOfClauses: 8,
        categories: [Category.LimitationOfLiability],
        createdAt: new Date('2026-01-15'),
      },
      {
        id: 2,
        title: 'NDA Contract',
        numberOfClauses: 5,
        categories: [Category.NonCompete],
        createdAt: new Date('2026-02-20'),
      },
      {
        id: 3,
        title: 'Employment Contract',
        numberOfClauses: 12,
        categories: [Category.TerminationForConvenience],
        createdAt: new Date('2026-03-10'),
      },
      {
        id: 4,
        title: 'Vendor Agreement',
        numberOfClauses: 7,
        categories: [Category.LimitationOfLiability],
        createdAt: new Date('2026-03-05'),
      },
    ];
  }

  getSeverity(category: Category) {
    switch (category) {
      case Category.LimitationOfLiability:
        return 'info';
      case Category.TerminationForConvenience:
        return 'success';
      case Category.NonCompete:
        return 'warn';
      default:
        return null;
    }
  }

  clear(table: Table) {
    table.clear();
  }

  viewDetail(id: number) {
    this.router.navigate(['/contracts', id]);
  }

  next() {
    this.page = this.page + this.pageSize;
  }

  prev() {
    this.page = this.page - this.pageSize;
  }

  reset() {
    this.page = 0;
  }

  pageChange(event: TablePageEvent) {
    this.page = event.first;
    this.pageSize = event.rows;
  }

  sortTableData(event: SortEvent) {
    console.log('Sort event:', event);
  }

  searchContracts(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    console.log('Search query:', query);
  }

  filterByCategory() {
    console.log('Selected categories:', this.selectedCategories);
  }
}
