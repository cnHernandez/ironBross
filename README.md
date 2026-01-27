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

## ⚙️ Configuración de WhatsApp

Para configurar el número de WhatsApp que recibirá los pedidos:

1. Abre el archivo [src/App.jsx](src/App.jsx#L64)
2. Modifica la constante `phoneNumber` con tu número en formato internacional:
```javascript
const phoneNumber = '5491234567890' // Ejemplo: 549 (código país) + código área + número
```

**Formato del número:**
- Sin el símbolo `+`
- Sin espacios ni guiones
- Código de país + código de área + número
- Ejemplo Argentina: `5491123456789`
- Ejemplo México: `5215512345678`

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

## 🎨 Personalización

### Agregar/Modificar Productos

Edita el array `sampleProducts` en [src/components/ProductList.jsx](src/components/ProductList.jsx#L6):

```javascript
{
  id: 1,
  name: 'Nombre del Producto',
  price: 29.99,
  image: '🎯', // Emoji o URL de imagen
  description: 'Descripción del producto'
}
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

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Haz fork del proyecto
2. Crea una rama para tu característica
3. Realiza tus cambios
4. Envía un pull request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
