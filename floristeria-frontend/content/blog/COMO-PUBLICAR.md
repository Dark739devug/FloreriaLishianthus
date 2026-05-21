# Cómo publicar en el blog

1. Crea un archivo `.md` en esta carpeta (`content/blog/`).
2. Copia la plantilla de abajo y rellena los campos.
3. Guarda el archivo. En desarrollo verás el cambio al recargar; en producción haz deploy de nuevo.

## Plantilla

```md
---
title: "Título llamativo del artículo"
slug: "url-amigable-sin-espacios"
excerpt: "Resumen corto que aparece en la tarjeta (1-2 frases)."
coverImage: "https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg"
category: "Consejos"
author: "Florería Lisianthus"
publishedAt: "2026-05-20"
featured: false
---

Escribe aquí el contenido en **Markdown**.

## Subtítulo

- Lista con ideas
- Más puntos

> Cita o tip destacado

[Ver catálogo](/#catalogo)
```

## Categorías sugeridas

- `Consejos` — guías prácticas
- `Tendencias` — novedades y estilos
- `Ocasiones` — fechas especiales
- `Cuidado` — mantenimiento de flores

## Consejos para atraer clientes

- Títulos con beneficio claro: "5 ramos que...", "Cómo elegir..."
- Incluye fotos de calidad en `coverImage`
- Termina con enlace al catálogo o a `/disena`
- Marca `featured: true` solo en el artículo destacado del mes
