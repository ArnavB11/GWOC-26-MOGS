import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'rabuste.db');
const db = new sqlite3.Database(dbPath);

// Default data (mirrors DataContext.tsx)
const defaultData = {
    menuItems: [
        { id: 'rs-cnm-1', name: 'Iced Americano', category: 'Robusta Specialty (Cold - Non Milk)', price: 160, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Robusta Specialty (Cold - Non Milk)', tags: 'cold, strong, black, robusta, bitter, intense' },
        { id: 'rs-cnm-2', name: 'Iced Espresso', category: 'Robusta Specialty (Cold - Non Milk)', price: 130, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Robusta Specialty (Cold - Non Milk)', tags: 'cold, strong, black, robusta, shot, energetic' },
        { id: 'rs-cnm-3', name: 'Iced Espresso Tonic', category: 'Robusta Specialty (Cold - Non Milk)', price: 250, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Robusta Specialty (Cold - Non Milk)', tags: 'cold, fizzy, refreshing, citrus, summer, unique' },
        { id: 'rs-cnm-4', name: 'Iced Espresso Red Bull', category: 'Robusta Specialty (Cold - Non Milk)', price: 290, caffeine: 'Extreme', image: '/media/pic1.jpeg', description: 'Robusta Specialty (Cold - Non Milk)', tags: 'cold, energy, sweet, strong, buzz, party' },
        { id: 'rs-cnm-5', name: 'Cranberry Tonic', category: 'Robusta Specialty (Cold - Non Milk)', price: 270, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Robusta Specialty (Cold - Non Milk)', tags: 'cold, fruity, sweet, refreshing, mocktail' },
        { id: 'rs-cm-1', name: 'Iced Latte', category: 'Robusta Specialty (Cold - Milk Based)', price: 220, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Robusta Specialty (Cold - Milk Based)', tags: 'cold, milky, creamy, smooth, classic, robusta' },
        { id: 'rs-cm-2', name: 'Affogato', category: 'Robusta Specialty (Cold - Milk Based)', price: 250, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Robusta Specialty (Cold - Milk Based)', tags: 'dessert, ice cream, sweet, cold, treat' },
        { id: 'rs-cm-3', name: 'Classic Frappe', category: 'Robusta Specialty (Cold - Milk Based)', price: 250, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Robusta Specialty (Cold - Milk Based)', tags: 'cold, sweet, blended, creamy, dessert, summer' },
        { id: 'rs-cm-4', name: 'Hazelnut', category: 'Robusta Specialty (Cold - Milk Based)', price: 260, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Robusta Specialty (Cold - Milk Based)', tags: 'cold, sweet, flavored, nutty, creamy' },
        { id: 'rs-cm-5', name: 'Caramel', category: 'Robusta Specialty (Cold - Milk Based)', price: 260, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Robusta Specialty (Cold - Milk Based)', tags: 'cold, sweet, flavored, caramel, creamy' },
        { id: 'rs-cm-6', name: 'Mocha', category: 'Robusta Specialty (Cold - Milk Based)', price: 270, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Robusta Specialty (Cold - Milk Based)', tags: 'cold, chocolate, sweet, creamy, dessert' },
        { id: 'rs-cm-7', name: 'Biscoff', category: 'Robusta Specialty (Cold - Milk Based)', price: 270, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Robusta Specialty (Cold - Milk Based)', tags: 'cold, sweet, cookie, biscoff, dessert, creamy' },
        { id: 'rs-cm-8', name: 'Vietnamese', category: 'Robusta Specialty (Cold - Milk Based)', price: 240, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Robusta Specialty (Cold - Milk Based)', tags: 'cold, sweet, condensed milk, strong, asian' },
        { id: 'rs-cm-9', name: 'Cafe Suda', category: 'Robusta Specialty (Cold - Milk Based)', price: 250, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Robusta Specialty (Cold - Milk Based)', tags: 'cold, sweet, milky, strong, traditional' },
        { id: 'rs-cm-10', name: 'Robco', category: 'Robusta Specialty (Cold - Milk Based)', price: 290, caffeine: 'Extreme', image: '/media/pic2.jpeg', description: 'Robusta Specialty (Cold - Milk Based)', tags: 'cold, strong, signature, special, creamy' },
        { id: 'rs-hnm-1', name: 'Hot Americano', category: 'Robusta Specialty (Hot - Non Milk)', price: 150, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Robusta Specialty (Hot - Non Milk)', tags: 'hot, strong, black, robusta, bitter, classic' },
        { id: 'rs-hnm-2', name: 'Hot Espresso', category: 'Robusta Specialty (Hot - Non Milk)', price: 130, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Robusta Specialty (Hot - Non Milk)', tags: 'hot, strong, black, shot, intense' },
        { id: 'rs-hm-1', name: 'Hot Latte', category: 'Robusta Specialty (Hot - Milk Based)', price: 190, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Robusta Specialty (Hot - Milk Based)', tags: 'hot, milky, creamy, smooth, classic, comfort' },
        { id: 'rs-hm-2', name: 'Hot Flat White', category: 'Robusta Specialty (Hot - Milk Based)', price: 180, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Robusta Specialty (Hot - Milk Based)', tags: 'hot, milky, strong, creamy, smooth' },
        { id: 'rs-hm-3', name: 'Hot Cappuccino', category: 'Robusta Specialty (Hot - Milk Based)', price: 180, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Robusta Specialty (Hot - Milk Based)', tags: 'hot, milky, foamy, classic, breakfast' },
        { id: 'rs-hm-4', name: 'Robusta Mocha', category: 'Robusta Specialty (Hot - Milk Based)', price: 230, caffeine: 'Extreme', image: '/media/pic3.jpeg', description: 'Robusta Specialty (Hot - Milk Based)', tags: 'hot, chocolate, sweet, creamy, dessert' },
        { id: 'bl-cnm-1', name: 'Iced Americano', category: 'Blend (Cold - Non Milk)', price: 150, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Blend (Cold - Non Milk)', tags: 'cold, mild, black, blend, smooth' },
        { id: 'bl-cnm-2', name: 'Iced Espresso', category: 'Blend (Cold - Non Milk)', price: 120, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Blend (Cold - Non Milk)', tags: 'cold, mild, black, shot, smooth' },
        { id: 'bl-cnm-3', name: 'Iced Espresso Tonic', category: 'Blend (Cold - Non Milk)', price: 230, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Blend (Cold - Non Milk)', tags: 'cold, fizzy, refreshing, citrus' },
        { id: 'bl-cnm-4', name: 'Iced Espresso Red Bull', category: 'Blend (Cold - Non Milk)', price: 270, caffeine: 'Extreme', image: '/media/pic1.jpeg', description: 'Blend (Cold - Non Milk)', tags: 'cold, energy, sweet, mild, buzz' },
        { id: 'bl-cnm-5', name: 'Cranberry Tonic', category: 'Blend (Cold - Non Milk)', price: 250, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Blend (Cold - Non Milk)', tags: 'cold, fruity, sweet, refreshing' },
        { id: 'bl-cm-1', name: 'Iced Latte', category: 'Blend (Cold - Milk Based)', price: 210, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Blend (Cold - Milk Based)', tags: 'cold, milky, creamy, smooth, classic, mild' },
        { id: 'bl-cm-2', name: 'Affogato', category: 'Blend (Cold - Milk Based)', price: 240, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Blend (Cold - Milk Based)', tags: 'dessert, ice cream, sweet, cold, mild' },
        { id: 'bl-cm-3', name: 'Classic Frappe', category: 'Blend (Cold - Milk Based)', price: 240, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Blend (Cold - Milk Based)', tags: 'cold, sweet, blended, creamy, dessert, mild' },
        { id: 'bl-cm-4', name: 'Hazelnut', category: 'Blend (Cold - Milk Based)', price: 250, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Blend (Cold - Milk Based)', tags: 'cold, sweet, flavored, nutty, creamy, mild' },
        { id: 'bl-cm-5', name: 'Caramel', category: 'Blend (Cold - Milk Based)', price: 250, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Blend (Cold - Milk Based)', tags: 'cold, sweet, flavored, caramel, creamy, mild' },
        { id: 'bl-cm-6', name: 'Mocha', category: 'Blend (Cold - Milk Based)', price: 260, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Blend (Cold - Milk Based)', tags: 'cold, chocolate, sweet, creamy, dessert, mild' },
        { id: 'bl-cm-7', name: 'Biscoff', category: 'Blend (Cold - Milk Based)', price: 260, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Blend (Cold - Milk Based)', tags: 'cold, sweet, cookie, biscoff, dessert, mild' },
        { id: 'bl-hnm-1', name: 'Hot Americano', category: 'Blend (Hot - Non Milk)', price: 140, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Blend (Hot - Non Milk)', tags: 'hot, mild, black, blend, smooth, classic' },
        { id: 'bl-hnm-2', name: 'Hot Espresso', category: 'Blend (Hot - Non Milk)', price: 120, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Blend (Hot - Non Milk)', tags: 'hot, mild, black, shot, smooth' },
        { id: 'bl-hm-1', name: 'Hot Latte', category: 'Blend (Hot - Milk Based)', price: 180, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Blend (Hot - Milk Based)', tags: 'hot, milky, creamy, smooth, classic, mild, comfort' },
        { id: 'bl-hm-2', name: 'Hot Flat White', category: 'Blend (Hot - Milk Based)', price: 170, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Blend (Hot - Milk Based)', tags: 'hot, milky, mild, creamy, smooth' },
        { id: 'bl-hm-3', name: 'Hot Cappuccino', category: 'Blend (Hot - Milk Based)', price: 170, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Blend (Hot - Milk Based)', tags: 'hot, milky, foamy, classic, mild' },
        { id: 'bl-hm-4', name: 'Blend Mocha', category: 'Blend (Hot - Milk Based)', price: 220, caffeine: 'Extreme', image: '/media/pic3.jpeg', description: 'Blend (Hot - Milk Based)', tags: 'hot, chocolate, sweet, creamy, dessert, mild' },
        { id: 'mb-1', name: 'Classic Cold Brew', category: 'Manual Brew (Peaberry Special)', price: 220, caffeine: 'Very High', image: '/media/pic1.jpeg', description: 'Manual Brew (Peaberry Special)', tags: 'cold, strong, smooth, black, slow brew, premium' },
        { id: 'mb-2', name: 'Cold Brew Tonic', category: 'Manual Brew (Peaberry Special)', price: 270, caffeine: 'Very High', image: '/media/pic1.jpeg', description: 'Manual Brew (Peaberry Special)', tags: 'cold, fizzy, refreshing, strong, premium' },
        { id: 'mb-3', name: 'Cold Brew Red Bull', category: 'Manual Brew (Peaberry Special)', price: 290, caffeine: 'Extreme', image: '/media/pic1.jpeg', description: 'Manual Brew (Peaberry Special)', tags: 'cold, energy, sweet, strong, buzz, premium' },
        { id: 'mb-4', name: 'V60 Pour Over Hot', category: 'Manual Brew (Peaberry Special)', price: 220, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Manual Brew (Peaberry Special)', tags: 'hot, black, artisan, filter, smooth, premium' },
        { id: 'mb-5', name: 'V60 Pour Over Cold', category: 'Manual Brew (Peaberry Special)', price: 230, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Manual Brew (Peaberry Special)', tags: 'cold, black, artisan, filter, smooth, premium' },
        { id: 'mb-6', name: 'Cranberry Cold Brew Tonic', category: 'Manual Brew (Peaberry Special)', price: 280, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Manual Brew (Peaberry Special)', tags: 'cold, fruity, sweet, refreshing, premium' },
        { id: 'sh-1', name: 'Chocolate', category: 'Shakes', price: 220, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Shakes', tags: 'cold, dessert, sweet, milk, kid friendly' },
        { id: 'sh-2', name: 'Biscoff', category: 'Shakes', price: 250, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Shakes', tags: 'cold, dessert, sweet, milk, cookie' },
        { id: 'sh-3', name: 'Nutella', category: 'Shakes', price: 260, caffeine: 'High', image: '/media/pic2.jpeg', description: 'Shakes', tags: 'cold, dessert, sweet, milk, chocolate' },
        { id: 'tea-1', name: 'Lemon Ice Tea', category: 'Tea (Cold)', price: 210, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Tea (Cold)', tags: 'cold, sweet, refreshing, light, tea' },
        { id: 'tea-2', name: 'Peach Ice Tea', category: 'Tea (Cold)', price: 210, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Tea (Cold)', tags: 'cold, sweet, refreshing, fruity, tea' },
        { id: 'tea-3', name: 'Ginger Fizz', category: 'Tea (Cold)', price: 250, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Tea (Cold)', tags: 'cold, spicy, refreshing, fizzy, tea' },
        { id: 'tea-4', name: 'Orange Mint', category: 'Tea (Cold)', price: 250, caffeine: 'High', image: '/media/pic3.jpeg', description: 'Tea (Cold)', tags: 'cold, citrus, fresh, minty, tea' },
        { id: 'fb-1', name: 'Fries', category: 'Food & Bagels', price: 150, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Food & Bagels', tags: 'food, snack, salty, savory, veg' },
        { id: 'fb-2', name: 'Wedges', category: 'Food & Bagels', price: 170, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Food & Bagels', tags: 'food, snack, salty, savory, veg' },
        { id: 'fb-3', name: 'Veg Nuggets', category: 'Food & Bagels', price: 190, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Food & Bagels', tags: 'food, snack, savory, veg' },
        { id: 'fb-4', name: 'Pizza', category: 'Food & Bagels', price: 300, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Food & Bagels', tags: 'food, meal, cheesy, savory, veg' },
        { id: 'fb-5', name: 'Bagel', category: 'Food & Bagels', price: 100, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Food & Bagels', tags: 'food, bread, breakfast, snack' },
        { id: 'fb-6', name: 'Cream Cheese Bagel', category: 'Food & Bagels', price: 150, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Food & Bagels', tags: 'food, bread, creamy, breakfast' },
        { id: 'fb-7', name: 'Jalapeno Bagel', category: 'Food & Bagels', price: 200, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Food & Bagels', tags: 'food, spicy, savory, bread' },
        { id: 'fb-8', name: 'Pesto Bagel', category: 'Food & Bagels', price: 230, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Food & Bagels', tags: 'food, savory, herbal, bread' },
        { id: 'fb-9', name: 'Butter Croissant', category: 'Food & Bagels', price: 150, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Food & Bagels', tags: 'food, pastry, buttery, flaky, breakfast' },
        { id: 'fb-10', name: 'Nutella Croissant', category: 'Food & Bagels', price: 200, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Food & Bagels', tags: 'food, pastry, sweet, chocolate, dessert' },
        { id: 'fb-11', name: 'Cream Cheese Croissant', category: 'Food & Bagels', price: 240, caffeine: 'High', image: '/media/pic1.jpeg', description: 'Food & Bagels', tags: 'food, pastry, savory, creamy' }
    ],
    artItems: [
        { id: 'a1', title: 'Robusta Bloom', artist: 'Studio 47', price: 12000, status: 'Available', image: '/media/pic1.jpeg' },
        { id: 'a2', title: 'Night Shift', artist: 'Ananya K.', price: 18000, status: 'Sold', image: '/media/pic2.jpeg' },
    ],
    workshops: [
        { id: 'w1', title: 'Latte Art Basics', datetime: 'Oct 24, 10:00 AM', seats: 8, booked: 5, price: 0 },
        { id: 'w2', title: 'The Robusta Brew Lab', datetime: 'Nov 02, 8:00 AM', seats: 10, booked: 7, price: 799 },
    ]
};

export function initDb() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Menu Items Table
            db.run(`CREATE TABLE IF NOT EXISTS menu_items (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price INTEGER NOT NULL,
        caffeine TEXT,
        image TEXT,
        description TEXT,
        tags TEXT
      )`);

            // Art Items Table
            db.run(`CREATE TABLE IF NOT EXISTS art_items (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        price INTEGER NOT NULL,
        status TEXT,
        image TEXT
      )`);

            // Workshops Table
            db.run(`CREATE TABLE IF NOT EXISTS workshops (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        datetime TEXT NOT NULL,
        seats INTEGER NOT NULL,
        booked INTEGER NOT NULL,
        price INTEGER NOT NULL
      )`);

            // Orders Table
            db.run(`CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        customer TEXT NOT NULL,
        items TEXT NOT NULL,
        total INTEGER NOT NULL,
        date TEXT,
        pickupTime TEXT
      )`);

            // SEED DATA check (only if empty)
            db.get("SELECT count(*) as count FROM menu_items", (err, row) => {
                if (!err && row.count === 0) {
                    console.log("Seeding Menu Items...");
                    const stmt = db.prepare("INSERT INTO menu_items VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                    defaultData.menuItems.forEach(item => {
                        stmt.run(item.id, item.name, item.category, item.price, item.caffeine, item.image, item.description, item.tags || '');
                    });
                    stmt.finalize();
                }
            });

            db.get("SELECT count(*) as count FROM art_items", (err, row) => {
                if (!err && row.count === 0) {
                    console.log("Seeding Art Items...");
                    const stmt = db.prepare("INSERT INTO art_items VALUES (?, ?, ?, ?, ?, ?)");
                    defaultData.artItems.forEach(item => {
                        stmt.run(item.id, item.title, item.artist, item.price, item.status, item.image);
                    });
                    stmt.finalize();
                }
            });

            db.get("SELECT count(*) as count FROM workshops", (err, row) => {
                if (!err && row.count === 0) {
                    console.log("Seeding Workshops...");
                    const stmt = db.prepare("INSERT INTO workshops VALUES (?, ?, ?, ?, ?, ?)");
                    defaultData.workshops.forEach(item => {
                        stmt.run(item.id, item.title, item.datetime, item.seats, item.booked, item.price);
                    });
                    stmt.finalize();
                    console.log("Database initialized.");
                }
                resolve();
            });
        });
    });
}

export { db };
