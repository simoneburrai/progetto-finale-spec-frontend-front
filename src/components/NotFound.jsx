import { Link } from "react-router-dom"


export default function NotFound(){

    return <div className="vh-100 vw-100 text-center p-5 bg-secondary-subtle text-secondary-emphasis">
        <div className="fs-3">Pagina Non Trovata</div>
        <Link className="fs-1 p-3 text-decoration-none" to="/products">Torna alla lista dei prodotti</Link>
    </div>
}