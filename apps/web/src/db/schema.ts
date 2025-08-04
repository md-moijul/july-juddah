import { relations } from "drizzle-orm";
import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  certificateNumber: text("certificateNumber").notNull().unique(),
  name: text("name").notNull(),
  town: text("town"),
  phone: text("phone").unique(),
  isOtpVerified: boolean("isOtpVerified").notNull().default(false),
  referrerId: integer("referrerId"),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  shippingAddress: text("shippingAddress").notNull(),
  userId: integer("userId").notNull().references(() => users.id),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  orders: many(orders),
  referrer: one(users, {
    fields: [users.referrerId],
    references: [users.id],
    relationName: 'user_referrer',
  }),
  referredUsers: many(users, {
    relationName: 'user_referrer',
  }),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
}));
