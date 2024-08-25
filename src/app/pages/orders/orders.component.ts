import { Component, OnInit } from '@angular/core';
import { Order, ProductOrder } from '../../models/order.model';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';
import { OrderService } from '../../services/order.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    DataViewModule, 
    ButtonModule, 
    TagModule, 
    TimelineModule, 
    ToastModule, 
    CommonModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [MessageService]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  statusList: string[] = ['Ordered', 'Processing', 'Shipped', 'Delivered'];

  constructor(private orderService: OrderService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (response) => this.orders = response,
      error: () => this.showFeedbackMessage('error', 'Error', 'Unable to load orders, please try again later.')
    })
  }

  formatDate(date: Date): string {
    return format(date, 'MM/dd/yyyy - HH:mm');
  }

  getTotalPrice(products: ProductOrder[]): number {
    return products.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getStatusIcon(status: String): String {
    switch (status) {
      case 'Ordered':
        return 'pi pi-check-circle';
      case 'Processing':
        return 'pi pi-spinner-dotted';
      case 'Shipped':
        return 'pi pi-truck';
      case 'Delivered':
        return 'pi pi-receipt';
      default:
        return 'pi pi-check';
    }
  }

  showFeedbackMessage(severity: string, title: string, message: string) {
    this.messageService.add({ severity: severity, summary: title, detail: message });
  }
}
