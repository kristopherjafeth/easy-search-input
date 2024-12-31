declare module 'easy-search-input' {
    import { ComponentType } from 'react';
  
    interface EasySearchInputProps {
      theme?: string;
      // Agrega otras propiedades que el componente pueda aceptar
    }
  
    const EasySearchInput: ComponentType<EasySearchInputProps>;
  
    export default EasySearchInput;
  }