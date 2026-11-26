# CV Generator

Generador de currículum vitae responsive, construido con HTML, CSS y JavaScript. Permite cambiar entre tema claro y oscuro y exportar el CV a PDF con **html2pdf.js**.

<p align="center">
  <a href="https://freedarwuin.github.io/cv-generator/">
    <img src="previews/live-server.png" alt="Vista previa de CV Generator" width="700">
  </a>
</p>

<p align="center">
  <a href="https://freedarwuin.github.io/cv-generator/">Ver demo en vivo</a>
  ·
  <a href="#personalizacion">Personalizar</a>
  ·
  <a href="#ejecucion-local">Ejecutar localmente</a>
</p>

## Características

- Diseño responsive para escritorio, laptop, tablet y móvil.
- Modo claro y modo oscuro con preferencia guardada en `localStorage`.
- Exportación del currículum a PDF mediante `html2pdf.js 0.9.3`.
- Cálculo automático de la edad.
- Menú adaptable y navegación con sección activa.
- Botón para volver al inicio.
- Iconos de Font Awesome.
- Descarga directa de PDFs pregenerados desde pantallas móviles.
- Currículum organizado en experiencia, educación, habilidades, certificados e intereses.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) 0.9.3
- [Font Awesome](https://fontawesome.com/)

## Vista previa

| Vista previa | Archivo |
| --- | --- |
| Servidor local | [`previews/live-server.png`](previews/live-server.png) |
| Ir a Live Server | [`previews/go-live.png`](previews/go-live.png) |
| Puerto 5500 | [`previews/port-5500.png`](previews/port-5500.png) |

## Ejecución local

No se requieren dependencias ni pasos de compilación.

```bash
git clone https://github.com/freedarwuin/cv-generator.git
cd cv-generator
```

Puedes abrir `index.html` directamente en el navegador. Para evitar restricciones de recursos locales y probar correctamente la generación de PDF, se recomienda usar un servidor local:

### Visual Studio Code

1. Instala la extensión **Live Server**.
2. Abre la carpeta del proyecto.
3. Haz clic en **Go Live** en la barra inferior.
4. Accede a la dirección que aparece en el navegador, normalmente `http://127.0.0.1:5500/`.

También puedes usar una extensión de servidor local o una herramienta equivalente de tu editor preferido.

## Personalización

La información principal se encuentra en [`index.html`](index.html). Puedes modificar:

- Nombre y profesión.
- Datos de contacto.
- Perfil profesional.
- Experiencia laboral.
- Educación y certificados.
- Habilidades e idiomas.
- Intereses y fortalezas.
- Redes sociales y proyectos.

Los estilos se encuentran en:

- `assets/stylesheets/style.css`
- `assets/stylesheets/layout.css`

La lógica principal está en [`assets/javascripts/main.js`](assets/javascripts/main.js). Allí se controlan el menú, el tema, la navegación activa y la generación del PDF.

### Cambiar la foto de perfil

Reemplaza el archivo `assets/pictures/profile.png` conservando el mismo nombre, o modifica la propiedad `src` del elemento con `id="home-img"` en `index.html`:

```html
<img src="assets/pictures/profile.png" alt="Foto de Darwuin Pedroza" class="home_img" id="home-img">
```

### Cambiar la fecha de nacimiento

Para actualizar el cálculo automático de la edad, modifica la variable `fechaNac` en `assets/javascripts/main.js`:

```javascript
const fechaNac = "1988-01-22";
```

El formato debe ser `AAAA-MM-DD`.

### Cambiar los iconos

Los iconos utilizan clases de [Font Awesome](https://fontawesome.com/icons). Puedes reemplazar una clase como `fa-user` por otro icono disponible y conservar las clases de estructura del proyecto.

## Exportar a PDF

Haz clic en el icono de descarga situado junto al currículum. El archivo generado será nombrado según el tema activo:

- `Darwuin Pedroza-light.pdf`
- `Darwuin Pedroza-dark.pdf`

El PDF se genera desde el elemento `#area-cv` con una orientación A4 vertical.

En dispositivos móviles, el botón **Descargar CV** selecciona un PDF preexistente según el tema:

- `assets/pdf/myResumeCV-light.pdf`
- `assets/pdf/myResumeCV-dark.pdf`

## Estructura del proyecto

```text
cv-generator/
├── assets/
│   ├── javascripts/
│   │   ├── main.js
│   │   ├── html2pdf.v0.8.0.bundle.min.js
│   │   └── html2pdf.v0.9.3.bundle.min.js
│   ├── pdf/
│   │   ├── myResumeCV-dark.pdf
│   │   └── myResumeCV-light.pdf
│   ├── pictures/
│   │   ├── favicon/
│   │   ├── profile.png
│   │   └── profile.txt
│   └── stylesheets/
│       ├── layout.css
│       └── style.css
├── previews/
│   ├── go-live.png
│   ├── live-server.png
│   └── port-5500.png
├── index.html
└── README.md
```

## Demo

La versión publicada está disponible en:

<https://freedarwuin.github.io/cv-generator/>

## Créditos

Proyecto adaptado de [cv-generator](https://github.com/LeaG76/cv-generator) creado por Léa Gallier y personalizado por Darwuin Pedroza.

Inspirado inicialmente en el proyecto **Responsive Resume Cv Smith** de [Bedimcode](https://github.com/bedimcode).
