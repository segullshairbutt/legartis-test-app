import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'contract-create',
  templateUrl: './contract-create.html',
  imports: [CommonModule, InputGroupModule, InputTextModule, ButtonModule, ReactiveFormsModule],
})
export default class ContractCreate implements OnInit {
  contractForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
    if (this.contractForm.valid) {
      console.log('Form submitted:', this.contractForm.value);
      // Add your form submission logic here
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm() {
    this.contractForm.reset();
  }
}
