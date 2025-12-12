import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Package, MapPin, Headphones } from "lucide-react";

const features = [
  {
    title: "Delivery Service",
    description: "Send packages or order products with fast, reliable delivery",
    icon: Truck,
    href: "/delivery",
    color: "bg-blue-500/10 dark:bg-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Track Package",
    description: "Real-time tracking for all your shipments",
    icon: MapPin,
    href: "/track",
    color: "bg-green-500/10 dark:bg-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Cinematography",
    description: "Take your professional pictures ",
    icon: Package,
    href: "/warehouse",
    color: "bg-orange-500/10 dark:bg-orange-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Support",
    description: "24/7 customer support for all your needs",
    icon: Headphones,
    href: "/support",
    color: "bg-purple-500/10 dark:bg-purple-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-semibold text-xl" data-testid="text-logo">Wizbros Group</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/delivery" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-delivery">
              Delivery
            </Link>
            <Link href="/track" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-track">
              Track
            </Link>
            <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-support">
              Support
            </Link>
          </nav>
          <Link href="/admin/login">
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-admin">
              Admin
            </span>
          </Link>
        </div>
      </header>

      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Qzk5OTkiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center py-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
            Fast & Reliable
            <span className="text-primary block mt-2">Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8" data-testid="text-hero-description">
            Your satisfaction is our priority.
          </p>
          <Link href="/delivery">
            <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-8 py-3 font-medium transition-colors hover:bg-primary/90" data-testid="button-get-started">
              Get Started
              <Truck className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4" data-testid="text-services-title">Our Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choose from our range of logistics services designed to meet all your shipping needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link href={feature.href} key={feature.title}>
                <Card className="h-full hover-elevate cursor-pointer transition-all duration-200" data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2" data-testid="text-stat-deliveries">10K+</div>
              <div className="text-sm text-muted-foreground">Deliveries Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2" data-testid="text-stat-customers">5K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2" data-testid="text-stat-cities">50+</div>
              <div className="text-sm text-muted-foreground">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2" data-testid="text-stat-rating">4.9</div>
              <div className="text-sm text-muted-foreground">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            <span className="font-medium">Wizbros Group</span>
          </div>
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            2024 Wizbros Group. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
