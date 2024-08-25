export interface ProductOrder {
    id: number,
    name: string,
    price: number,
    quantity: number
}

export interface Order {
    id: number
    customerName: string
    address: string
    status: string
    createdAt: Date,
    products: ProductOrder[]
}