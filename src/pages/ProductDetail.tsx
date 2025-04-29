
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, BadgeIndianRupee, ArrowLeft } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/providers/CartProvider";
import ProductCard from "@/components/products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, products, isLoading, error } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  const product = id ? getProductById(id) : undefined;

  useEffect(() => {
    if (product && products.length > 0) {
      const sameCategoryProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
      setRelatedProducts(sameCategoryProducts);
    }
  }, [product, products]);

  useEffect(() => {
    // Reset active image index when product changes
    setActiveImageIndex(0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      });
      navigate("/cart");
    }
  };

  if (isLoading) {
    return (
      <div className="luxury-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="flex gap-2">
              {[1, 2, 3].map((_, i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-md" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="luxury-container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-muted-foreground mb-6">
          Sorry, the product you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" /> Browse All Products
          </Link>
        </Button>
      </div>
    );
  }

  const categoryLabel = 
    product.category === "superbikes" ? "Superbike" : 
    product.category === "luxury-cars" ? "Luxury Car" : "Sports Car";

  const categoryColor = 
    product.category === "superbikes" ? "bg-red-500" : 
    product.category === "luxury-cars" ? "bg-blue-600" : "bg-amber-500";

  return (
    <>
      <div className="luxury-container py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <Link to="/" className="hover:underline text-muted-foreground">Home</Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link to="/products" className="hover:underline text-muted-foreground">Products</Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link 
            to={`/category/${product.category}`} 
            className="hover:underline text-muted-foreground"
          >
            {categoryLabel}s
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-border bg-card h-96">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex gap-3 overflow-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`rounded-md overflow-hidden border-2 ${
                    activeImageIndex === index ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-20 w-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Badge 
                  className={`${categoryColor} hover:${categoryColor} text-white`}
                >
                  {categoryLabel}
                </Badge>
                {!product.inStock && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">{product.name}</h1>
              <div className="flex items-center gap-1 my-2">
                <span className="text-lg text-muted-foreground">{product.brand}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-lg text-muted-foreground">{product.year}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <BadgeIndianRupee className="h-6 w-6 text-primary" />
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            </div>

            <p className="text-lg text-muted-foreground">{product.description}</p>

            <div className="flex flex-wrap gap-4">
              <Button 
                className="flex-1" 
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button 
                variant="secondary" 
                className="flex-1"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs for Details, Specs, Features */}
        <Tabs defaultValue="details" className="mt-10">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4 p-4 border rounded-lg">
            <Card>
              <CardHeader>
                <CardTitle>About {product.name}</CardTitle>
                <CardDescription>Detailed information about this {categoryLabel.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{product.description}</p>
                <p className="mb-4">
                  The {product.name} exemplifies state-of-the-art engineering and design, showcasing the very best in automotive technology. Built to exacting standards, this {product.year} model delivers exceptional performance without compromising on comfort or style.
                </p>
                <p>
                  Whether you're an enthusiast seeking the ultimate driving experience or a collector looking to own a piece of automotive excellence, the {product.name} by {product.brand} represents a perfect blend of innovation, craftsmanship, and character.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4 p-4 border rounded-lg">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
                <CardDescription>Performance and technical details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="py-2 border-b">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features" className="mt-4 p-4 border rounded-lg">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>What makes this {categoryLabel.toLowerCase()} special</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc pl-5">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-muted-foreground">
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
