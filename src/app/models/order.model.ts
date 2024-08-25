import { User } from "./user.model"

export interface ProductOrder {
    id: number,
    name: string,
    price: number,
    quantity: number
}

export interface Order {
    id: number
    user: User
    status: string
    date: Date,
    products: ProductOrder[],
    address: String
}