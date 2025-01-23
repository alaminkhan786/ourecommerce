export const products = [
  {
    id: 1,
    name: "Sony WH-1000XM4 Wireless Headphones",
    price: 349.99,
    description: "Industry-leading noise canceling with Dual Noise Sensor technology",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.8,
    reviews: 1250,
    inStock: true,
    features: [
      "Up to 30-hour battery life",
      "Touch Sensor controls",
      "Speak-to-chat technology",
      "Multiple device pairing"
    ]
  },
  {
    id: 2,
    name: "MacBook Pro M1",
    price: 1299.99,
    description: "Apple M1 chip with 8‑core CPU and 8‑core GPU",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    rating: 4.9,
    reviews: 986,
    inStock: true,
    features: [
      "8GB unified memory",
      "256GB SSD storage",
      "13-inch Retina display",
      "Touch Bar and Touch ID"
    ]
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    price: 150.00,
    description: "Nike's first lifestyle Air Max brings you style, comfort and big attitude",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    rating: 4.7,
    reviews: 2150,
    inStock: true,
    features: [
      "Large Air Max unit",
      "Mesh upper for breathability",
      "Foam midsole",
      "Rubber outsole"
    ]
  },
  {
    id: 4,
    name: "Samsung 65\" QLED 4K TV",
    price: 1199.99,
    description: "Quantum Processor with 4K upscaling",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
    rating: 4.6,
    reviews: 758,
    inStock: true,
    features: [
      "Quantum HDR",
      "Alexa built-in",
      "Object Tracking Sound",
      "Motion Xcelerator Turbo+"
    ]
  },
  {
    id: 5,
    name: "iPhone 13 Pro",
    price: 999.99,
    description: "A dramatically more powerful camera system",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1632661674596-618e45778a41?w=500",
    rating: 4.9,
    reviews: 3254,
    inStock: true,
    features: [
      "Pro camera system",
      "A15 Bionic chip",
      "Super Retina XDR display",
      "5G capable"
    ]
  },
  {
    id: 6,
    name: "Kindle Paperwhite",
    price: 139.99,
    description: "Now with a 6.8\" display and thinner borders",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1592434134753-a70d6b58a047?w=500",
    rating: 4.7,
    reviews: 1876,
    inStock: true,
    features: [
      "Waterproof",
      "Glare-free display",
      "Adjustable warm light",
      "10 weeks battery life"
    ]
  },
  {
    id: 7,
    name: "Levi's 501 Original Fit Jeans",
    price: 59.99,
    description: "The original blue jean since 1873",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    rating: 4.5,
    reviews: 4521,
    inStock: true,
    features: [
      "100% Cotton",
      "Button closure",
      "Straight leg",
      "Classic five-pocket styling"
    ]
  },
  {
    id: 8,
    name: "DJI Mini 2 Drone",
    price: 449.00,
    description: "Ultralight and foldable drone with 4K camera",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500",
    rating: 4.8,
    reviews: 965,
    inStock: true,
    features: [
      "4K/30fps video",
      "31-minute flight time",
      "10km HD video transmission",
      "Level 5 wind resistance"
    ]
  },
  {
    id: 9,
    name: "Fitbit Versa 3",
    price: 229.95,
    description: "Advanced fitness tracking with built-in GPS",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500",
    rating: 4.6,
    reviews: 2187,
    inStock: true,
    features: [
      "Built-in GPS",
      "24/7 heart rate tracking",
      "6+ day battery life",
      "Voice assistant"
    ]
  },
  {
    id: 10,
    name: "Ray-Ban Aviator Classic",
    price: 161.00,
    description: "Iconic aviator sunglasses with G-15 lenses",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    rating: 4.7,
    reviews: 3654,
    inStock: true,
    features: [
      "Gold frame",
      "Glass lenses",
      "100% UV protection",
      "Adjustable nose pads"
    ]
  },
  {
    id: 11,
    name: "PlayStation 5",
    price: 499.99,
    description: "Next-gen gaming console with ultra-high speed SSD",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    rating: 4.9,
    reviews: 4521,
    inStock: false,
    features: [
      "4K-TV Gaming",
      "Ray Tracing",
      "HDR Technology",
      "3D Audio"
    ]
  },
  {
    id: 12,
    name: "Apple Watch Series 7",
    price: 399.00,
    description: "The most durable Apple Watch ever built",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    rating: 4.8,
    reviews: 1856,
    inStock: true,
    features: [
      "Always-On Retina display",
      "Blood Oxygen app",
      "ECG app",
      "Water resistant"
    ]
  }
];

export const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500"
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500"
  },
  {
    id: 3,
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?w=500"
  }
];

export const featuredProducts = products.slice(0, 4);
export const newArrivals = products.slice(4, 8);
export const bestSellers = products.filter(product => product.rating >= 4.8);
