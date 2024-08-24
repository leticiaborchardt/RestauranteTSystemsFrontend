import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Product } from '../../models/product.model';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Category } from '../../models/category.model';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    InputTextareaModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule,
    CommonModule,
    DialogModule,
    ToastModule,
    TooltipModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  providers: [MessageService]
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  product: Product | undefined;
  categoryOptions: Category[] = [{
    id:1,
    name: "drinks"
  }];
  dialogVisible: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: [''],
      price: [0, [Validators.required, Validators.min(0.1)]]
    });
  }

  ngOnInit() {
    this.productForm.addControl('text', new FormControl<string | null>(null));
    this.productForm.addControl('number', new FormControl<number | null>(null));
  }

  submitProduct() {
    if (this.productForm.valid) {
      this.product = this.productForm.value as Product;
      this.showFeedbackMessage('success', 'Success', 'Item created successfully!');
      this.dialogVisible = false;
    } else {
      this.showFeedbackMessage('danger', 'Ops', 'Please fill in the required data!');
    }
  }

  showFeedbackMessage(severity: string, title: string, message: string) {
    this.messageService.add({ severity: severity, summary: title, detail: message });
  }

  showDialog() {
    this.dialogVisible = true;
  }
}
