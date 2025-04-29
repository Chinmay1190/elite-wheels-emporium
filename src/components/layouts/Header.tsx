
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ThemeToggle from "@/components/ui/theme-toggle";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="luxury-container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-luxury-red to-luxury-gold bg-clip-text text-transparent">
              Elite Wheels
            </span>
          </Link>
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/category/superbikes"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Superbikes</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              High-performance motorcycles from top manufacturers
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/category/luxury-cars"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Luxury Cars</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Premium automobiles with superior comfort and features
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/category/sports-cars"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Sports Cars</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              High-performance vehicles built for speed and agility
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/products"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">All Products</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Browse our complete collection of elite vehicles
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/products" className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                    Products
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about" className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                    About
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact" className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs bg-primary">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link to="/account">Account</Link>
          </Button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 flex flex-col gap-1">
              <span className={cn(
                "block h-0.5 w-6 bg-foreground transition-transform duration-300",
                isMobileMenuOpen && "translate-y-1.5 rotate-45"
              )}></span>
              <span className={cn(
                "block h-0.5 w-6 bg-foreground transition-opacity duration-300",
                isMobileMenuOpen && "opacity-0"
              )}></span>
              <span className={cn(
                "block h-0.5 w-6 bg-foreground transition-transform duration-300",
                isMobileMenuOpen && "-translate-y-1.5 -rotate-45"
              )}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-t border-border animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/category/superbikes" className="text-sm font-medium" onClick={toggleMobileMenu}>
              Superbikes
            </Link>
            <Link to="/category/luxury-cars" className="text-sm font-medium" onClick={toggleMobileMenu}>
              Luxury Cars
            </Link>
            <Link to="/category/sports-cars" className="text-sm font-medium" onClick={toggleMobileMenu}>
              Sports Cars
            </Link>
            <Separator />
            <Link to="/products" className="text-sm font-medium" onClick={toggleMobileMenu}>
              All Products
            </Link>
            <Link to="/about" className="text-sm font-medium" onClick={toggleMobileMenu}>
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium" onClick={toggleMobileMenu}>
              Contact
            </Link>
            <Link to="/account" className="text-sm font-medium" onClick={toggleMobileMenu}>
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
