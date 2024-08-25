import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product, ProductCart } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { AddProductComponent } from '../../components/add-product/add-product.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

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
    ToastModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [MessageService]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isManagingProducts: boolean = false;

  constructor(private productService: ProductService, private cartService: CartService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response) => this.products = response,
      error: () => this.showFeedbackMessage('error', 'Error', 'Unable to load menu items, please try again later.')
    })
  }

  removeProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== id);
        this.showFeedbackMessage('success', 'Success', 'Item removed successfully!');
      },
      error: () => this.showFeedbackMessage('error', 'Error', 'Could not remove item, please try again later.')
    });
  }

  addProductToCart(product: Product): void {
    var productCart = product as ProductCart;
    productCart.quantity = 1;

    if (this.cartService.addProduct(productCart)) {
      this.showFeedbackMessage('success', 'Success', 'Item added to cart');
    } else {
      this.showFeedbackMessage('error', 'Error', 'Could not add item to cart, please try again later.');
    }
  }

  isProductOnCart(id: number): boolean {
    return this.cartService.getProductById(id) != null;
  }

  manageProducts(): void {
    this.isManagingProducts = true;
  }

  showFeedbackMessage(severity: string, title: string, message: string) {
    this.messageService.add({ severity: severity, summary: title, detail: message });
  }
}
