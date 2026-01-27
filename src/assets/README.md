# Carpeta de Assets

Esta carpeta contiene los recursos estáticos de la aplicación.

## Estructura

- **products/**: Imágenes de los productos
- Puedes agregar otras subcarpetas según necesites (logos, iconos, etc.)

## Formato de Imágenes Recomendado

- **Formato**: JPG, PNG, o WebP
- **Tamaño recomendado**: 800x800px para productos
- **Peso**: Menor a 200KB por imagen (optimizar para web)

## Uso en Componentes

```javascript
import imagenProducto from './assets/products/producto1.jpg'

// Luego usar en el componente:
<img src={imagenProducto} alt="Producto" />
```
