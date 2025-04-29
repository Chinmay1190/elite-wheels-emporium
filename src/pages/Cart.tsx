
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, BadgeIndianRupee, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { useToast } from "@/components/ui/use-toast";

// Format Indian Rupees
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const EmptyCart = () => (
  <div className="text-center py-12 max-w-md mx-auto">
    <div className="bg-muted/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
      <ShoppingCart className="w-10 h-10 text-muted-foreground" />
    </div>
    <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
    <p className="text-muted-foreground mb-6">
      Looks like you haven't added any vehicles to your cart yet.
    </p>
    <Button asChild>
      <Link to="/products">
        <ArrowLeft className="mr-2 h-4 w-4" /> Browse Products
      </Link>
    </Button>
  </div>
);

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invalid Coupon",
      description: "The coupon code you entered is invalid or expired",
      variant: "destructive",
    });
    setCouponCode("");
  };

  const proceedToCheckout = () => {
    // In a real application, this would redirect to the checkout page
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="luxury-container py-8 md:py-12">
        <h1 className="page-title mb-10">Shopping Cart</h1>
        <EmptyCart />
      </div>
    );
  }

  // Calculate totals
  const subtotal = totalPrice;
  const gst = subtotal * 0.18; // 18% GST
  const grandTotal = subtotal + gst;

  return (
    <div className="luxury-container py-8 md:py-12">
      <h1 className="page-title mb-10">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                <Button variant="ghost" size="sm" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id}>
                  <div className="flex flex-col sm:flex-row gap-4 py-4">
                    <div className="w-full sm:w-24 h-24 overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div>
                          <h3 className="font-medium">
                            <Link to={`/products/${item.id}`} className="hover:text-primary">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground capitalize">
                            {item.category.replace('-', ' ')}
                          </p>
                        </div>
                        
                        <div className="mt-2 sm:mt-0 text-right">
                          <p className="font-semibold">{formatPrice(item.price)}</p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(item.price)} each
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between mt-4">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            className="h-8 w-12 rounded-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-2" />
                </div>
              ))}
              
              <div className="mt-4">
                <Button variant="outline" asChild>
                  <Link to="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>{formatPrice(gst)}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between font-semibold">
                  <span>Grand Total</span>
                  <div className="flex items-center">
                    <BadgeIndianRupee className="h-4 w-4 mr-1 text-primary" />
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyCoupon}>
                    Apply
                  </Button>
                </div>
                
                <Button className="w-full" size="lg" onClick={proceedToCheckout}>
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="mt-4 text-sm text-center text-muted-foreground">
                  <p>Your purchase is secured by 256-bit encryption.</p>
                  <div className="flex justify-center mt-2 space-x-2">
                    <span>Secure payment methods:</span>
                    <span className="font-medium">UPI</span>
                    <span>•</span>
                    <span className="font-medium">Credit Card</span>
                    <span>•</span>
                    <span className="font-medium">NetBanking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
