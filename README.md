# 📀 Progetto Finale - Comparatore di Records

## 🖼️ Scopo del Progetto:
Realizzazione di una SPA che simula l’esperienza di un utente non autenticato, che può:
- ✅ Sfogliare, cercare e filtrare record
- ✅ Confrontare più elementi tra loro
- ✅ Salvare i preferiti  
❌ Non può creare, modificare o cancellare record.

---

## 🔍 Tecnologie da utilizzare
- React (JavaScript)
- Styling libero (scelto: Bootstrap)
- Backend già pronto

---

## 🎨 Tematica a scelta
Scelta libera dell’argomento del comparatore.  
Esempi: dispositivi, multimedia, informatica, viaggi, trasporti, educazione, alimenti, casa, ecc.
Scelta Personale : **Dispositivi Elettronici**(smartphone, smartwatch e tablet)

---

## 🛠️ Backend pronto all’uso
Repo: [progetto-finale-spec-frontend-back](https://github.com/boolean-it/progetto-finale-spec-frontend-back)  

Nel file `types.ts` definisci la tua risorsa, ad esempio:
```ts
export type Product = {
  title: string;
  category: string;
  price?: number;
  brand?: string;
};
```

Il backend genera automaticamente:
- `/products`
- `/products/:id`
- `product.json` in `/database`

---

## 🔧 API disponibili
- **POST /{tipo}s** → Crea un nuovo record  
- **GET /{tipo}s/:id** → Restituisce un record per id  
- **PUT /{tipo}s/:id** → Aggiorna un record per id  
- **DELETE /{tipo}s/:id** → Elimina un record per id  
- **GET /{tipo}s** → Lista dei record, con query string:
  - `?search=...`
  - `?category=...`

---

## 🥉 Requisiti Minimi 
- Gestione di una risorsa definita in `types.ts`
- Lista dei record con:
  - Barra di ricerca ✓
  - Filtro per categoria ✓
  - Ordinamento alfabetico ✓
- Pagina di dettaglio ✓
- Comparatore di 2 record ✓
- Sistema di preferiti ✓

---

## 🥈 Requisiti Consigliati (Facoltativi)
- Comparatore di più record X
- Debounce sulla ricerca ✓
- Persistenza preferiti ✓
- Gestione stati vuoti ✓

---

## 🥇 Requisiti Aggiuntivi (Facoltativi) (Non disponibile)
- Gestione di più risorse
- CRUD completo
- Validazione input

---

## 🎯 BONUS (Non Disponibile)
- Versione parallela in **TypeScript**

---

## ⏱️ Come affrontare il progetto
Il progetto è pensato per 7 giorni di lavoro.  
Obiettivo principale: completare **tutti i requisiti minimi**.

---

## 📌 Consegna
Al momento del push finale includere:
- Cartella `/database`
- File `types.ts`  

