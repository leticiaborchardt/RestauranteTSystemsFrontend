import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'orders',
        component: OrdersComponent,
        title: 'Orders'
    },
    {
        path: 'products',
        component: ProductsComponent,
        title: 'Menu'
    }
];
