import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Package, Headphones, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: typeof MapPin;
}

export default function ComingSoon() {
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

      <main className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
            </div>
            <div className="w-12 h-12 mx-auto rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
              <Construction className="w-6 h-6 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2" data-testid="text-placeholder-title">Coming Soon</h1>
            <p className="text-muted-foreground mb-6">This service is available soon!!</p>
            <Link href="/">
              <Button variant="outline" data-testid="button-go-home">
                Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

