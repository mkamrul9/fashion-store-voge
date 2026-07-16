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
    // --- Panjabi ---
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
        id: 3,
        name: "Silk Embroidered Panjabi",
        category: "Panjabi",
        price: 2800,
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800&auto=format&fit=crop",
        rating: 4.7,
        colors: ["Cream", "Sky Blue", "Gold"],
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        description: "Handcrafted silk panjabi with intricate embroidery, ideal for weddings and Eid celebrations."
    },
    {
        id: 4,
        name: "Linen Summer Panjabi",
        category: "Panjabi",
        price: 1750,
        image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=800&auto=format&fit=crop",
        rating: 4.3,
        colors: ["Beige", "Olive", "White"],
        sizes: ["M", "L", "XL", "XXL"],
        inStock: true,
        description: "Lightweight linen weave designed for the South Asian summer. Breathable, relaxed, and refined."
    },
    {
        id: 5,
        name: "Heritage Block-Print Panjabi",
        category: "Panjabi",
        price: 2100,
        image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=800&auto=format&fit=crop",
        rating: 4.6,
        colors: ["Indigo", "Rust"],
        sizes: ["S", "M", "L"],
        inStock: false,
        description: "A tribute to traditional block-printing crafts with a contemporary silhouette and comfortable fit."
    },

    // --- Outerwear ---
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
    },
    {
        id: 6,
        name: "Wool Overcoat",
        category: "Outerwear",
        price: 6500,
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        colors: ["Camel", "Charcoal", "Black"],
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        description: "Premium double-breasted wool overcoat with a structured silhouette. Built for the cold season."
    },
    {
        id: 7,
        name: "Quilted Puffer Jacket",
        category: "Outerwear",
        price: 4200,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop",
        rating: 4.6,
        colors: ["Olive", "Black", "Burgundy"],
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        description: "Lightweight yet insulating quilted puffer. A modern essential for chilly mornings."
    },
    {
        id: 8,
        name: "Leather Biker Jacket",
        category: "Outerwear",
        price: 8900,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
        rating: 4.7,
        colors: ["Black", "Brown"],
        sizes: ["S", "M", "L"],
        inStock: true,
        description: "Genuine leather biker jacket with asymmetric zip and signature hardware. A timeless statement."
    },

    // --- T-Shirts ---
    {
        id: 9,
        name: "Essential Oversized Tee",
        category: "T-Shirts",
        price: 850,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        rating: 4.4,
        colors: ["White", "Black", "Grey", "Sage"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: true,
        description: "A weightless, drop-shoulder everyday tee. Preshrunk and garment-dyed for softness."
    },
    {
        id: 10,
        name: "Graphic Print Tee",
        category: "T-Shirts",
        price: 1100,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
        rating: 4.5,
        colors: ["White", "Black"],
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        description: "Studio-exclusive graphic print on 100% organic cotton. A wearable canvas for self-expression."
    },
    {
        id: 11,
        name: "Striped Polo Shirt",
        category: "T-Shirts",
        price: 1350,
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop",
        rating: 4.3,
        colors: ["Navy/White", "Black/Grey"],
        sizes: ["M", "L", "XL"],
        inStock: true,
        description: "Classic Breton-striped polo in a relaxed fit. Smart-casual from boardwalk to boardroom."
    },
    {
        id: 12,
        name: "Washed Vintage Crewneck",
        category: "T-Shirts",
        price: 980,
        image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop",
        rating: 4.6,
        colors: ["Faded Black", "Washed Blue", "Washed Grey"],
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        description: "Worn-in, vintage-washed crewneck with a lived-in look you'll love from day one."
    },

    // --- Trousers ---
    {
        id: 13,
        name: "Slim Chino Trousers",
        category: "Trousers",
        price: 2400,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop",
        rating: 4.5,
        colors: ["Khaki", "Navy", "Olive", "Stone"],
        sizes: ["30", "32", "34", "36"],
        inStock: true,
        description: "Refined slim-fit chinos made from stretch-cotton blend. Dress up or dress down effortlessly."
    },
    {
        id: 14,
        name: "Wide-Leg Linen Trousers",
        category: "Trousers",
        price: 2950,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
        rating: 4.4,
        colors: ["Ecru", "Sand", "Black"],
        sizes: ["28", "30", "32", "34"],
        inStock: true,
        description: "Airy wide-leg trousers crafted from pure linen. The pinnacle of relaxed luxury."
    },
    {
        id: 15,
        name: "Technical Cargo Pants",
        category: "Trousers",
        price: 3600,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
        rating: 4.7,
        colors: ["Olive", "Black", "Grey"],
        sizes: ["30", "32", "34"],
        inStock: true,
        description: "Six-pocket technical cargo pants with a tapered fit. Function meets contemporary street style."
    },

    // --- Accessories ---
    {
        id: 16,
        name: "Merino Wool Scarf",
        category: "Accessories",
        price: 1800,
        image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop",
        rating: 4.8,
        colors: ["Camel", "Grey Melange", "Burgundy"],
        sizes: ["One Size"],
        inStock: true,
        description: "Sumptuous 100% Merino wool scarf. Exceptionally soft, warm, and elegantly oversized."
    },
    {
        id: 17,
        name: "Structured Canvas Tote",
        category: "Accessories",
        price: 2200,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
        rating: 4.6,
        colors: ["Natural", "Black", "Olive"],
        sizes: ["One Size"],
        inStock: true,
        description: "Heavy-duty waxed canvas tote with leather-reinforced handles. Built to carry everything."
    },
    {
        id: 18,
        name: "Classic Leather Belt",
        category: "Accessories",
        price: 1650,
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop",
        rating: 4.5,
        colors: ["Tan", "Black"],
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        description: "Full-grain leather belt with a polished silver buckle. A foundational wardrobe staple."
    },
    {
        id: 19,
        name: "Minimalist Wool Cap",
        category: "Accessories",
        price: 950,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop",
        rating: 4.4,
        colors: ["Black", "Charcoal", "Cream"],
        sizes: ["One Size"],
        inStock: true,
        description: "Ribbed wool beanie with a fold-over cuff. Minimalist design, maximum warmth."
    },

    // --- Footwear ---
    {
        id: 20,
        name: "White Leather Sneakers",
        category: "Footwear",
        price: 5500,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
        rating: 4.9,
        colors: ["White", "White/Gum"],
        sizes: ["40", "41", "42", "43", "44"],
        inStock: true,
        description: "The definitive clean leather low-top sneaker. Pairs with everything from denim to trousers."
    },
    {
        id: 21,
        name: "Suede Chelsea Boots",
        category: "Footwear",
        price: 7200,
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop",
        rating: 4.7,
        colors: ["Tan", "Black", "Chestnut"],
        sizes: ["40", "41", "42", "43"],
        inStock: true,
        description: "Pull-on suede Chelsea boots with elastic gore panels. Refined, versatile, and all-day comfortable."
    },
    {
        id: 22,
        name: "Leather Derby Shoes",
        category: "Footwear",
        price: 6800,
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=800&auto=format&fit=crop",
        rating: 4.6,
        colors: ["Black", "Cognac"],
        sizes: ["40", "41", "42", "43", "44"],
        inStock: false,
        description: "Hand-burnished leather Derby shoes on a Blake-stitched leather sole. Crafted for the ages."
    },
    {
        id: 23,
        name: "Technical Slide Sandals",
        category: "Footwear",
        price: 2800,
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=800&auto=format&fit=crop",
        rating: 4.3,
        colors: ["Black", "Olive"],
        sizes: ["40", "41", "42", "43", "44"],
        inStock: true,
        description: "Ergonomic footbed with a technical webbing strap. Summer's most comfortable choice."
    },
];