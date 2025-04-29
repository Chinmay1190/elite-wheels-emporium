
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useCart } from "@/providers/CartProvider";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  
  // If the cart is not empty and this page is accessed directly, redirect to home
  useEffect(() => {
    if (cartItems.length > 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);
  
  // Generate random order number
  const orderNumber = Math.floor(10000000 + Math.random() * 90000000);
  
  return (
    <div className="luxury-container py-16 md:py-24 max-w-md mx-auto">
      <Card className="border-green-200">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl md:text-3xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-4">
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
          
          <div className="bg-muted/50 py-4 px-6 rounded-md mb-6">
            <div className="mb-2">
              <span className="text-sm text-muted-foreground">Order Number</span>
              <p className="font-medium">{orderNumber}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Date</span>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to your email address with all the details.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/account">View Order Status</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;
