import { useState, useMemo } from "react";
import { useProductContext } from "../contexts/ProductContext"
import { Link } from "react-router-dom";

export default function ProductList(){

    const {products, loading, error, addFavorite} = useProductContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = [...new Set(products.map(p=>p.category))]
    const [onSortOption, setOnSortOption] = useState("title");
    const [onOrder, setOnOrder] = useState(1);

    const onOrderFunction = (e)=>{
            const [option, order] = e.target.value.split(",");
            setOnSortOption(option);
            setOnOrder(Number(order));
    }

    const searchedProducts = useMemo (()=>{
        let filteredProducts = products;
        if(searchQuery){
            filteredProducts = products.filter(p => 
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase()) )
        }
        if(selectedCategory){
            filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
        }

        filteredProducts = filteredProducts.sort((a,b)=>a[onSortOption].localeCompare(b[onSortOption]))
        
        return onOrder === 1 ? filteredProducts : [...filteredProducts].reverse();
    }, [searchQuery, products, selectedCategory, onSortOption, onOrder])

    if(loading){
       return <h2>Caricamento della Lista dei Prodotti in corso...</h2>
    }
    if(error){
        console.log(error)
        return <h2>Lista dei Prodotti non Trovata</h2>
    }

    console.log(searchedProducts)


    return  <div>
        <h1>Lista dei Prodotti:</h1>
        <div>
            <input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
            <select onChange={(e)=>setSelectedCategory(e.target.value)}>
                <option value="">Tutte le categorie</option>
                {categories.map((c, index)=><option key={index} value={c}>{c}</option>)}
            </select>
            <select onChange={onOrderFunction}>
                <option value={"title,1"}>Ordina per Titolo A-Z</option>
                <option value={"title,-1"}>Ordina per Titolo Z-A</option>
                <option value={"category,1"}>Ordina per Categoria A-Z</option>
                <option value={"category,-1"}>Ordina per Categoria Z-A</option>
            </select>
        </div>
        
          {searchedProducts.length> 0 ? searchedProducts.map(product => <div key={product.id}>
            <h3><Link to={`/products/${product.id}`}>{product.title}</Link></h3>
            <h4>{product.category}</h4>
            <button onClick={()=>addFavorite(product)}>Aggiungi ai Preferiti</button>
        </div>) 
        : <div>Lista dei prodotti Vuota...</div>}
        
    </div>
}