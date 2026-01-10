import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function verifyChatbot() {
    console.log("🔍 Starting Chatbot Verification...");

    // 1. Check Env Vars
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY || !process.env.GEMINI_API_KEY) {
        console.error("❌ Missing Environment Variables!");
        console.log("SUPABASE_URL:", !!process.env.SUPABASE_URL);
        console.log("GEMINI_API_KEY:", !!process.env.GEMINI_API_KEY);
        return;
    }

    // 2. Connect to DB
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    console.log("✅ Supabase Client Initialized");

    // 3. Fetch Menu
    const { data: menuItems, error } = await supabase.from('menu_items').select('*').limit(5);
    if (error) {
        console.error("❌ DB Error:", error);
        return;
    }
    console.log(`✅ Fetched ${menuItems.length} menu items from DB.`);

    // 4. Test Gemini
    const simpleMenu = menuItems.map(item => `${item.name}: ₹${item.price}`).join('\n');
    console.log("📝 Context preview:", simpleMenu.substring(0, 100) + "...");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are a cafe bot.
    Menu:
    ${simpleMenu}

    User: Suggest a drink for me.
    `;

    try {
        console.log("🤖 Sending request to Gemini...");
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        console.log("\n✨ Gemini Response:\n", text);
        console.log("\n✅ Verification Successful!");
    } catch (e) {
        console.error("❌ Gemini Error:", e);
    }
}

verifyChatbot();
