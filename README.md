# Iron Bross Shop — Tienda Online de Suplementos Deportivos

Aplicación web de e-commerce desarrollada con **React + Vite**, especializada en la venta de suplementos deportivos y nutricionales.

---

## 🚀 Funcionalidades

### 🔍 Buscador en tiempo real
- Búsqueda de productos desde el header, disponible en toda la navegación.
- Dropdown con resultados en vivo que incluye miniatura y nombre del producto.
- Al seleccionar un resultado se abre directamente el detalle del producto.

### 🏷️ Categorías de productos
El catálogo está organizado en **8 categorías**, cada una con imagen propia:

| Categoría | Slug |
|---|---|
| Aminoácidos | `aminoacidos` |
| Creatinas | `creatinas` |
| Pre Entrenos | `pre-entrenos` |
| Proteínas y Ganadores de Peso | `proteinas-y-ganadores-de-peso` |
| Colágenos y Resveratrol | `colagenos-y-resveratrol` |
| Magnesio y Omega 3 | `magnesio-y-omega-3` |
| Quemadores | `quemadores` |
| Vitaminas | `vitaminas` |

### 🏢 Marcas disponibles
El catálogo incluye productos de **6 marcas** con navegación dedicada por marca:
- ENA
- Star Nutrition
- Gold
- Xtrenght
- Pitbull
- Gentech

### 🛒 Carrito de compras
- Agregar productos desde el listado o el detalle del producto.
- Modificar cantidades directamente en el carrito.
- Eliminar ítems individualmente.
- Contador de ítems visible en el header en todo momento.
- Panel lateral (overlay) que no interrumpe la navegación.
- Formato de precios en pesos argentinos (ARS).

### 📦 Detalle de producto
- Vista completa con imagen, nombre, marca, descripción y precio.
- Botón de agregar al carrito.
- Navegación de regreso al listado anterior.

### 🔎 Filtros en listados
- Dentro de una **categoría**: filtro por marca.
- Dentro de una **marca**: filtro por categoría.
- Ambos filtros se resetean automáticamente al cambiar de vista.

### 🧭 Breadcrumb de navegación
- Ruta visible en todo momento al navegar por categorías, marcas y productos.
- Cada segmento es clickeable para volver a la vista anterior.

### 📲 Pedido por WhatsApp
- El botón "Enviar pedido" en el carrito genera automáticamente un mensaje con el detalle completo: productos, cantidades, subtotales y total.
- Abre directamente WhatsApp con el mensaje prellenado, listo para enviar.
- Botón flotante de WhatsApp disponible en toda la página para contacto directo.

### 🎬 Sección multimedia
- Banner hero en la página principal.
- Video de gimnasio en reproducción automática (muted, loop).

### 🔗 Redes sociales
- Accesos directos a **Instagram** y **correo electrónico** desde la sección de contacto.

### 🖼️ Gestión de imágenes
- Imágenes de productos servidas desde Cloudinary y desde archivos locales (`public/images/`).
- Imagen de placeholder automática ante errores de carga.

---

## 🛠️ Stack tecnológico

| Tecnología | Versión |
|---|---|
| React | ^18.3.1 |
| Vite | ^6.0.5 |
| @vitejs/plugin-react | ^4.3.4 |

---

## 📋 Requisitos

- Node.js 14 o superior
- npm

---

## ⚙️ Instalación y uso

```bash
# Instalar dependencias
npm install

# Modo desarrollo (http://localhost:5173)
npm run dev

# Compilar para producción
npm run build

# Vista previa del build
npm run preview
```

---

## 📁 Estructura del proyecto

```
ironBross/
├── public/
│   └── images/              # Imágenes de productos locales y placeholder
├── src/
│   ├── assets/              # Logos, banners e imágenes de categorías
│   ├── components/
│   │   ├── Header.jsx           # Header con logo, buscador y carrito
│   │   ├── ProductListSearch.jsx    # Buscador con dropdown en tiempo real
│   │   ├── ProductList.jsx      # Listado con filtros por marca/categoría
│   │   ├── ProductCard.jsx      # Tarjeta individual de producto
│   │   ├── ProductDetail.jsx    # Vista de detalle de producto
│   │   └── Cart.jsx             # Panel de carrito de compras
│   ├── data/
│   │   └── products.js          # Base de datos de productos y utilidades
│   ├── styles/              # Archivos CSS por componente
│   ├── App.jsx              # Componente raíz y lógica de navegación
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
└── package.json
```


