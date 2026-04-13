# Vibras Imóveis - Gestão de propriedades

## Cómo editar las cards sin tocar la lógica

Desde ahora, las propiedades del sitio viven en `properties.json`.
El cliente ya no necesita entrar en `script.js` para agregar, editar o eliminar cards.

## Archivo que se edita

- `properties.json`

Cada objeto del archivo representa una propiedad.
Si el cliente agrega un nuevo bloque siguiendo el mismo formato, aparecerá una nueva card.
Si elimina un bloque, desaparece la card.
Si cambia un texto, precio o imágenes, el sitio lo reflejará automáticamente.

## Campos principales

- `title`: nombre de la propiedad en `pt`, `es` y `en`
- `type`: tipo de operación en `pt`, `es` y `en`
- `location`: barrio o zona
- `area`: referencia de ubicación en `pt`, `es` y `en`
- `price`: precio visible en la card y el modal
- `beds`: cantidad de habitaciones
- `description`: texto largo del modal en `pt`, `es` y `en`
- `highlights`: lista de puntos fuertes en `pt`, `es` y `en`
- `images`: lista de URLs de imágenes

## Pasos para el cliente

1. Abrir `properties.json`.
2. Buscar una propiedad existente.
3. Editar los campos de texto, precio, cantidad de habitaciones o imágenes.
4. Guardar el archivo.
5. Subir el cambio al hosting.

## Para agregar una nueva propiedad

1. Copiar un bloque completo existente.
2. Pegar ese bloque dentro de la lista principal.
3. Cambiar los datos de la nueva propiedad.
4. Verificar que cada propiedad quede separada por comas, excepto la última.

## Para quitar una propiedad

1. Borrar el bloque completo de esa propiedad en `properties.json`.
2. Revisar que la coma del bloque anterior siga correcta.

## Importante al cargar imágenes

- En `images` se pueden poner 1, 3 o 10 imágenes.
- El primer elemento será la imagen principal de la card.
- Todas las imágenes del array se mostrarán en el carrusel del modal.
- Las URLs deben ser públicas y directas.

## Ejemplo de propiedad

```json
{
  "title": {
    "pt": "Casa vista mar em João Fernandes",
    "es": "Casa con vista al mar en João Fernandes",
    "en": "Sea view house in João Fernandes"
  },
  "type": {
    "pt": "Venda",
    "es": "Venta",
    "en": "Sale"
  },
  "location": "João Fernandes",
  "area": {
    "pt": "perto da Praia de João Fernandes",
    "es": "cerca de la Playa de João Fernandes",
    "en": "near João Fernandes Beach"
  },
  "price": "R$ 2.450.000",
  "beds": 4,
  "description": {
    "pt": "Texto largo del modal...",
    "es": "Texto largo del modal...",
    "en": "Long modal text..."
  },
  "highlights": {
    "pt": ["Punto 1", "Punto 2"],
    "es": ["Punto 1", "Punto 2"],
    "en": ["Point 1", "Point 2"]
  },
  "images": [
    "https://...foto-1.jpg",
    "https://...foto-2.jpg"
  ]
}
```

## Qué hace el código automáticamente

- arma las cards
- arma los modales
- arma el carrusel de imágenes
- usa esos datos en el chatbot
- actualiza contenido según idioma

## Recomendación al entregar

Explícale al cliente esto en una frase simple:

"Todo lo editable de las propiedades está en `properties.json`; ahí puedes cambiar texto, precio, habitaciones, ubicación e imágenes sin tocar el funcionamiento de la web."
