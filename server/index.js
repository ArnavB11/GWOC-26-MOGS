import './env.js'; // MUST BE FIRST
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { db, initDb } from './db.js';
import { initializeKnowledge, rebuildKnowledgeIndex } from './data/knowledgeManager.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- FUSE.JS LOGIC FOR OFF-LINE CHAT ---
import Fuse from 'fuse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to get IST time string
const getISTTime = () => {
    return new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
};

// -----------------------------------------------------
// CONFIGURATION & SETUP
// -----------------------------------------------------
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - allow frontend domains
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (origin.startsWith('http://localhost')) return callback(null, true);
        if (origin.includes('.vercel.app')) return callback(null, true);
        if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
            return callback(null, true);
        }
        callback(null, true);
    },
    credentials: true
}));
app.use(express.json());

// Request Logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, '../public')));

// Razorpay Setup
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID?.trim().replace(/^["']|["']$/g, '');
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET?.trim().replace(/^["']|["']$/g, '');

let razorpayInstance = null;

if (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) {
    razorpayInstance = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
    console.log('✅ Razorpay initialized');
} else {
    console.warn('⚠️ Razorpay keys missing');
}

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../public/media');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, 'upload-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file' });
    res.json({ url: `/media/${req.file.filename}` });
});

// -----------------------------------------------------
// OFFLINE CHATBOT LOGIC
// -----------------------------------------------------
function generateLocalResponse(message, menuItems, workshops, artItems) {
    const lowerMsg = message.toLowerCase();
    const fmt = (p) => `₹${p}`;

    // Cleanup
    const cleanQuery = lowerMsg
        .replace(/can you (please )?tell me/g, "")
        .replace(/i want to know/g, "")
        .replace(/what (is|are) the/g, "")
        .replace(/how much (is|does)/g, "")
        .replace(/price of/g, "")
        .replace(/calories in/g, "")
        .replace(/does (the )?have/g, "")
        .replace(/is (the )?/g, "")
        .replace(/tell me about/g, "")
        .replace(/\b(please|kindly|hey|hi|hello|tell me)\b/g, "")
        .replace(/take me to/g, "navigate to")
        .trim();

    // Navigation
    if (lowerMsg.includes("go to") || lowerMsg.includes("show me") || lowerMsg.includes("navigate") || lowerMsg.includes("open") || lowerMsg.includes("take me")) {
        if (lowerMsg.includes("menu") && !lowerMsg.includes("item")) return { action: "navigate", parameters: { route: "/menu" } };
        if (lowerMsg.includes("art") && !lowerMsg.includes("what")) return { action: "navigate", parameters: { route: "/art" } };
        if (lowerMsg.includes("workshop") || lowerMsg.includes("event")) return { action: "navigate", parameters: { route: "/workshops" } };
        if (lowerMsg.includes("home")) return { action: "navigate", parameters: { route: "/" } };
        if (lowerMsg.includes("cart")) return { action: "navigate", parameters: { route: "/cart" } };
        if (lowerMsg.includes("philosophy")) return { action: "navigate", parameters: { route: "/philosophy" } };
        if (lowerMsg.includes("franchise")) return { action: "navigate", parameters: { route: "/franchise" } };
    }

    // Greetings
    if (lowerMsg.match(/\b(hi|hello|hey|yo|greetings)\b/)) {
        return { action: "respond", parameters: { message: "Hi! I'm your Rabuste Barista. ☕\nI can help you with:\n• **Menu & Prices**\n• **Recommendations**\n• **Store Info**" } };
    }

    // Tech Stack
    if (lowerMsg.includes("tech stack") || lowerMsg.includes("technologies") || lowerMsg.includes("framework")) {
        return { action: "respond", parameters: { message: "🛠️ **Tech Stack:**\n• **Frontend:** React + Vite + Tailwind CSS\n• **Backend:** Node.js + Express\n• **Database:** Supabase (PostgreSQL)\n• **AI:** Custom Fuse.js Fuzzy Matching 🧠" } };
    }

    // Info
    if (lowerMsg.includes("hours") || lowerMsg.includes("open") || lowerMsg.includes("close")) {
        return { action: "respond", parameters: { message: "🕒 **Opening Hours:**\n• Mon-Sun: 8:00 AM - 10:00 PM" } };
    }
    if (lowerMsg.includes("location") || lowerMsg.includes("where") || lowerMsg.includes("address")) {
        return { action: "respond", parameters: { message: "📍 **Location:**\n123 Coffee Lane, Brewtown" } };
    }

    // Menu Query - Fuse.js
    const fuse = new Fuse(menuItems, {
        keys: ['name', 'category', 'tags'],
        threshold: 0.4,
        includeScore: true
    });

    const searchResults = fuse.search(cleanQuery || lowerMsg);

    if (searchResults.length > 0) {
        const bestMatch = searchResults[0].item;
        if (lowerMsg.includes("price") || lowerMsg.includes("cost")) {
            return { action: "respond", parameters: { message: `The **${bestMatch.name}** costs **₹${bestMatch.price}**.` } };
        }
        if (lowerMsg.includes("calorie")) {
            return { action: "respond", parameters: { message: `The **${bestMatch.name}** has **${bestMatch.calories || 'N/A'} kcal**.` } };
        }
        return { action: "respond", parameters: { message: `**${bestMatch.name}**\nPrice: ₹${bestMatch.price}\nCalories: ${bestMatch.calories || 'N/A'} kcal\n\n${bestMatch.description || ''}` } };
    }

    // Fallback
    return {
        action: "respond",
        parameters: {
            message: "I'm not sure about that one! Try asking about 'latte price' or 'menu'."
        }
    };
}

// CHAT ENDPOINT
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const { data: menuItemsData } = await db.from('menu_items').select(`*, categories (name)`);
        const menuItems = (menuItemsData || []).map(item => ({
            ...item,
            category: item.categories?.name || item.category_legacy || 'Other'
        }));

        const { data: workshops } = await db.from('workshops').select('*');
        const { data: artItems } = await db.from('art_items').select('*');

        // Generate Response
        const response = generateLocalResponse(message || "", menuItems || [], workshops || [], artItems || []);
        res.json(response);
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(200).json({ action: 'respond', parameters: { message: "I'm having a little trouble connecting to the barista brain. Please try again! ☕" } });
    }
});

