import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminSetup() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setMessage(data.message || "Admin created successfully");
      } else {
        setError(data.message || "Failed to create admin");
      }
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-4 py-20">
        <Card>
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold mb-4">Create Admin Account</h1>
            <p className="text-sm text-muted-foreground mb-6">
              This will create a default admin account if one does not already exist. 
            </p>

            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Admin Username (fixed)</label>
                <Input value={"admin"} readOnly />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Admin Password (fixed)</label>
                <Input value={"admin123"} readOnly type="password" />
              </div>

              {message && <div className="text-sm text-green-600">{message}</div>}
              {error && <div className="text-sm text-destructive">{error}</div>}

              <div className="flex items-center gap-3">
                <Button onClick={handleCreate} disabled={loading} data-testid="button-create-admin">
                  {loading ? "Creating..." : "Create Admin"}
                </Button>
                <Link href="/admin/login">
                  <Button variant="ghost">Go to Admin Login</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
