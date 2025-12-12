import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Delivery from "@/pages/delivery";
import SendPackage from "@/pages/send-package";
import Products from "@/pages/products";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import { TrackPackage, Warehouse, Support } from "@/pages/placeholder";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/delivery" component={Delivery} />
      <Route path="/send-package" component={SendPackage} />
      <Route path="/products" component={Products} />
      <Route path="/track" component={TrackPackage} />
      <Route path="/warehouse" component={Warehouse} />
      <Route path="/support" component={Support} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
