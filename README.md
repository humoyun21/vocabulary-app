# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Learn Page — Liquid Water Design

## Fayl strukturasi

```
src/
├── components/
│   ├── Learn.jsx       ← Asosiy sahifa (bu fayl)
│   └── FlipCard.jsx    ← Flip karta komponenti
├── styles/
│   ├── learn.css       ← Asosiy liquid dizayn stillari
│   └── FlipCard.css    ← FlipCard stillari
└── data/
    └── vocabulary.js   ← So'zlar ma'lumotlari (o'zingizniki)
```

## O'rnatish

1. Fayllarni loyihangizga ko'chiring:
   - `Learn.jsx`    → `src/components/Learn.jsx` (yoki `src/pages/Learn.jsx`)
   - `FlipCard.jsx` → `src/components/FlipCard.jsx`
   - `learn.css`    → `src/styles/learn.css`
   - `FlipCard.css` → `src/styles/FlipCard.css`

2. `Learn.jsx` ichidagi import yo'llarini tekshiring:
   ```js
   import vocabulary from "../data/vocabulary";  // o'z yo'lingiz
   import FlipCard from "../components/FlipCard";
   import "../styles/learn.css";
   ```

3. Google Fonts avtomatik `learn.css` orqali yuklanadi (`@import url(...)`).
   Agar `index.html`ga qo'shmoqchi bo'lsangiz:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet" />
   ```

## Vocabulary ma'lumot formati

```js
// src/data/vocabulary.js
const vocabulary = [
  { id: 1, english: "Achieve", uzbek: "Erishmoq", level: "A2" },
  { id: 2, english: "Analyze", uzbek: "Tahlil qilmoq", level: "B2" },
  // ...
];
export default vocabulary;
```

## Xususiyatlar

- Liquid/water dizayn — animatsiyali blob va ripple effektlar
- Glass morphism kartalar (backdrop-filter blur)
- FlipCard — klikda 3D aylanadi
- Level filter (A1, A2, B1, B2, C1, All)
- localStorage orqali progress saqlanadi
- To'liq responsive (mobile, tablet, desktop)
- Bilmagan so'zlar oxiriga qayta qo'shiladi
- Progress bar va statistika real-time yangilanadi