import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

async function verify() {
    try {
        if (!process.env.GEMINI_API_KEY) throw new Error("Missing GEMINI_API_KEY");

        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
        const { data: menuItems } = await supabase.from('menu_items').select('*').limit(3);

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Context: ${menuItems.map(i => i.name).join(', ')}. User: Hello.`;
        const result = await model.generateContent(prompt);

        fs.writeFileSync('verification_result.txt', "SUCCESS\n" + result.response.text());
        console.log("Written to verification_result.txt");
    } catch (e) {
        fs.writeFileSync('verification_result.txt', "ERROR\n" + e.message + "\n" + e.stack);
        console.error(e);
    }
}

verify();
