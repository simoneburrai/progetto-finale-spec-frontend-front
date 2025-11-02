import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURAZIONE PER PATH ASSOLUTO ---
// Crea __dirname equivalente in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definisci il percorso assoluto al file product.json
// '..' risale da 'products' a 'api'
// '..' risale da 'api' alla ROOT DEL PROGETTO dove si trova product.json
const productsPath = path.resolve(__dirname, '../../product.json'); 

// --- CARICAMENTO DEI DATI STATIC ---
// Leggi il file in modo sincrono e parsalo
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));


export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: `Metodo ${req.method} non consentito.` });
    }

    const itemId = req.query.id;
    const item = productsData.find((p) => p.id === parseInt(itemId));

    if (!item) {
        return res.status(404).json({ success: false, message: `Prodotto con ID '${itemId}' non trovato.` });
    }
    
    return res.status(200).json({ success: true, product: item });
}