import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Truck, LogOut, Plus, Pencil, Trash2, Package, 
  DollarSign, CheckCircle, XCircle, X, ImageIcon
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Product, InsertProduct } from "@shared/schema";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const productFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(1, "Price must be at least $0.01"),
  imageUrl: z.string().url("Please enter a valid URL").or(z.literal("")),
  category: z.string().min(1, "Please select a category"),
  inStock: z.boolean(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Other"];

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(cents / 100);
}

function ProductTableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton className="w-16 h-16 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      ))}
    </div>
  );
}

function ProductForm({ 
  product, 
  onSuccess, 
  onCancel 
}: { 
  product?: Product; 
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { toast } = useToast();
  const isEditing = !!product;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price ? product.price / 100 : 0,
      imageUrl: product?.imageUrl || "",
      category: product?.category || "",
      inStock: product?.inStock ?? true,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const res = await apiRequest("POST", "/api/products", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product Created",
        description: "The product has been added successfully.",
      });
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create product",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const res = await apiRequest("PATCH", `/api/products/${product!.id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product Updated",
        description: "The product has been updated successfully.",
      });
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: ProductFormValues) => {
    const data: InsertProduct = {
      name: values.name,
      description: values.description,
      price: Math.round(values.price * 100),
      imageUrl: values.imageUrl || "",
      category: values.category,
      inStock: values.inStock,
    };

    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} data-testid="input-product-name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-product-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter product description..." 
                  className="resize-none min-h-[100px]"
                  {...field} 
                  data-testid="input-product-description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (NGN)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00" 
                      className="pl-4"
                      {...field} 
                      data-testid="input-product-price"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inStock"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel className="mb-3">Availability</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <Switch 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                      data-testid="switch-product-instock"
                    />
                    <span className="text-sm text-muted-foreground">
                      {field.value ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="https://example.com/image.jpg" 
                    className="pl-10"
                    {...field} 
                    data-testid="input-product-image"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("imageUrl") && (
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Image Preview</p>
            <img 
              src={form.watch("imageUrl")} 
              alt="Preview"
              className="max-h-48 rounded-md object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel-product">
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} data-testid="button-save-product">
            {isPending ? "Saving..." : isEditing ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: session } = useQuery({
    queryKey: ["/api/admin/session"],
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/admin/logout", {});
    },
    onSuccess: () => {
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
      setLocation("/admin/login");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/products/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product Deleted",
        description: "The product has been removed.",
      });
      setDeleteProduct(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      });
    },
  });

  const handleOpenCreate = () => {
    setEditingProduct(undefined);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingProduct(undefined);
  };

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
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">Admin Portal</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold" data-testid="text-dashboard-title">Product Management</h1>
            <p className="text-muted-foreground">Add, edit, and manage your product catalog</p>
          </div>
          <Button onClick={handleOpenCreate} data-testid="button-add-product">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold" data-testid="text-total-products">{products?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold" data-testid="text-in-stock">
                    {products?.filter(p => p.inStock).length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">In Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold" data-testid="text-out-of-stock">
                    {products?.filter(p => !p.inStock).length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between gap-4 flex-wrap">
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ProductTableSkeleton />
            ) : products && products.length > 0 ? (
              <div className="space-y-4">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex items-center gap-4 p-4 border rounded-lg"
                    data-testid={`row-product-${product.id}`}
                  >
                    <div className="w-16 h-16 rounded-md bg-muted overflow-hidden flex-shrink-0">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                        <Badge variant={product.inStock ? "default" : "secondary"} className="text-xs">
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold">{formatPrice(product.price)}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleOpenEdit(product)}
                        data-testid={`button-edit-${product.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setDeleteProduct(product)}
                        data-testid={`button-delete-${product.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">No Products Yet</h3>
                <p className="text-muted-foreground mb-4">Get started by adding your first product</p>
                <Button onClick={handleOpenCreate} data-testid="button-add-first-product">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update the product details below" : "Fill in the details to add a new product"}
            </DialogDescription>
          </DialogHeader>
          <ProductForm 
            product={editingProduct}
            onSuccess={handleFormSuccess}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteProduct} onOpenChange={() => setDeleteProduct(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteProduct?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteProduct && deleteMutation.mutate(deleteProduct.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
