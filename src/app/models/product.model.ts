export interface Product {
    id: number
    name: string,
    description: string,
    category: string
    image: string,
    price: number
}

export interface ProductCart extends Product {
    quantity: number;
}