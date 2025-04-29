
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/hooks/useProducts";

type ProductFiltersProps = {
  allProducts: Product[];
  onFilterChange: (filters: {
    category?: string;
    brand?: string;
    priceRange: [number, number];
    sort?: string;
  }) => void;
};

const ProductFilters = ({ allProducts, onFilterChange }: ProductFiltersProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const initialCategory = searchParams.get("category") || "all";
  const initialBrand = searchParams.get("brand") || "all";
  const initialSort = searchParams.get("sort") || "newest";
  
  // Find min and max prices from products
  const minProductPrice = Math.min(...allProducts.map(p => p.price));
  const maxProductPrice = Math.max(...allProducts.map(p => p.price));

  const [category, setCategory] = useState<string>(initialCategory);
  const [brand, setBrand] = useState<string>(initialBrand);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseInt(searchParams.get("minPrice") || minProductPrice.toString()),
    parseInt(searchParams.get("maxPrice") || maxProductPrice.toString()),
  ]);
  const [sort, setSort] = useState<string>(initialSort);
  const [displayPriceRange, setDisplayPriceRange] = useState<[number, number]>(priceRange);

  // Extract unique brands from products
  const allBrands = Array.from(new Set(allProducts.map(p => p.brand))).sort();

  // Format Indian Rupees
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Apply filters and update URL
  const applyFilters = () => {
    const filters = {
      category: category !== "all" ? category : undefined,
      brand: brand !== "all" ? brand : undefined,
      priceRange,
      sort,
    };

    onFilterChange(filters);

    // Update URL search params
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (brand !== "all") params.set("brand", brand);
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    params.set("sort", sort);

    navigate({ search: params.toString() });
  };

  // Reset filters
  const resetFilters = () => {
    setCategory("all");
    setBrand("all");
    setPriceRange([minProductPrice, maxProductPrice]);
    setDisplayPriceRange([minProductPrice, maxProductPrice]);
    setSort("newest");

    onFilterChange({
      category: undefined,
      brand: undefined,
      priceRange: [minProductPrice, maxProductPrice],
      sort: "newest",
    });

    navigate({ search: "" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters();
    }, 500);

    return () => clearTimeout(timer);
  }, [category, brand, sort]);

  useEffect(() => {
    setDisplayPriceRange(priceRange);
  }, [priceRange]);

  const handlePriceChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]];
    setDisplayPriceRange(newRange);
  };

  const handlePriceChangeEnd = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]];
    setPriceRange(newRange);
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-card">
      <div>
        <h3 className="text-lg font-medium mb-3">Filters</h3>
        {(category !== "all" || brand !== "all" || 
          priceRange[0] !== minProductPrice || 
          priceRange[1] !== maxProductPrice) && (
          <div className="flex flex-wrap gap-2 mb-3">
            {category !== "all" && (
              <Badge variant="secondary" className="px-2 py-1">
                Category: {category}
                <button 
                  className="ml-1 text-xs" 
                  onClick={() => setCategory("all")}
                >
                  ✕
                </button>
              </Badge>
            )}
            {brand !== "all" && (
              <Badge variant="secondary" className="px-2 py-1">
                Brand: {brand}
                <button 
                  className="ml-1 text-xs" 
                  onClick={() => setBrand("all")}
                >
                  ✕
                </button>
              </Badge>
            )}
            {(priceRange[0] !== minProductPrice || priceRange[1] !== maxProductPrice) && (
              <Badge variant="secondary" className="px-2 py-1">
                Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Clear All
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="superbikes">Superbikes</SelectItem>
              <SelectItem value="luxury-cars">Luxury Cars</SelectItem>
              <SelectItem value="sports-cars">Sports Cars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger>
              <SelectValue placeholder="Select a brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {allBrands.map(brand => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <Label htmlFor="price">Price Range</Label>
            <span className="text-sm text-muted-foreground">
              {formatPrice(displayPriceRange[0])} - {formatPrice(displayPriceRange[1])}
            </span>
          </div>
          <Slider
            value={displayPriceRange}
            min={minProductPrice}
            max={maxProductPrice}
            step={100000}
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceChangeEnd}
            className="my-6"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatPrice(minProductPrice)}</span>
            <span>{formatPrice(maxProductPrice)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger>
              <SelectValue placeholder="Sort products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
