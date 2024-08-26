import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NewProduct } from '../../models/product.model';
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
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

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
  product: NewProduct | undefined;
  categoryOptions: Category[] = [];
  dialogVisible: boolean = false;
  sendingForm: boolean = false;

  constructor(private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService, private messageService: MessageService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.1)]]
    });
  }

  ngOnInit() {
    this.getCategoryOptions();
    this.productForm.addControl('text', new FormControl<string | null>(null));
    this.productForm.addControl('number', new FormControl<number | null>(null));
  }

  getCategoryOptions(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => this.categoryOptions = response,
      error: () => this.showFeedbackMessage('error', 'Error', 'Unable to load categories, please try again later.')
    });
  }

  submitProduct() {
    if (this.productForm.valid) {
      this.sendingForm = true;
      this.product = this.productForm.value as NewProduct;
        
      this.productService.addProduct(this.product).subscribe({
        next: () => {
          this.showFeedbackMessage('success', 'Success', 'Item created successfully!');
          this.dialogVisible = false;
          this.sendingForm = false;
          window.location.reload();
        },
        error: () => {
          this.showFeedbackMessage('error', 'Error', 'Could not create item, please try again later.');
          this.sendingForm = false;
        },
      })
    } else {
      this.showFeedbackMessage('error', 'Ops', 'Please fill in the required data!');
    }
  }

  showFeedbackMessage(severity: string, title: string, message: string) {
    this.messageService.add({ severity: severity, summary: title, detail: message });
  }

  showDialog(): void {
    this.dialogVisible = true;
  }

  closeDialog(): void {
    this.product = undefined;
    this.productForm.reset();
    this.dialogVisible = false;
  }
}
