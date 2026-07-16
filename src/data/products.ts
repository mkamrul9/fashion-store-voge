export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    rating: number;
    colors: string[];
    sizes: string[];
    inStock: boolean;
    description: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Classic Cotton Panjabi",
        category: "Panjabi",
        price: 1490,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
        rating: 4.5,
        colors: ["White", "Navy"],
        sizes: ["M", "L", "XL"],
        inStock: true,
        description: "Premium breathable cotton panjabi perfect for festive wear and daily comfort."
    },
    {
        id: 2,
        name: "Urban Denim Jacket",
        category: "Outerwear",
        price: 3200,
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        colors: ["Blue", "Black"],
        sizes: ["S", "M", "L"],
        inStock: true,
        description: "Classic raw denim jacket with modern stitching and durable hardware."
    }

];