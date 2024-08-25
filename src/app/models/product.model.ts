import { Category } from "./category.model";

export interface Product {
    id: number
    name: string
    description: string
    category: Category
    image: string
    price: number
}

export interface ProductCart extends Product {
    quantity: number
}

export interface NewProduct {
    name: string
    description: string
    category: Category
    image: string
    price: number
}