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
    createdAt: Date
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