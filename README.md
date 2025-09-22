# 📀 Progetto Finale - Comparatore di Records

## 🖼️ Cosa devi realizzare
Una SPA che simula l’esperienza di un utente non autenticato, che può:
- ✅ Sfogliare, cercare e filtrare record
- ✅ Confrontare più elementi tra loro
- ✅ Salvare i preferiti  
❌ Non può creare, modificare o cancellare record.

---

## 🔍 Tecnologie da utilizzare
- React (JavaScript)
- Styling libero (Tailwind, Bootstrap, styled-components…)
- Backend già pronto (repo ufficiale fornito)

---

## 🎨 Tematica a scelta
Puoi scegliere liberamente l’argomento del comparatore.  
Esempi: dispositivi, multimedia, informatica, viaggi, trasporti, educazione, alimenti, casa, ecc.

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
  - Barra di ricerca
  - Filtro per categoria
  - Ordinamento alfabetico
- Pagina di dettaglio
- Comparatore di 2 record
- Sistema di preferiti

---

## 🥈 Requisiti Consigliati (Facoltativi)
- Comparatore di più record
- Debounce sulla ricerca
- Persistenza preferiti
- Gestione stati vuoti

---

## 🥇 Requisiti Aggiuntivi (Facoltativi)
- Gestione di più risorse
- CRUD completo
- Validazione input

---

## 🎯 BONUS
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

Entrambi con almeno 10 record validi.

---

💪 Buon lavoro!