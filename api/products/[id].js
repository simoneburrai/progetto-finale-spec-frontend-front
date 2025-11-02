import productsData from '../../../product.json'; 

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