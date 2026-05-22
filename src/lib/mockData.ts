export type OrderStatus = "pending" | "preparing" | "served" | "paid" | "cancelled";

export interface OrderItem {
    name: string;
    qty: number;
    price: number;
}

export interface Order {
    id: string;
    table: number;
    server: string;
    items: OrderItem[];
    status: OrderStatus;
    total: number;
    createdAt: string;
}

export type TableStatus = "available" | "occupied" | "reserved" | "cleaning";

export interface RestaurantTable {
    id: number;
    seats: number;
    status: TableStatus;
    server?: string;
    orderId?: string;
}

export type StaffRole = "admin" | "manager" | "server" | "kitchen";

export interface Staff {
    id: string;
    name: string;
    email: string;
    role: StaffRole;
    shift: "morning" | "evening" | "night";
    active: boolean;
}

export interface InventoryItem {
    id: string;
    name: string;
    category: string;
    stock: number;
    unit: string;
    reorder: number;
    price: number;
}

const now = Date.now();
const ago = (m: number) => new Date(now - m * 60_000).toISOString();

export const orders: Order[] = [
    { id: "ORD-1042", table: 4, server: "Mira Chen", status: "preparing", createdAt: ago(8), total: 48.5,
        items: [{ name: "Margherita Pizza", qty: 1, price: 16 }, { name: "Caesar Salad", qty: 2, price: 12 }, { name: "Sparkling Water", qty: 2, price: 4.25 }] },
    { id: "ORD-1041", table: 7, server: "Diego Soto", status: "pending", createdAt: ago(3), total: 22,
        items: [{ name: "Truffle Fries", qty: 1, price: 9 }, { name: "House Burger", qty: 1, price: 13 }] },
    { id: "ORD-1040", table: 2, server: "Mira Chen", status: "served", createdAt: ago(22), total: 64,
        items: [{ name: "Ribeye Steak", qty: 1, price: 38 }, { name: "Red Wine Glass", qty: 2, price: 13 }] },
    { id: "ORD-1039", table: 11, server: "Aiko Tanaka", status: "paid", createdAt: ago(48), total: 31.5,
        items: [{ name: "Pad Thai", qty: 1, price: 17 }, { name: "Spring Rolls", qty: 1, price: 8 }, { name: "Thai Iced Tea", qty: 1, price: 6.5 }] },
    { id: "ORD-1038", table: 5, server: "Diego Soto", status: "cancelled", createdAt: ago(60), total: 0,
        items: [{ name: "Lobster Bisque", qty: 1, price: 18 }] },
    { id: "ORD-1037", table: 9, server: "Aiko Tanaka", status: "paid", createdAt: ago(95), total: 89,
        items: [{ name: "Tasting Menu", qty: 2, price: 42 }, { name: "Champagne", qty: 1, price: 5 }] },
    { id: "ORD-1036", table: 3, server: "Mira Chen", status: "preparing", createdAt: ago(12), total: 27,
        items: [{ name: "Carbonara", qty: 1, price: 18 }, { name: "Tiramisu", qty: 1, price: 9 }] },
];

export const tables: RestaurantTable[] = [
    { id: 1, seats: 2, status: "available" },
    { id: 2, seats: 4, status: "occupied", server: "Mira Chen", orderId: "ORD-1040" },
    { id: 3, seats: 4, status: "occupied", server: "Mira Chen", orderId: "ORD-1036" },
    { id: 4, seats: 6, status: "occupied", server: "Mira Chen", orderId: "ORD-1042" },
    { id: 5, seats: 2, status: "cleaning" },
    { id: 6, seats: 2, status: "reserved" },
    { id: 7, seats: 4, status: "occupied", server: "Diego Soto", orderId: "ORD-1041" },
    { id: 8, seats: 8, status: "available" },
    { id: 9, seats: 4, status: "occupied", server: "Aiko Tanaka" },
    { id: 10, seats: 2, status: "available" },
    { id: 11, seats: 4, status: "available" },
    { id: 12, seats: 6, status: "reserved" },
];

export const staff: Staff[] = [
    { id: "S-01", name: "Hassan Ali", email: "hassan@nocta.co", role: "admin", shift: "morning", active: true },
    { id: "S-02", name: "Mira Chen", email: "mira@nocta.co", role: "server", shift: "evening", active: true },
    { id: "S-03", name: "Diego Soto", email: "diego@nocta.co", role: "server", shift: "evening", active: true },
    { id: "S-04", name: "Aiko Tanaka", email: "aiko@nocta.co", role: "manager", shift: "evening", active: true },
    { id: "S-05", name: "Luca Romano", email: "luca@nocta.co", role: "kitchen", shift: "evening", active: true },
    { id: "S-06", name: "Priya Shah", email: "priya@nocta.co", role: "kitchen", shift: "morning", active: false },
    { id: "S-07", name: "Noah Becker", email: "noah@nocta.co", role: "server", shift: "night", active: true },
];

export const inventory: InventoryItem[] = [
    { id: "I-01", name: "Ribeye Steak", category: "Meat", stock: 14, unit: "kg", reorder: 10, price: 38 },
    { id: "I-02", name: "Salmon Fillet", category: "Seafood", stock: 6, unit: "kg", reorder: 8, price: 24 },
    { id: "I-03", name: "Mozzarella", category: "Dairy", stock: 22, unit: "kg", reorder: 12, price: 9 },
    { id: "I-04", name: "Tomato (San Marzano)", category: "Produce", stock: 38, unit: "kg", reorder: 20, price: 4 },
    { id: "I-05", name: "Red Wine — House", category: "Beverage", stock: 48, unit: "btl", reorder: 24, price: 22 },
    { id: "I-06", name: "Espresso Beans", category: "Beverage", stock: 4, unit: "kg", reorder: 6, price: 28 },
    { id: "I-07", name: "Truffle Oil", category: "Pantry", stock: 3, unit: "btl", reorder: 4, price: 35 },
    { id: "I-08", name: "Sourdough Loaf", category: "Bakery", stock: 18, unit: "ea", reorder: 12, price: 6 },
];

export const revenue7d = [
    { day: "Mon", revenue: 3210, orders: 78 },
    { day: "Tue", revenue: 2840, orders: 71 },
    { day: "Wed", revenue: 3920, orders: 92 },
    { day: "Thu", revenue: 4310, orders: 104 },
    { day: "Fri", revenue: 6120, orders: 138 },
    { day: "Sat", revenue: 7240, orders: 162 },
    { day: "Sun", revenue: 5180, orders: 121 },
];

export const topItems = [
    { name: "House Burger", sold: 184 },
    { name: "Margherita Pizza", sold: 152 },
    { name: "Carbonara", sold: 138 },
    { name: "Ribeye Steak", sold: 96 },
    { name: "Tasting Menu", sold: 64 },
];
