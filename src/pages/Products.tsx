
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import { useProducts, Product } from "@/hooks/useProducts";
import { ArrowUpIcon, ArrowDownIcon, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

// Function to filter and sort products
const filterAndSortProducts = (
  products: Product[],
  category?: string,
  brand?: string,
  priceRange: [number, number] = [0, 999999999],
  sort: string = "newest"
): Product[] => {
  // Filter products
  let filteredProducts = [...products];
  
  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }
  
  if (brand) {
    filteredProducts = filteredProducts.filter((p) => p.brand === brand);
  }
  
  filteredProducts = filteredProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Sort products
  switch (sort) {
    case "price-low":
      return filteredProducts.sort((a, b) => a.price - b.price);
    case "price-high":
      return filteredProducts.sort((a, b) => b.price - a.price);
    case "name-asc":
      return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    case "newest":
    default:
      return filteredProducts.sort((a, b) => b.year - a.year);
  }
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const { products, isLoading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterCount, setFilterCount] = useState(0);

  // Get initial filters from URL params
  const initialCategory = searchParams.get("category") || undefined;
  const initialBrand = searchParams.get("brand") || undefined;
  const initialMinPrice = parseInt(searchParams.get("minPrice") || "0");
  const initialMaxPrice = parseInt(searchParams.get("maxPrice") || "999999999");
  const initialSort = searchParams.get("sort") || "newest";

  const [filters, setFilters] = useState({
    category: initialCategory,
    brand: initialBrand,
    priceRange: [initialMinPrice, initialMaxPrice] as [number, number],
    sort: initialSort,
  });

  // Handle filter changes from the filter component
  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Apply filters when products or filters change
  useEffect(() => {
    if (!isLoading && products.length > 0) {
      const filtered = filterAndSortProducts(
        products,
        filters.category,
        filters.brand,
        filters.priceRange,
        filters.sort
      );
      
      setFilteredProducts(filtered);
      
      // Count active filters
      let count = 0;
      if (filters.category) count++;
      if (filters.brand) count++;
      if (
        filters.priceRange[0] !== 0 || 
        filters.priceRange[1] !== 999999999
      ) count++;
      
      setFilterCount(count);
    }
  }, [products, filters, isLoading]);

  const getSortIcon = () => {
    if (filters.sort === "price-low") return <ArrowUpIcon className="h-4 w-4" />;
    if (filters.sort === "price-high") return <ArrowDownIcon className="h-4 w-4" />;
    return null;
  };

  return (
    <div className="luxury-container py-8 md:py-12">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">
          {filters.category
            ? `${
                filters.category === "superbikes" 
                ? "Superbikes" 
                : filters.category === "luxury-cars" 
                ? "Luxury Cars" 
                : "Sports Cars"
              }`
            : "All Premium Vehicles"}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {filters.category
            ? `Explore our collection of high-performance ${
                filters.category === "superbikes" 
                ? "motorcycles" 
                : filters.category === "luxury-cars" 
                ? "luxury automobiles" 
                : "sports vehicles"
              } from the world's most prestigious brands.`
            : "Discover the finest collection of superbikes, luxury cars, and sports cars from elite manufacturers around the world."}
        </p>
      </div>

      {/* Mobile Filter Button */}
      <div className="flex justify-between items-center mb-6 md:hidden">
        <div>
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} products
          </p>
        </div>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {filterCount > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {filterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <ProductFilters allProducts={products} onFilterChange={handleFilterChange} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block">
          <ProductFilters allProducts={products} onFilterChange={handleFilterChange} />
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">
          {/* Results info - Desktop */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm mr-2">Sort: </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
              >
                {filters.sort === "newest" && "Newest"}
                {filters.sort === "price-low" && "Price: Low to High"}
                {filters.sort === "price-high" && "Price: High to Low"}
                {filters.sort === "name-asc" && "Name: A to Z"}
                {filters.sort === "name-desc" && "Name: Z to A"}
                {getSortIcon()}
              </Button>
            </div>
          </div>

          {error ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-bold mb-2">Error Loading Products</h2>
              <p className="text-muted-foreground">
                There was a problem loading the products. Please try again later.
              </p>
            </div>
          ) : filteredProducts.length === 0 && !isLoading ? (
            <div className="text-center py-12 border rounded-lg bg-card">
              <h2 className="text-xl font-bold mb-2">No Products Found</h2>
              <p className="text-muted-foreground mb-4">
                No products match your current filter selections.
              </p>
              <Button 
                onClick={() => handleFilterChange({
                  category: undefined,
                  brand: undefined,
                  priceRange: [0, 999999999],
                  sort: "newest",
                })}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
