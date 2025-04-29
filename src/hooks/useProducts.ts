
import { useState, useEffect } from "react";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: "superbikes" | "luxury-cars" | "sports-cars";
  brand: string;
  year: number;
  inStock: boolean;
  features: string[];
  specs: Record<string, string | number>;
};

// Function to generate unique IDs
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Placeholder image URLs
const bikeImages = [
  "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=2070",
  "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070",
  "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=2070",
  "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=2087",
  "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?q=80&w=2071"
];

const luxuryCarImages = [
  "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2734",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070",
  "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?q=80&w=2070"
];

const sportsCarImages = [
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070",
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070", 
  "https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=2078",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070"
];

// Function to get random image URLs per category
const getRandomImages = (category: string, count: number = 3): string[] => {
  const sourceArray = 
    category === "superbikes" ? bikeImages :
    category === "luxury-cars" ? luxuryCarImages : sportsCarImages;
  
  const shuffled = [...sourceArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Sample data for superbikes
const generateSuperbikes = (): Product[] => {
  const bikes = [
    { name: "Ducati Panigale V4", brand: "Ducati", price: 2399000 },
    { name: "BMW S1000RR", brand: "BMW", price: 2195000 },
    { name: "Kawasaki Ninja H2", brand: "Kawasaki", price: 3300000 },
    { name: "Honda CBR1000RR-R", brand: "Honda", price: 2150000 },
    { name: "Yamaha YZF-R1", brand: "Yamaha", price: 2099000 },
    { name: "Aprilia RSV4", brand: "Aprilia", price: 2699000 },
    { name: "Suzuki Hayabusa", brand: "Suzuki", price: 1641000 },
    { name: "MV Agusta F4", brand: "MV Agusta", price: 2649000 },
    { name: "Triumph Daytona Moto2", brand: "Triumph", price: 1795000 },
    { name: "KTM RC 8C", brand: "KTM", price: 1759000 },
    { name: "Kawasaki Ninja ZX-10R", brand: "Kawasaki", price: 1599000 },
    { name: "Ducati Superleggera V4", brand: "Ducati", price: 11200000 },
    { name: "BMW M1000RR", brand: "BMW", price: 4200000 },
    { name: "Honda Gold Wing", brand: "Honda", price: 3799000 },
    { name: "Ducati Streetfighter V4", brand: "Ducati", price: 2249000 },
    { name: "Triumph Speed Triple 1200 RS", brand: "Triumph", price: 1695000 },
  ];

  return bikes.map((bike) => ({
    id: generateId(),
    name: bike.name,
    description: `Experience the thrill of the ${bike.name}, a high-performance superbike designed for speed enthusiasts and racing professionals alike. With cutting-edge technology and aerodynamic design, this bike delivers unmatched performance on both track and road.`,
    price: bike.price,
    images: getRandomImages("superbikes"),
    category: "superbikes",
    brand: bike.brand,
    year: 2023 + Math.floor(Math.random() * 2),
    inStock: Math.random() > 0.2,
    features: [
      "Aerodynamic Design",
      "Advanced Electronic Control Systems",
      "Brembo Brakes",
      "Öhlins Suspension",
      "Quick Shifter",
      "Full LED Lighting",
    ],
    specs: {
      engine: `${800 + Math.floor(Math.random() * 400)}cc`,
      power: `${160 + Math.floor(Math.random() * 60)} HP`,
      torque: `${90 + Math.floor(Math.random() * 30)} Nm`,
      weight: `${170 + Math.floor(Math.random() * 30)} kg`,
      topSpeed: `${280 + Math.floor(Math.random() * 40)} km/h`,
      acceleration: `${2.5 + Math.random().toFixed(1)} seconds (0-100 km/h)`,
    },
  }));
};

// Sample data for luxury cars
const generateLuxuryCars = (): Product[] => {
  const luxuryCars = [
    { name: "Rolls-Royce Phantom", brand: "Rolls-Royce", price: 97900000 },
    { name: "Bentley Continental GT", brand: "Bentley", price: 35000000 },
    { name: "Mercedes-Maybach S-Class", brand: "Mercedes-Benz", price: 27000000 },
    { name: "Aston Martin DB11", brand: "Aston Martin", price: 38000000 },
    { name: "BMW 7 Series", brand: "BMW", price: 17000000 },
    { name: "Audi A8 L", brand: "Audi", price: 13000000 },
    { name: "Lexus LS", brand: "Lexus", price: 19000000 },
    { name: "Jaguar XJ", brand: "Jaguar", price: 12500000 },
    { name: "Maserati Quattroporte", brand: "Maserati", price: 17500000 },
    { name: "Range Rover Autobiography", brand: "Land Rover", price: 25000000 },
    { name: "Bentley Bentayga", brand: "Bentley", price: 40000000 },
    { name: "Rolls-Royce Cullinan", brand: "Rolls-Royce", price: 69500000 },
    { name: "Mercedes-Benz S-Class", brand: "Mercedes-Benz", price: 16000000 },
    { name: "BMW X7", brand: "BMW", price: 16500000 },
    { name: "Porsche Panamera", brand: "Porsche", price: 15600000 },
    { name: "Genesis G90", brand: "Genesis", price: 8900000 },
  ];

  return luxuryCars.map((car) => ({
    id: generateId(),
    name: car.name,
    description: `The ${car.name} represents the pinnacle of luxury automotive engineering, combining exquisite craftsmanship with cutting-edge technology. Experience unparalleled comfort and sophistication with this premium luxury vehicle designed for discerning individuals.`,
    price: car.price,
    images: getRandomImages("luxury-cars"),
    category: "luxury-cars",
    brand: car.brand,
    year: 2023 + Math.floor(Math.random() * 2),
    inStock: Math.random() > 0.2,
    features: [
      "Premium Leather Interiors",
      "Handcrafted Wood Finishes",
      "Massage Seats",
      "Advanced Driver Assistance Systems",
      "Premium Sound System",
      "Ambient Lighting",
      "Executive Rear Seating",
    ],
    specs: {
      engine: `${4.0 + (Math.random() * 4).toFixed(1)}L ${Math.random() > 0.5 ? "V8" : "V12"}`,
      power: `${400 + Math.floor(Math.random() * 300)} HP`,
      torque: `${600 + Math.floor(Math.random() * 300)} Nm`,
      transmission: "8-Speed Automatic",
      driveType: Math.random() > 0.5 ? "All-Wheel Drive" : "Rear-Wheel Drive",
      acceleration: `${3 + Math.random().toFixed(1)} seconds (0-100 km/h)`,
    },
  }));
};

// Sample data for sports cars
const generateSportsCars = (): Product[] => {
  const sportsCars = [
    { name: "Ferrari 488 GTB", brand: "Ferrari", price: 42000000 },
    { name: "Lamborghini Huracán", brand: "Lamborghini", price: 33000000 },
    { name: "Porsche 911 Turbo S", brand: "Porsche", price: 32000000 },
    { name: "McLaren 720S", brand: "McLaren", price: 48900000 },
    { name: "Audi R8", brand: "Audi", price: 24900000 },
    { name: "Nissan GT-R", brand: "Nissan", price: 21200000 },
    { name: "Chevrolet Corvette Z06", brand: "Chevrolet", price: 15500000 },
    { name: "Mercedes-AMG GT", brand: "Mercedes-Benz", price: 27500000 },
    { name: "Aston Martin Vantage", brand: "Aston Martin", price: 31500000 },
    { name: "Jaguar F-Type", brand: "Jaguar", price: 15000000 },
    { name: "Ferrari SF90 Stradale", brand: "Ferrari", price: 75000000 },
    { name: "Lamborghini Aventador", brand: "Lamborghini", price: 55000000 },
    { name: "Porsche Taycan Turbo S", brand: "Porsche", price: 23000000 },
    { name: "BMW M8 Competition", brand: "BMW", price: 24200000 },
    { name: "Maserati MC20", brand: "Maserati", price: 35000000 },
    { name: "Lotus Evija", brand: "Lotus", price: 210000000 },
  ];

  return sportsCars.map((car) => ({
    id: generateId(),
    name: car.name,
    description: `The ${car.name} is engineered for maximum performance and driving pleasure. With a perfect balance of power, handling, and design, this sports car delivers an exhilarating driving experience that will leave you breathless. Track-ready yet comfortable enough for daily use.`,
    price: car.price,
    images: getRandomImages("sports-cars"),
    category: "sports-cars",
    brand: car.brand,
    year: 2023 + Math.floor(Math.random() * 2),
    inStock: Math.random() > 0.2,
    features: [
      "Carbon Fiber Components",
      "Active Aerodynamics",
      "Race-Inspired Cockpit",
      "Drive Mode Selector",
      "Launch Control",
      "Carbon Ceramic Brakes",
      "Sport-Tuned Suspension",
    ],
    specs: {
      engine: `${3.0 + (Math.random() * 5).toFixed(1)}L ${Math.random() > 0.3 ? "V8" : "V10"}`,
      power: `${500 + Math.floor(Math.random() * 300)} HP`,
      torque: `${650 + Math.floor(Math.random() * 350)} Nm`,
      topSpeed: `${300 + Math.floor(Math.random() * 50)} km/h`,
      transmission: Math.random() > 0.5 ? "8-Speed Dual-Clutch" : "7-Speed PDK",
      acceleration: `${2.5 + Math.random().toFixed(1)} seconds (0-100 km/h)`,
    },
  }));
};

// Main product data generation
const generateAllProducts = (): Product[] => {
  const superbikes = generateSuperbikes();
  const luxuryCars = generateLuxuryCars();
  const sportsCars = generateSportsCars();
  
  return [...superbikes, ...luxuryCars, ...sportsCars];
};

// Hook to access products
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      // Simulate API fetch with setTimeout
      const timer = setTimeout(() => {
        const generatedProducts = generateAllProducts();
        setProducts(generatedProducts);
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load products'));
      setIsLoading(false);
    }
  }, []);

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => product.category === category);
  };

  const getProductsByBrand = (brand: string): Product[] => {
    return products.filter(product => product.brand === brand);
  };

  const getFilteredProducts = (
    category?: string,
    brand?: string,
    minPrice?: number,
    maxPrice?: number
  ): Product[] => {
    return products.filter(product => {
      if (category && product.category !== category) return false;
      if (brand && product.brand !== brand) return false;
      if (minPrice && product.price < minPrice) return false;
      if (maxPrice && product.price > maxPrice) return false;
      return true;
    });
  };

  return {
    products,
    isLoading,
    error,
    getProductById,
    getProductsByCategory,
    getProductsByBrand,
    getFilteredProducts,
  };
};
