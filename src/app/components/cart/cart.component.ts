import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ProductCart } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { BadgeModule } from 'primeng/badge';
import { OrderService } from '../../services/order.service';
import { NewOrder } from '../../models/order.model';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    SidebarModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    DataViewModule,
    TagModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule,
    BadgeModule,
    CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [MessageService]
})
export class CartComponent implements OnInit {
  sidebarVisible: boolean = false;
  cartItemCount = 0;
  products: ProductCart[] = [];
  customerName: string = "";
  address: string = "";
  order: NewOrder = {
    customerName: '',
    address: '',
    products: []
  };

  constructor(private cartService: CartService, private orderService: OrderService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.cartService.cartProducts$.subscribe(cartProducts => {
      this.products = cartProducts;
      this.cartItemCount = cartProducts.length;
    });
  }

  removeFromCart(id: number) {
    this.cartService.removeProduct(id);
  }

  showFeedbackMessage(severity: string, title: string, message: string) {
    this.messageService.add({ severity: severity, summary: title, detail: message });
  }

  getTotalPrice(): number {
    return this.products.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  sendOrder(): void {
    this.order.customerName = this.customerName;
    this.order.address = this.address;

    this.products.forEach(product => {
      this.order.products.push({id: product.id, quantity: product.quantity});
    });

    this.orderService.addOrder(this.order).subscribe({
      next: () => this.showFeedbackMessage('success', 'Success', 'Your order has been sent'),
      error: () => this.showFeedbackMessage('error', 'Error', 'Could not send the order, please try again later.')
    });

    this.cartService.clearCart();
  }

  validateInputs(): boolean {
    return !(this.customerName.length < 1 || this.address.length < 1);
  }
}
