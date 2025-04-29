
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { cn } from "@/lib/utils";
import type { Product } from "@/hooks/useProducts";

// Format Indian Rupees
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

type ProductCardProps = {
  product: Product;
  className?: string;
};

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <Link to={`/products/${product.id}`} className="block overflow-hidden">
        <div className="h-48 overflow-hidden relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <Badge variant="destructive" className="text-lg font-bold py-1 px-3">
                Out of Stock
              </Badge>
            </div>
          )}
          <Badge 
            className="absolute top-2 right-2" 
            variant="outline"
            style={{
              backgroundColor: product.category === "superbikes" 
                ? "rgba(239, 68, 68, 0.9)" 
                : product.category === "luxury-cars" 
                ? "rgba(79, 70, 229, 0.9)" 
                : "rgba(245, 158, 11, 0.9)",
              color: "white"
            }}
          >
            {product.category === "superbikes" 
              ? "Superbike" 
              : product.category === "luxury-cars" 
              ? "Luxury Car" 
              : "Sports Car"}
          </Badge>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold line-clamp-1 mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{product.brand} • {product.year}</span>
        </div>
        <p className="text-xl font-bold">{formatPrice(product.price)}</p>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {product.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full" 
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
