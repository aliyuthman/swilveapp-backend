import { 
  pgTable, 
  uuid, 
  varchar, 
  timestamp, 
  numeric, 
  text, 
  index,
  foreignKey
} from 'drizzle-orm/pg-core';

// ---- Users Table ----
export const users = pgTable('users', {

  role: varchar('role', { 
    enum: ['user', 'agent', 'super_agent'] 
  }).default('user'),
  commission_rate: numeric('commission_rate', {
    precision: 5,
    scale: 2
  }).default('0.05'),
  id: uuid('id').primaryKey().defaultRandom(),
  phone: varchar('phone', { length: 15 }).notNull().unique(),
  email: varchar('email', { length: 255 }).unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow()
}, (table) => ({
  phoneIdx: index('phone_idx').on(table.phone)
}));

// ---- Bill Categories Table ----
export const billCategories = pgTable('bill_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  flutterwaveCode: varchar('flutterwave_code', { length: 20 }).notNull()
});

// ---- Billers Table ----
export const billers = pgTable('billers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  categoryId: uuid('category_id').references(() => billCategories.id, { 
    onDelete: 'cascade' 
  }),
  validationRegex: text('validation_regex')
}, (table) => ({
  categoryIdx: index('category_idx').on(table.categoryId)
}));

// ---- Transactions Table ----
export const transactions = pgTable('transactions', {

  type: varchar('type', { 
    enum: ['bill', 'airtime', 'data', 'electricity'] 
  }).notNull(),
  network: varchar('network', { 
    enum: ['MTN', 'GLO', 'AIRTEL', '9MOBILE'] 
  }),
  phone: varchar('phone', { length: 15 }),
  data_plan: varchar('data_plan', { length: 50 }),
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { 
    onDelete: 'cascade' 
  }),
  billerId: uuid('biller_id').references(() => billers.id, { 
    onDelete: 'cascade' 
  }),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  status: varchar('status', { length: 20 })
    .$type<'pending' | 'success' | 'failed'>()
    .notNull(),
  reference: varchar('reference', { length: 50 }).notNull().unique(),
  customerId: varchar('customer_id', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').defaultNow()
}, (table) => ({
  referenceIdx: index('reference_idx').on(table.reference)  


})


);