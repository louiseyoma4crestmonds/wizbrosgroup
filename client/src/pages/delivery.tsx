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
    buttonText: "Send Now",
  },
  {
    title: "Order Products",
    description: "Browse our catalog of available products and order directly. We handle the delivery straight to your doorstep with real-time tracking.",
    icon: ShoppingBag,
    href: "/products",
    color: "bg-green-500/10 dark:bg-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
    buttonText: "Browse Products",
  },
];

export default function Delivery() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-semibold text-xl">Wizbros Group</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {deliveryOptions.map((option) => (
            <Card key={option.title} className="overflow-visible" data-testid={`card-${option.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <CardContent className="p-8 md:p-12 flex flex-col items-center text-center min-h-[320px]">
                <div className={`w-20 h-20 rounded-xl ${option.color} flex items-center justify-center mb-6`}>
                  <option.icon className={`w-10 h-10 ${option.iconColor}`} />
                </div>
                <h2 className="text-2xl font-semibold mb-4">{option.title}</h2>
                <p className="text-muted-foreground mb-8 flex-grow">{option.description}</p>
                <Link href={option.href} className="w-full">
                  <Button className="w-full" size="lg" data-testid={`button-${option.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    {option.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
