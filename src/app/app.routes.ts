import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsManagementComponent } from './pages/products-management/products-management.component';
import { AddProductComponent } from './components/add-product/add-product.component';

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
    },
    {
        path: 'products-management',
        component: ProductsManagementComponent,
        title: 'Menu | Update'
    },
    {
        path: 'add-product',
        component: AddProductComponent,
        title: 'Menu | Create Item'
    },
];
