
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/products/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { ArrowRight } from "lucide-react";

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const HeroSection = () => (
  <section className="relative bg-black text-white">
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2070"
        alt="Luxury sports car"
        className="w-full h-full object-cover opacity-60"
      />
    </div>
    <div className="luxury-container relative z-10 py-20 md:py-32 lg:py-40">
      <div className="max-w-2xl">
        <Badge 
          className="mb-4 bg-white/10 hover:bg-white/20 text-white border-none"
        >
          New Arrivals
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
          Elite Performance, <br />Unmatched Luxury
        </h1>
        <p className="text-lg md:text-xl mb-6 text-white/80 max-w-lg">
          Discover the world's most exclusive collection of superbikes, luxury cars, and high-performance sports cars.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" asChild>
            <Link to="/products">Explore Collection</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black" asChild>
            <Link to="/category/luxury-cars">Luxury Cars</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const CategorySection = () => {
  const categories = [
    {
      name: "Superbikes",
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070",
      description: "High-performance motorcycles from top manufacturers",
      slug: "superbikes",
      color: "from-red-500/80 to-red-700/80",
    },
    {
      name: "Luxury Cars",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070",
      description: "Premium automobiles with superior comfort and features",
      slug: "luxury-cars",
      color: "from-blue-600/80 to-blue-800/80",
    },
    {
      name: "Sports Cars",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070",
      description: "High-performance vehicles built for speed and agility",
      slug: "sports-cars",
      color: "from-amber-500/80 to-amber-700/80",
    },
  ];

  return (
    <section className="luxury-container py-16 md:py-20">
      <h2 className="section-title text-center mb-10">Browse by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link 
            key={category.slug} 
            to={`/category/${category.slug}`} 
            className="group"
          >
            <div className="relative overflow-hidden rounded-lg h-64">
              <img 
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${category.color} flex flex-col justify-end p-6`}>
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-white/90 mb-4">{category.description}</p>
                <span className="text-white flex items-center text-sm font-medium">
                  View Collection <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const FeaturedSection = () => {
  const { products, isLoading } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      // Get 4 random products for featured section
      const randomProducts = [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
        
      setFeaturedProducts(randomProducts);
    }
  }, [products]);

  if (isLoading || featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted/50">
      <div className="luxury-container py-16 md:py-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="section-title mb-0">Featured Vehicles</h2>
          <Button variant="outline" asChild>
            <Link to="/products">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BrandsSection = () => {
  const brands = [
    { name: "Ferrari", logo: "https://www.carlogos.org/car-logos/ferrari-logo-750x1100.png" },
    { name: "Lamborghini", logo: "https://www.carlogos.org/logo/Lamborghini-logo-1920x1080.png" },
    { name: "Rolls-Royce", logo: "https://www.carlogos.org/car-logos/rolls-royce-logo-2018-900x1000.png" },
    { name: "Ducati", logo: "https://www.carlogos.org/bike-logos/ducati-logo-750x1100.png" },
    { name: "BMW", logo: "https://www.carlogos.org/car-logos/bmw-logo-2020-blue-white-900x1000.png" },
    { name: "Mercedes-Benz", logo: "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011-2500x2500.png" },
  ];

  return (
    <section className="luxury-container py-16">
      <h2 className="section-title text-center">Premium Brands</h2>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        We partner with the world's most prestigious automotive and motorcycle brands to bring you exceptional quality and performance.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {brands.map((brand) => (
          <div 
            key={brand.name} 
            className="flex justify-center items-center p-4 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
          >
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="h-12 md:h-16 w-auto object-contain" 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Sharma",
      position: "CEO, Tech Innovations",
      quote: "Elite Wheels Emporium provided an exceptional buying experience. Their collection of luxury cars is unmatched, and their service is impeccable.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Patel",
      position: "Professional Racer",
      quote: "As a professional racer, I demand the best performance bikes. Elite Wheels consistently delivers top-quality superbikes with excellent aftercare service.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Vikram Singh",
      position: "Luxury Car Collector",
      quote: "I've been collecting luxury vehicles for over 15 years, and Elite Wheels has become my go-to dealer. Their knowledge and selection are unmatched.",
      image: "https://randomuser.me/api/portraits/men/86.jpg",
    },
  ];

  return (
    <section className="bg-muted/30">
      <div className="luxury-container py-16 md:py-20">
        <h2 className="section-title text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
              <p className="italic text-muted-foreground flex-grow">"{testimonial.quote}"</p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const CtaSection = () => (
  <section className="luxury-container py-16 md:py-20">
    <div className="bg-gradient-to-r from-primary/90 to-luxury-red rounded-lg p-8 md:p-12 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Luxury?</h2>
      <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
        Browse our exclusive collection of premium vehicles and find your perfect match. Elite performance awaits you.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" variant="secondary" asChild>
          <Link to="/products">Explore All Products</Link>
        </Button>
        <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedSection />
      <BrandsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
};

export default Home;