// -----------------------------------------------------
// STANDARD API ROUTES
// -----------------------------------------------------

app.get('/api/menu', async (req, res) => {
    const { data, error } = await db.from('menu_items').select(`*, categories (name), sub_categories (name)`);
    if (error) return res.status(500).json({ error: error.message });
    const flatData = (data || []).map(item => ({
        ...item,
        category: item.categories?.name || item.category_legacy,
        category_name: item.categories?.name || item.category_legacy,
        sub_category_name: item.sub_categories?.name || null
    }));
    res.json(flatData);
});

app.post('/api/menu', async (req, res) => {
    try {
        const { id, name, category, price, image, description } = req.body;
        const { data, error } = await db.from('menu_items').insert(req.body).select().single();
        if (error) throw error;
        res.json(data);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/art', async (req, res) => {
    const { data, error } = await db.from('art_items').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data || []);
});

// Decrease Stock
app.post('/api/art/:id/decrement-stock', async (req, res) => {
    try {
        const artId = req.params.id;
        const { data: artItem } = await db.from('art_items').select('stock').eq('id', artId).single();
        if (!artItem) return res.status(404).json({ error: 'Art item not found' });

        const newStock = (artItem.stock || 0) - 1;
        if (newStock < 0) return res.status(400).json({ error: 'Out of stock' });

        const { data, error } = await db.from('art_items').update({ stock: newStock, status: newStock > 0 ? 'Available' : 'Sold' }).eq('id', artId).select().single();
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/workshops', async (req, res) => {
    const { data, error } = await db.from('workshops').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data || []);
});

app.get('/api/orders', async (req, res) => {
    const { data, error } = await db.from('orders').select('*');
    if (error) return res.status(500).json({ error: error.message });
    const parsed = (data || []).map(r => ({ ...r, customer: typeof r.customer === 'string' ? JSON.parse(r.customer) : r.customer, items: typeof r.items === 'string' ? JSON.parse(r.items) : r.items }));
    res.json(parsed);
});

app.post('/api/orders', async (req, res) => {
    try {
        const { id, customer, items, total, pickupTime, paymentMethod } = req.body;
        const orderDate = getISTTime();
        const { data, error } = await db.from('orders').insert({
            id, customer, items, total, date: orderDate, pickupTime,
            payment_status: 'PENDING_PAYMENT',
            payment_method: paymentMethod || 'Paid at Counter',
            status: 'placed'
        }).select().single();
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Server Start
initDb().then(async () => {
    try {
        await initializeKnowledge(db);
        app.listen(PORT, () => { console.log(`🚀 Intelligent Server running on http://localhost:${PORT}`); });
        process.stdin.resume();
    } catch (err) {
        console.error('❌ Error starting server:', err);
        process.exit(1);
    }
}).catch(err => {
    console.error('❌ Failed to initialize database:', err);
    process.exit(1);
});

// Process handlers
process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
