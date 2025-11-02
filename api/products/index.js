
import productsData from '../../product.json'; 

export default async function handler(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method === 'GET') {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const search = url.searchParams.get('search');
        const category = url.searchParams.get('category');
        
        let filteredItems = [...productsData];
        
        
        if (category) {
            filteredItems = filteredItems.filter(item => 
                item.category && item.category.toLowerCase() === category.toLowerCase()
            );
        }
     
        if (search) {
            filteredItems = filteredItems.filter(item => 
                item.title && item.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        return res.status(200).json(filteredItems.map(
            ({id, createdAt, updatedAt, title, category}) => ({id, createdAt, updatedAt, title, category})
        ));
    }

    res.status(405).json({ success: false, message: `Metodo ${req.method} non consentito per questa demo.` });
}