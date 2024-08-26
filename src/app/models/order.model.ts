import { Product } from "./product.model";

export interface OrderProduct {
    product: Product,
    quantity: number
}

export interface Order {
    id: number
    customerName: string
    address: string
    status: string
    createdAt: Date
}

export interface OrderProducts extends Order {
    products: OrderProduct[]
}

export interface NewProductOrder {
    id: number
    quantity: number
}

export interface NewOrder {
    customerName: string
    address: string
    products: NewProductOrder[]
}