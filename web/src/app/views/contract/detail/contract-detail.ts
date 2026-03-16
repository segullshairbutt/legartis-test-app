import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { type Contract, type Clause, Category } from 'src/types/contract';
import { EditClauseDialog } from './edit-clause-dialog/edit-clause-dialog';

@Component({
  selector: 'contract-detail',
  templateUrl: './contract-detail.html',
  imports: [CommonModule, TableModule, ButtonModule, TagModule, EditClauseDialog],
})
export default class ContractDetail implements OnInit {
  contract: Contract | null = null;
  clauses: Clause[] = [];
  isClauseDialogOpen = false;
  selectedClause: Clause | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadContractDetail();
  }

  loadContractDetail() {
    // Get contract ID from route params
    this.route.params.subscribe((params) => {
      const contractId = params['id'];
      // Mock data - later this will come from API
      this.contract = {
        id: contractId,
        title: 'Service Agreement',
        numberOfClauses: 4,
        categories: [Category.LimitationOfLiability],
        createdAt: new Date('2026-01-15'),
      };
      // Fetch clauses separately
      this.loadClauses(contractId);
    });
  }

  loadClauses(contractId: number) {
    // Mock data - later this will come from API
    this.clauses = [
      {
        id: 1,
        contractId: contractId,
        text: 'Neither party shall be liable for any indirect, incidental, special, consequential damages.',
        type: Category.LimitationOfLiability,
      },
      {
        id: 2,
        contractId: contractId,
        text: 'The total liability of each party shall not exceed the fees paid in the past 12 months.',
        type: Category.LimitationOfLiability,
      },
      {
        id: 3,
        contractId: contractId,
        text: 'Either party may terminate this agreement without cause with 30 days written notice.',
        type: Category.TerminationForConvenience,
      },
      {
        id: 4,
        contractId: contractId,
        text: 'The employee agrees not to compete with the company within 50 miles for 2 years after termination.',
        type: Category.NonCompete,
      },
    ];
  }

  getSeverity(clauseType: string) {
    switch (clauseType) {
      case 'Limitation of Liability':
        return 'info';
      case 'Termination for Convenience':
        return 'success';
      case 'Non-Compete':
        return 'warn';
      default:
        return 'info';
    }
  }
  goBack() {
    this.router.navigate(['/contracts']);
  }

  editClause(clause: Clause) {
    this.selectedClause = clause;
    this.isClauseDialogOpen = true;
  }

  onClauseSaved(updatedClause: Clause) {
    const index = this.clauses.findIndex((c) => c.id === updatedClause.id);
    if (index !== -1) {
      this.clauses[index] = updatedClause;
    }
    this.isClauseDialogOpen = false;
  }
}
