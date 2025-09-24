import { useProductContext } from "../contexts/ProductContext"
export default function FavoriteProducts(){

    const {favoriteProducts, removeFavorite} = useProductContext();

    

    if(favoriteProducts.length === 0){
        return <div className="alert text-center text-warning">Lista dei Preferiti Vuota</div>
    }

    return favoriteProducts.map(p=><div key={p.id}>
        <h4>{p.title}</h4>
        <h5>{p.category}</h5>
        <img src={p.image} alt={p.title} />ù
        <button onClick={() =>removeFavorite(p.id)}>Remove from Favourites</button>
    </div>)
}