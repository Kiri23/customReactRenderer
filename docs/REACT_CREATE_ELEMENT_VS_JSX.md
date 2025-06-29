# React.createElement vs JSX en Renderers Personalizados

## Problema de Recursión Infinita

### ¿Qué pasó?

Cuando intentamos usar JSX directamente en nuestros componentes personalizados, nos encontramos con un problema de **recursión infinita** que causaba errores de memoria.

### Ejemplo del Problema

```jsx
// ❌ PROBLEMÁTICO - Causa recursión infinita
const TikZCircle = ({ x, y, radius, options, ...props }) => (
  <TikZCircle x={x} y={y} radius={radius} options={options} {...props} />
);
```

### ¿Por qué ocurre la recursión?

1. **React intenta renderizar** `<TikZCircle>`
2. **Ejecuta la función** `TikZCircle`
3. **La función retorna** `<TikZCircle>` (otra vez)
4. **React intenta renderizar** `<TikZCircle>` (otra vez)
5. **Se repite infinitamente** → Error de memoria

```
TikZCircle → <TikZCircle> → TikZCircle → <TikZCircle> → ...
```

## Solución: React.createElement

### ¿Por qué funciona?

```jsx
// ✅ CORRECTO - No causa recursión
const TikZCircle = ({ x, y, radius, options, ...props }) =>
  React.createElement("tikzcircle", { x, y, radius, options, ...props });
```

### Ventajas de React.createElement

1. **No hay recursión**: `React.createElement` crea un elemento con un nombre de string, no una función
2. **Control total**: Podemos especificar exactamente qué tipo de elemento crear
3. **Consistencia**: Funciona igual que los componentes HTML nativos
4. **Flexibilidad**: Podemos usar nombres personalizados para nuestro renderer

## Mapeo en el Renderer

### Estructura del Mapping

```js
const defaultMapping = {
  // Componentes LaTeX básicos
  Document: "document",
  Section: "section",
  Paragraph: "paragraph",
  
  // Componentes TikZ (nombres en minúsculas)
  tikzdiagram: "tikzdiagram",
  tikzcircle: "tikzcircle",
  tikzrectangle: "tikzrectangle",
  tikzline: "tikzline",
  tikzarrow: "tikzarrow",
  tikznode: "tikznode",
  tikzgrid: "tikzgrid",
  tikzaxis: "tikzaxis",
  tikzflowchart: "tikzflowchart",
  tikzflowchartnode: "tikzflowchartnode",
  tikzflowchartarrow: "tikzflowchartarrow",
};
```

### ¿Por qué nombres en minúsculas?

1. **Consistencia**: Los elementos HTML nativos son en minúsculas
2. **Claridad**: Distingue entre componentes React y elementos del renderer
3. **Evita conflictos**: No hay confusión con componentes React reales

## Flujo de Renderizado

### 1. Componente JSX
```jsx
<TikZCircle x={2} y={2} radius={1} options="fill=blue" />
```

### 2. React.createElement
```js
React.createElement("tikzcircle", { x: 2, y: 2, radius: 1, options: "fill=blue" })
```

### 3. Renderer Mapping
```js
// El renderer busca "tikzcircle" en el mapping
tikzcircle: "tikzcircle"
```

### 4. Template LaTeX
```js
tikzcircle: (props, children) => {
  const { x, y, radius, options } = props;
  return `\\draw[${options}] (${x},${y}) circle (${radius}cm);`;
}
```

### 5. Output Final
```latex
\draw[fill=blue] (2,2) circle (1cm);
```

## Alternativas Consideradas

### Opción 1: JSX con elementos host
```jsx
// ✅ Funciona pero es menos elegante
const TikZCircle = ({ x, y, radius, options, ...props }) => (
  <div data-component="tikzcircle" x={x} y={y} radius={radius} options={options} {...props} />
);
```

### Opción 2: null con displayName
```jsx
// ✅ Funciona para renderers personalizados
const TikZCircle = ({ x, y, radius, options, ...props }) => null;
TikZCircle.displayName = "tikzcircle";
```

### Opción 3: React.createElement (Elegida)
```jsx
// ✅ Mejor opción para nuestro caso
const TikZCircle = ({ x, y, radius, options, ...props }) =>
  React.createElement("tikzcircle", { x, y, radius, options, ...props });
```

## Lecciones Aprendidas

1. **JSX no siempre es la mejor opción** para componentes de renderer personalizado
2. **React.createElement** da control total sobre el tipo de elemento
3. **Nombres consistentes** son cruciales para el mapeo
4. **La recursión** puede ser sutil pero devastadora
5. **Testing temprano** ayuda a detectar problemas de memoria

## Conclusión

Para renderers personalizados como el nuestro, `React.createElement` es la opción más robusta porque:

- ✅ Evita recursión infinita
- ✅ Proporciona control total
- ✅ Es consistente con el patrón de renderer
- ✅ Permite nombres personalizados
- ✅ Es fácil de debuggear

El ejemplo TikZ ahora funciona perfectamente y genera documentos LaTeX completos sin errores de memoria. 