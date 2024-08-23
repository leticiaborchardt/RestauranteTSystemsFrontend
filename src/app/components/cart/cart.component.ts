import { Component } from '@angular/core';
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
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SidebarModule, ToastModule, ButtonModule, RippleModule, DataViewModule, TagModule, FormsModule, InputNumberModule, DropdownModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [MessageService]
})
export class CartComponent {
  sidebarVisible: boolean = false;

  // mock
  products: Product[] = [
    {
      id: 1,
      name: 'Classic Burguer',
      category: 'Burguers',
      image: 'https://encurtador.com.br/YG4XW',
      price: 15.00,
      quantity: 1
    },
    {
      id: 2,
      name: 'American BBQ',
      category: 'Burguers',
      image: 'https://encurtador.com.br/xC9nn',
      price: 17.00,
      quantity: 2
    },
    {
      id: 3,
      name: 'Strawberry Milkshake',
      category: 'Desserts',
      image: 'https://encurtador.com.br/76TEI',
      price: 8.00,
      quantity: 1
    },
  ];

  addresses: string[] = [];
  selectedAddress: string = "";

  constructor(private messageService: MessageService) {}

  showFeedbackMessage(severity: string, title: string, message: string) {
      this.messageService.add({ severity: severity, summary: title, detail: message });
  }

  sendOrder() {
    this.showFeedbackMessage('success', 'Success', 'Your order has been sent')
  }
}
