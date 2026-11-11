# Luuna – prototipo de menú para Maze

Maqueta estática del home de luuna.mx para una prueba de usabilidad del **menú** en Maze.
El home es una maqueta general; lo interactivo es la navegación:

- **Desktop** (`index.html`): menús desplegables Colchones, Habitación, Sala, Conoce más y Mi cuenta (clic para abrir/cerrar, Esc o clic fuera para cerrar).
- **Móvil** (`mobile.html`): menú hamburguesa con secciones colapsables.
- Se redirige automáticamente según el ancho de pantalla (corte en 900 px).
- Cada link lleva a una página destino `go/<ruta>/` (ver `destinos.json`), útil para definir las rutas esperadas / éxito de la tarea en Maze.

## Maze
El snippet de Maze ya está instalado justo después de `<head>` en todas las páginas.

## Local
```bash
python3 -m http.server 8765
```
