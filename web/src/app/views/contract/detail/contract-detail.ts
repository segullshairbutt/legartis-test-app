import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ContractDetail as ContractDetailDTO, type Clause } from 'src/types/contract';
import { ContractService } from 'src/services/contract-service';
import { getSeverityForCategory } from 'src/utils';
import { EditClauseDialog } from './edit-clause-dialog/edit-clause-dialog';

@Component({
  selector: 'contract-detail',
  templateUrl: './contract-detail.html',
  imports: [CommonModule, TableModule, ButtonModule, TagModule, EditClauseDialog],
})
export default class ContractDetail {
  contractDetail$ = new Subject<ContractDetailDTO>();
  isClauseDialogOpen = false;
  selectedClause: Clause | null = null;
  private contractId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
  ) {
    this.route.params.subscribe((params) => {
      const contractId = Number(params['id']);

      if (Number.isNaN(contractId)) {
        this.router.navigate(['/404']);
        return;
      }

      this.contractId = contractId;
      this.fetchContractDetail(contractId);
    });
  }

  private fetchContractDetail(contractId: number) {
    this.contractService.getContractDetail(contractId).subscribe({
      next: (detail) => this.contractDetail$.next(detail),
      error: (error) => {
        if (error.status === 404) {
          this.router.navigate(['/404']);
        } else {
          console.error('Error fetching contract detail:', error);
        }
      },
    });
  }

  getSeverity(clauseType: string) {
    return getSeverityForCategory(clauseType);
  }

  goBack() {
    this.router.navigate(['/contracts']);
  }

  editClause(clause: Clause) {
    this.selectedClause = clause;
    this.isClauseDialogOpen = true;
  }

  onDialogClose() {
    this.isClauseDialogOpen = false;
  }

  onClauseSaved() {
    this.isClauseDialogOpen = false;
    if (this.contractId !== null) {
      this.fetchContractDetail(this.contractId);
    }
  }
}
