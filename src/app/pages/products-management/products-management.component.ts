import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { Product } from '../../models/product.model';
import { AddProductComponent } from '../../components/add-product/add-product.component';

@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [
    DataViewModule,
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule,
    RouterLink,
    AddProductComponent
  ],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.scss'
})
export class ProductsManagementComponent {
  // mock
  products: Product[] = [
    {
      id: 1,
      name: 'Classic Burger',
      description: 'A classic beef burger with lettuce, tomato, and cheese.',
      category: 'Burgers',
      image: 'https://encurtador.com.br/YG4XW',
      price: 15.00
    },
    {
      id: 2,
      name: 'Cheeseburger',
      description: 'Juicy beef burger topped with cheddar cheese.',
      category: 'Burgers',
      image: 'https://encurtador.com.br/xC9nn',
      price: 16.00
    },
    {
      id: 3,
      name: 'Veggie Burger',
      description: 'A tasty burger made with a vegetable patty, lettuce, and tomato.',
      category: 'Burgers',
      image: 'https://encurtador.com.br/76TEI',
      price: 14.00
    },
    {
      id: 4,
      name: 'Chicken Sandwich',
      description: 'Grilled chicken breast with lettuce, tomato, and mayo.',
      category: 'Sandwiches',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLkiOrxPi26skuWCPlDOcRS_mCnnX_kjRIQQ&s',
      price: 12.00
    },
    {
      id: 5,
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese.',
      category: 'Salads',
      image: 'https://assets.bonappetit.com/photos/624215f8a76f02a99b29518f/1:1/w_2800,h_2800,c_limit/0328-ceasar-salad-lede.jpg',
      price: 10.00
    },
    {
      id: 6,
      name: 'BBQ Ribs',
      description: 'Tender ribs coated in a smoky barbecue sauce.',
      category: 'Main Courses',
      image: 'https://www.allrecipes.com/thmb/I2ENWJQG1mb2b5OSXPqQudzlzJw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/220987-Baked-BBQ-Baby-Back-Ribs-mfs-041-77a42b0ce0f0424e9aeec2b22664f1aa.jpg',
      price: 20.00
    },
    {
      id: 7,
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato, mozzarella, and basil.',
      category: 'Pizzas',
      image: 'https://s2-receitas.glbimg.com/wb7DIMyCpEyV07sTAtcDWD8HQjw=/0x0:1200x675/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2024/h/r/EfCbvqTbeDRAD3Lzc5xA/pizza-margherita.jpg',
      price: 18.00
    },
    {
      id: 8,
      name: 'Pasta Alfredo',
      description: 'Creamy Alfredo pasta with parmesan cheese and herbs.',
      category: 'Pasta',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGK-rDPp9f8SBRa4UFguJHcn2htB-tH6v0-Q&s',
      price: 16.00
    },
    {
      id: 9,
      name: 'Chocolate Cake',
      description: 'Decadent chocolate cake with a rich frosting.',
      category: 'Desserts',
      image: 'https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-threeByTwoMediumAt2X.jpg',
      price: 8.00
    },
    {
      id: 10,
      name: 'Fruit Smoothie',
      description: 'Refreshing smoothie made with a blend of fresh fruits.',
      category: 'Drinks',
      image: 'https://www.thespruceeats.com/thmb/DTkCRqNWiK8HmlAANacYhMLhN9E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/strawberry-breakfast-smoothie-recipe-2097149-hero-02-5c1d4b2a46e0fb00014bf2ec.jpg',
      price: 7.00
    }
  ];
}
