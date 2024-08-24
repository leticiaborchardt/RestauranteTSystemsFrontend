export interface Product {
    id: number
    name: string,
    description: string,
    category: string
    image: string,
    price: number
}

export interface ProductCart {
    id: number
    name: string,
    category: string
    image: string,
    price: number,
    quantity: number
}