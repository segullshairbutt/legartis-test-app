import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import type { Clause } from 'src/types/contract';
import { CLAUSE_TYPE_OPTIONS } from 'src/types/contract';
import { ClauseService } from 'src/services/clause-service';

@Component({
  selector: 'edit-clause-dialog',
  templateUrl: './edit-clause-dialog.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    SelectModule,
  ],
})
export class EditClauseDialog implements OnChanges {
  @Input() clause!: Clause;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<Clause>();

  clauseTypes = CLAUSE_TYPE_OPTIONS;
  clauseForm!: FormGroup;

  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private clauseService: ClauseService,
  ) {
    this.clauseForm = this.formBuilder.group({
      id: [''],
      contractId: [''],
      text: ['', [Validators.required, Validators.minLength(10)]],
      type: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clause'] && this.clause) {
      this.updateForm();
    }
  }

  private updateForm() {
    if (this.clause && this.clauseForm) {
      this.clauseForm.patchValue({
        id: this.clause.id,
        contractId: this.clause.contract_id,
        text: this.clause.clause_text,
        type: this.clause.clause_type,
      });
      this.clauseForm.get('text')?.disable();
    }
  }

  onSave() {
    if (this.clauseForm.invalid) {
      this.clauseForm.markAllAsTouched();
      return;
    }

    const { id, type } = this.clauseForm.value;
    this.isSubmitting = true;

    this.clauseService.updateClauseType(id, type).subscribe({
      next: (updatedClause) => {
        this.isSubmitting = false;
        this.saved.emit(updatedClause);
        this.onDialogClose();
      },
      error: (error) => {
        console.error('Failed to update clause', error);
        this.isSubmitting = false;
      },
    });
  }

  onCancel() {
    this.onDialogClose();
  }

  onDialogClose() {
    this.close.emit();
  }
}
