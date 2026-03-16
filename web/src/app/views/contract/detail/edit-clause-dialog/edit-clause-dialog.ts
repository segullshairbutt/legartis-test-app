import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
export class EditClauseDialog implements OnInit, OnChanges {
  @Input() clause!: Clause;
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<Clause>();

  clauseForm!: FormGroup;
  clauseTypes = [
    { label: 'Limitation of Liability', value: 'Limitation of Liability' },
    { label: 'Termination for Convenience', value: 'Termination for Convenience' },
    { label: 'Non-Compete', value: 'Non-Compete' },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.clauseForm = this.formBuilder.group({
      id: [''],
      contractId: [''],
      text: ['', [Validators.required, Validators.minLength(10)]],
      type: ['', Validators.required],
    });
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clause'] && this.clause) {
      this.updateForm();
    }
  }

  private updateForm() {
    if (this.clause && this.clauseForm) {
      this.clauseForm.patchValue({
        id: this.clause.id,
        contractId: this.clause.contractId,
        text: this.clause.text,
        type: this.clause.type,
      });
    }
  }

  onSave() {
    if (this.clauseForm.valid) {
      this.saved.emit(this.clauseForm.value);
      this.onDialogClose();
    }
  }

  onCancel() {
    this.onDialogClose();
  }

  onDialogClose() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }
}
