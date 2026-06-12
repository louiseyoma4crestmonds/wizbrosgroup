import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Send, ShoppingBag, ArrowLeft } from "lucide-react";

const deliveryOptions = [
  {
    title: "Installations",
    description: "Need electrical systems installed or upgraded? We deliver expert installation services, from wiring and lighting to CCTV and smart home solutions, ensuring safety and performance every step of the way.",
    icon: Send,
    href: "/installation-services",
    color: "bg-blue-500/10 dark:bg-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    buttonText: "Get Installation",
    bgImage: "/electrical-installation.jpg",
  },
  {
    title: "Order Products",
    description: "Shop high-quality electrical and electronic products for your home, office, or business. From essential components to advanced devices, we provide reliable products at affordable prices.",
    icon: ShoppingBag,
    href: "/electrical-products",
    color: "bg-green-500/10 dark:bg-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
    buttonText: "Browse Electronics",
    bgImage: "/electrical-sales.jpg",
  },
];

export default function Electricals() {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-delivery-title">Electrical Services</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Choose how you'd like to use our Electrical service
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
