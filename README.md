# EasySearchInput

Este proyecto contiene el componente `EasySearchInput`, que permite realizar búsquedas de productos en una aplicación React. El componente gestiona el estado de la búsqueda, los resultados y el estado de carga, proporcionando una experiencia de usuario fluida.

## Estructura del Proyecto

```
easy-search-input
├── src
│   ├── EasySearchInput.tsx       # Componente principal para la búsqueda de productos
│   └── utils
│       └── ImageWithFallback.tsx  # Componente para mostrar imágenes con fallback
├── package.json                   # Configuración de npm y dependencias
├── tsconfig.json                  # Configuración de TypeScript
├── .gitignore                     # Archivos y carpetas a ignorar en el control de versiones
└── README.md                      # Documentación del proyecto
```

## Instalación

Para instalar el paquete, utiliza npm:

```
npm install easy-search-input
```

## Uso

Para utilizar el componente `EasySearchInput`, importa el componente en tu archivo de React:

```tsx
import EasySearchInput from 'easy-search-input';

const App = () => {
  return (
    <div>
      <h1>Buscar Productos</h1>
      <EasySearchInput />
    </div>
  );
};

export default App;
```

## Dependencias

Este proyecto utiliza las siguientes dependencias:

- React
- Next.js

Asegúrate de tener estas librerías instaladas en tu proyecto.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.