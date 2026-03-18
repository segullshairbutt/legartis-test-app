import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ContractDetail as ContractDetailDTO, type Clause, Category } from 'src/types/contract';
import { ContractService } from 'src/services/contract-service';
import { EditClauseDialog } from './edit-clause-dialog/edit-clause-dialog';

@Component({
  selector: 'contract-detail',
  templateUrl: './contract-detail.html',
  imports: [CommonModule, TableModule, ButtonModule, TagModule, EditClauseDialog],
})
export default class ContractDetail implements OnInit {
  contract: ContractDetailDTO | null = null;
  isClauseDialogOpen = false;
  selectedClause: Clause | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadContractDetail();
  }

  loadContractDetail() {
    // Get contract ID from route params and fetch from API
    this.route.params.subscribe((params) => {
      const contractId = Number(params['id']);

      if (Number.isNaN(contractId)) {
        this.router.navigate(['/contracts']);
        return;
      }

      this.contractService.getContractDetail(contractId).subscribe({
        next: (detail) => {
          this.contract = detail;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Failed to load contract details', error);
          this.router.navigate(['/contracts']);
        },
      });
    });
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
    const index = this.contract?.clauses.findIndex((c) => c.id === updatedClause.id);
    if (index && index !== -1 && this.contract) {
      this.contract.clauses[index] = updatedClause;
    }
    this.isClauseDialogOpen = false;
  }
}
