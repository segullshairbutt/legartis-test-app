import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ContractService } from 'src/services/contract-service';

@Component({
  selector: 'contract-create',
  templateUrl: './contract-create.html',
  imports: [CommonModule, InputGroupModule, InputTextModule, ButtonModule, ReactiveFormsModule],
})
export default class ContractCreate implements OnInit {
  contractForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  private selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.contractForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      file: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.contractForm.invalid || !this.selectedFile) {
      this.contractForm.markAllAsTouched();
      return;
    }

    const { title } = this.contractForm.value;
    this.isSubmitting = true;
    this.successMessage = '';

    this.contractService.createContract(title, this.selectedFile).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Contract created successfully.';
        this.resetForm();
      },
      error: (error) => {
        console.error('Failed to create contract', error);
        this.isSubmitting = false;
      },
    });
  }

  resetForm() {
    this.contractForm.reset();
    this.selectedFile = null;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length ? input.files[0] : null;

    this.selectedFile = file;
    this.contractForm.patchValue({ file });
    this.contractForm.get('file')?.updateValueAndValidity();
  }
}
