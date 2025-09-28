import { useState, useMemo, useEffect } from "react";
import { useProductContext } from "../contexts/ProductContext"
import ProductDetail from "../components/ProductDetail";
import ComparingModal from "../components/ComparingModal";

export default function ProductList(){

    const {products, loading, error, addFavorite, comparedProducts, setComparedProducts} = useProductContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = [...new Set(products.map(p=>p.category))]
    const [onSortOption, setOnSortOption] = useState("title");
    const [onOrder, setOnOrder] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const onOrderFunction = (e)=>{
            const [option, order] = e.target.value.split(",");
            setOnSortOption(option);
            setOnOrder(Number(order));
    }

    const searchedProducts = useMemo (()=>{
        let filteredProducts = products;
        if(searchQuery){
            filteredProducts = products.filter(p => 
                p.title.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        if(selectedCategory){
            filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
        }

        filteredProducts = filteredProducts.sort((a,b)=>a[onSortOption].localeCompare(b[onSortOption]))
        
        return onOrder === 1 ? filteredProducts : [...filteredProducts].reverse();
    }, [searchQuery, products, selectedCategory, onSortOption, onOrder])


    useEffect(() => {
        if (comparedProducts.length === 2) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [comparedProducts]);

    if(loading){
       return <h2>Caricamento della Lista dei Prodotti in corso...</h2>
    }
    if(error){
        console.log(error)
        return <h2>Lista dei Prodotti non Trovata</h2>
    }

    console.log(comparedProducts);




    return  <div>
        <h1 className="mb-4 text-center">Lista dei Prodotti</h1>
        <div className="d-flex align-items-center justify-content-between gap-3 p-3 border rounded">
        {/* Ricerca */}
        <input
            type="text"
            className="form-control"
            placeholder="Cerca..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: '200px' }}
        />

        {/* Categorie */}
        <select
            className="form-select"
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ maxWidth: '200px' }}
        >
            <option value="">Tutte le categorie</option>
            {categories.map((c, index) => (
            <option key={index} value={c}>
                {c}
            </option>
            ))}
        </select>

        {/* Ordinamento */}
        <select
            className="form-select text-bold"
            onChange={onOrderFunction}
            style={{ maxWidth: '220px' }}
        >
            <option value={"title,1"}>Titolo A-Z</option>
            <option value={"title,-1"}>Titolo Z-A</option>
            <option value={"category,1"}>Categoria A-Z</option>
            <option value={"category,-1"}>Categoria Z-A</option>
        </select>
        </div>

        <div className="row justify-content-center m-3">
             {searchedProducts.length> 0 ? searchedProducts.map(product => <ProductDetail comparedProducts={comparedProducts} key={product.id} addFavorite={addFavorite} product={product}/>)
        : <div>Lista dei prodotti Vuota...</div>}
        
        </div>
        
        <ComparingModal products={comparedProducts} showModal={showModal} onClose={()=>setShowModal(false)}/>
        
    </div>
}