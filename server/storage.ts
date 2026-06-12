import { 
  type User, type InsertUser, 
  type Product, type InsertProduct,
  type AdminUser, type InsertAdminUser,
  users, products, adminUsers,
  electricalproducts
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  
  getAdminUser(id: string): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(admin: InsertAdminUser): Promise<AdminUser>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  /* Electrical Products */

  async getElectricalProducts(): Promise<Product[]> {
    return await db.select().from(electricalproducts);
  }

  async getElectricalProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(electricalproducts).where(eq(products.id, id));
    return product || undefined;
  }

  async createElectricalProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(electricalproducts).values(product).returning();
    return newProduct;
  }

  async updateElectricalProduct(id: string, productUpdate: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db
      .update(electricalproducts)
      .set(productUpdate)
      .where(eq(electricalproducts.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteElectricalProduct(id: string): Promise<boolean> {
    const result = await db.delete(electricalproducts).where(eq(electricalproducts.id, id)).returning();
    return result.length > 0;
  }

  /* End Electrical Products */

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: string, productUpdate: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db
      .update(products)
      .set(productUpdate)
      .where(eq(products.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  }

  async getAdminUser(id: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return admin || undefined;
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return admin || undefined;
  }

  async createAdminUser(admin: InsertAdminUser): Promise<AdminUser> {
    const [newAdmin] = await db.insert(adminUsers).values(admin).returning();
    return newAdmin;
  }
}

export const storage = new DatabaseStorage();
