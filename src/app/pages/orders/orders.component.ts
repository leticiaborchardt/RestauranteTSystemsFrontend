import { Component, OnInit } from '@angular/core';
import { OrderProduct, OrderProducts } from '../../models/order.model';
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
  orders: OrderProducts[] = [];
  totalRecords: number = 0;
  statusList: string[] = ['received', 'processing', 'shipped', 'delivered'];

  constructor(private orderService: OrderService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getOrders(0, 10);
  }

  getOrders(page: number, size: number): void {
    this.orderService.getOrders(page, size).subscribe({
      next: (response) => {
        const ordersResponse: OrderProducts[] = response.content as OrderProducts[];
        
        ordersResponse.forEach(order => {
          this.orderService.getOrderProducts(order.id).subscribe({
            next: (res) => order.products = res,
            error: (error) => {
              throw new Error(error)
            }
          })
        });

        this.orders = ordersResponse;
        this.totalRecords = response.totalElements;
      },
      error: () => this.showFeedbackMessage('error', 'Error', 'Unable to load orders, please try again later.')
    })
  }

  onPageChange(event: any) {     
    this.getOrders(event.first / event.rows, event.rows);
  }

  formatDate(date: Date): string {
    return format(date, 'MM/dd/yyyy - HH:mm');
  }

  getTotalPrice(products: OrderProduct[]): number {
    return products?.reduce((total, item) => total + (item.product.price * item.quantity), 0);
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
