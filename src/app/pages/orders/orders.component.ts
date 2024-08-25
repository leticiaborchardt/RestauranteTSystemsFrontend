import { Component } from '@angular/core';
import { Order, ProductOrder } from '../../models/order.model';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DataViewModule, ButtonModule, TagModule, TimelineModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders: Order[] = [
    {
      id: 1,
      user: {
        id: 101,
        name: "John Snow",
        email: "john@example.com"
      },
      status: "Ordered",
      date: new Date(),
      products: [
        { id: 1, name: "Product 1", price: 10.0, quantity: 2 },
        { id: 2, name: "Product 2", price: 20.0, quantity: 1 }
      ],
      address: 'Street 5558, City AB'
    }
  ];

  statusList: string[] = ['Ordered', 'Processing', 'Shipped', 'Delivered'];

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
}
