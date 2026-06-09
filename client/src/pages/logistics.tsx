import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Send, ShoppingBag, ArrowLeft } from "lucide-react";

const deliveryOptions = [
  {
    title: "Send a Package",
    description: "Have something to send? We'll pick it up from your location and deliver it safely to the recipient. Fast, reliable, and tracked delivery service.",
    icon: Send,
    href: "/send-package",
    color: "bg-blue-500/10 dark:bg-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    buttonText: "Send a Package",
    bgImage: "/send-package-bg.png",
  },
  {
    title: "Order Products",
    description: "Browse our catalog of available products and order directly. We handle the delivery straight to your doorstep with real-time tracking.",
    icon: ShoppingBag,
    href: "/products",
    color: "bg-green-500/10 dark:bg-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
    buttonText: "Browse Products",
    bgImage: "/order-package.png",
  },
];

export default function Logistics() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-[150px] h-[80px] flex items-center justify-center">
                <img src="/logo.png" alt="Logo" />
              </div>
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-delivery-title">Delivery Services</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Choose how you'd like to use our delivery service
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-cover bg-center bg-no-repeat"
          
        >
          {deliveryOptions.map((option) => (
            <div className="" >
              <Card key={option.title} style={{ backgroundImage: `url('${option.bgImage}')` }} className="bg-cover bg-center bg-no-repeat overflow-visible" data-testid={`card-${option.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardContent className="p-8 md:p-12 flex flex-col place-content-center text-center min-h-[320px]">
                  <div className="w-full h-full flex flex-col flex-col-reverse self-center place-content-center">
                    
                  </div>
                  
                </CardContent>
              </Card>
              <h1 className="text-center mt-4 mb-8 flex-grow text-black">{option.description}</h1>
              <div className="w-full self-center h-full">
                <Link href={option.href} className="w-full">
                  <Button className="w-full" size="lg" data-testid={`button-${option.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    {option.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-[150px] h-[80px] flex items-center justify-center">
                  <img src="/logo.png" alt="Logo" />
                </div>
              </div>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            2026 Wizbros Group. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
