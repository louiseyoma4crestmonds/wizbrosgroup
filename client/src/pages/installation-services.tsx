import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Send, ShoppingBag, ArrowLeft } from "lucide-react";

const deliveryOptions = [
  {
    title: "Residential Electrical Installation",
    description: "For homes, apartments, and residential estates: House wiring and rewiring, Distribution board installation, Indoor and outdoor lighting, Ceiling fan installation, Socket and switch installation.",
    icon: Send,
    href: "/electrical-installations",
    color: "bg-blue-500/10 dark:bg-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    buttonText: "Book Now",
    bgImage: "/residential-installation.jpg",
  },
  {
    title: "Commercial Electrical Installation",
    description: "For offices, shops, malls, schools, and hotels: Office wiring, Commercial lighting systems, Power distribution systems, Energy-efficient upgrades, Emergency lighting, Electrical maintenance contracts.",
    icon: ShoppingBag,
    href: "/electrical-installations",
    color: "bg-green-500/10 dark:bg-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
    buttonText: "Book Now",
    bgImage: "/commercial-installation.jpg",
  },
  {
    title: "Industrial Electrical Installation",
    description: "For factories, warehouses, and manufacturing plants: Industrial control panels, Three-phase power systems, Motor installation, Machine power connections, Cable tray installation, Preventive maintenance. ",
    icon: ShoppingBag,
    href: "/electrical-installations",
    color: "bg-green-500/10 dark:bg-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
    buttonText: "Book Now",
    bgImage: "/industrial-installation.jpg",
  },
  {
    title: "Solar Power Installation",
    description: "One of the fastest-growing electrical services: Solar panel installation, Inverter setup, Battery storage solutions, solar street lights, Off-grid solar systems, Solar maintenance and repairs.",
    icon: ShoppingBag,
    href: "/electrical-installations",
    color: "bg-green-500/10 dark:bg-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
    buttonText: "Book Now",
    bgImage: "/solar-installation.jpg",
  },
  {
    title: "CCTV & Security Systems Installation",
    description: "CCTV camera installation, DVR/NVR setup, Access control systems, Video doorbells, Security alarm systems",
    icon: ShoppingBag,
    href: "/electrical-installations",
    color: "bg-green-500/10 dark:bg-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
    buttonText: "Book Now",
    bgImage: "/cctv-installation.jpg",
  },
  {
    title: "Generator Installation",
    description: "Generator installation, Automatic transfer switch (ATS), Generator servicing, Generator synchronization, Changeover switch installation.",
    icon: ShoppingBag,
    href: "/electrical-installations",
    color: "bg-green-500/10 dark:bg-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
    buttonText: "Book Now",
    bgImage: "/generator-installation.jpg",
  },

];

export default function InstallationServices() {
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
          <Link href="/electricals">
            <Button variant="ghost" size="sm" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Electricals
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-delivery-title">Electrical Installation Services</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            We offer the following Electrical installation services
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-cover bg-center bg-no-repeat"
          
        >
          {deliveryOptions.map((option) => (
            <div className="" >
              <Card key={option.title} style={{ backgroundImage: `url('${option.bgImage}')` }} className="bg-cover bg-center bg-no-repeat hover:opacity-90 overflow-visible" data-testid={`card-${option.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardContent className="p-8 md:p-12 flex flex-col place-content-center text-center min-h-[320px]">
                  <div className="w-full text-4xl text-white hover:text-black font-bold h-full flex flex-col flex-col-reverse self-center place-content-center">
                    {option.title}
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
