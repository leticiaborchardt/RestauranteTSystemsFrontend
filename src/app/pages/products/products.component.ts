import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product, ProductCart } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { AddProductComponent } from '../../components/add-product/add-product.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    DataViewModule,
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule,
    RouterLink,
    AddProductComponent,
    ToastModule,
    ConfirmDialogModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    DropdownModule,
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  totalRecords: number = 0;
  productImageLoaded: boolean = true;
  isManagingProducts: boolean = false;
  categoryOptionsSearch: Category[] = [];
  categorySearch?: Category;
  minPriceSearch?: number;
  maxPriceSearch?: number;

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService,
    private cartService: CartService, 
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getCategoryOptionsSearch();
    this.getProducts(0, 10);
  }

  getProducts(page: number, size: number): void {
    this.productService.getProducts(page, size, this.categorySearch?.id, this.minPriceSearch, this.maxPriceSearch).subscribe({
      next: (response) => {
        this.products = response.content;
        this.totalRecords = response.totalElements;
      },
      error: () => this.showFeedbackMessage('error', 'Error', 'Unable to load menu items, please try again later.')
    })
  }

  removeProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== id);
        this.cartService.removeProduct(id);

        this.showFeedbackMessage('success', 'Success', 'Item removed successfully!');
      },
      error: () => this.showFeedbackMessage('error', 'Error', 'Could not remove item, please try again later.')
    });
  }

  addProductToCart(product: Product): void {
    var productCart = product as ProductCart;
    productCart.quantity = 1;

    this.cartService.addProduct(productCart);
    this.showFeedbackMessage('success', 'Success', 'Item added to cart');
  }

  confirmDeletion(productId: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to remove this item from menu?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.removeProduct(productId);
      }
    });
  }

  getCategoryOptionsSearch(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => this.categoryOptionsSearch = response,
      error: () => this.showFeedbackMessage('error', 'Error', 'Unable to load categories, please try again later.')
    });
  }

  clearFilters() {
    this.categorySearch = undefined;
    this.minPriceSearch = undefined;
    this.maxPriceSearch = undefined;

    this.getProducts(0, 10);
  }

  onPageChange(event: any) {
    this.getProducts(event.first / event.rows, event.rows);
  }

  isProductOnCart(id: number): boolean {
    return this.cartService.getProductById(id) != null;
  }

  toggleManageProducts(): void {
    this.isManagingProducts = !this.isManagingProducts;
  }

  showFeedbackMessage(severity: string, title: string, message: string) {
    this.messageService.add({ severity: severity, summary: title, detail: message });
  }
}
