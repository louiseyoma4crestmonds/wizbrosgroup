import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Logistics from "@/pages/logistics";
import Electricals from "@/pages/electricals";
import SendPackage from "@/pages/send-package";
import Products from "@/pages/products";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminElectricalDashboard from "@/pages/admin-electrical-dashboard";
import AdminSetup from "@/pages/admin-setup";
import ComingSoon from "@/pages/coming-soon";
import ElectricalInstallation from "@/pages/electrical-installations";
import ElectricalProducts from "@/pages/electrical-products";
import InstallationServices from "@/pages/installation-services";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/logistics" component={Logistics} />
      <Route path="/send-package" component={SendPackage} />
      <Route path="/products" component={Products} />
      <Route path="/coming-soon" component={ComingSoon} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/setup" component={AdminSetup} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/electrical-dashboard" component={AdminElectricalDashboard} />
      <Route path="/electricals" component={Electricals} />
      <Route path="/electrical-installations" component={ElectricalInstallation} />
      <Route path="/installation-services" component={InstallationServices} />
      <Route path="/electrical-products" component={ElectricalProducts} />
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
