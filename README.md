# Iron Bross Shop - Tienda Online con React

Aplicación web de carrito de compras desarrollada con React y Vite.

## 🚀 Características

- **Catálogo de productos**: Visualización de productos con imágenes, descripciones y precios
- **Carrito de compras**: Agregar, eliminar y modificar cantidades de productos
- **Menú de navegación**: Header con navegación y acceso rápido al carrito
- **Integración con WhatsApp**: Envío automático del pedido por WhatsApp
- **Diseño responsive**: Adaptable a dispositivos móviles y desktop

## 📋 Requisitos

- Node.js (versión 14 o superior)
- npm o yarn

## 🛠️ Instalación

1. Instalar las dependencias:
```bash
npm install
```

## 🎯 Uso

### Modo desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Compilar para producción
```bash
npm run build
```

### Vista previa de la compilación
```bash
npm run preview
```


## 📁 Estructura del Proyecto

```
ironBross/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Componente del menú de navegación
│   │   ├── Header.css
│   │   ├── ProductList.jsx     # Lista de productos
│   │   ├── ProductList.css
│   │   ├── ProductCard.jsx     # Tarjeta individual de producto
│   │   ├── ProductCard.css
│   │   ├── Cart.jsx            # Carrito de compras
│   │   └── Cart.css
│   ├── App.jsx                 # Componente principal
│   ├── App.css
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales
├── index.html
├── package.json
├── vite.config.js
└── README.md
```


### Cambiar Colores

Los colores principales están en los archivos CSS de cada componente. El gradiente principal es:
- Color primario: `#667eea`
- Color secundario: `#764ba2`

## 🌐 Tecnologías Utilizadas

- **React 18.3.1**: Librería para construir interfaces de usuario
- **Vite 6.0.5**: Herramienta de compilación rápida
- **CSS3**: Estilos y animaciones

## 📱 Funcionalidad de WhatsApp

Al hacer clic en "Enviar Pedido por WhatsApp", la aplicación:
1. Genera un mensaje formateado con todos los productos del carrito
2. Calcula el total del pedido
3. Abre WhatsApp Web/App con el mensaje prellenado
4. El usuario solo necesita presionar enviar


