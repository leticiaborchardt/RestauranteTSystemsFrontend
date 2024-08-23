import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CartComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items: MenuItem[] = [
    {
        label: 'Home',
        icon: 'pi pi-home',
        url: '/'
    },
    {
        label: 'Menu',
        icon: 'pi pi-book',
        url: '/products'
    },
    {
        label: 'Orders',
        icon: 'pi pi-calendar-clock',
        url: '/orders'
    }
  ];
}
