# 📚 ev-qalif — Calculadora de Notas

Aplicación web para calcular **notas acumuladas por corte** y la **nota final de la materia** de forma rápida y precisa. Pensada para estudiantes que necesitan saber, en cualquier momento del semestre, cuánto llevan ganado y cuánto deben sacar para aprobar.

Construida como SPA con **React + TypeScript** sobre **Vite**, siguiendo principios de **Clean Architecture** y **SOLID**, con una capa de presentación desacoplada de la lógica de negocio mediante inyección de dependencias.

---

## ✨ Características

- 🎯 **Cálculo de nota acumulada** a partir de filas dinámicas (nota + porcentaje).
- 📈 **¿Cuánto necesito para pasar?** — Calcula la nota requerida en el porcentaje restante para alcanzar 3.0.
- 🧮 **Nota final por cortes** con ponderaciones fijas (30% / 30% / 40%).
- 🎓 **Proyección del Corte 3** — Indica qué nota se necesita en el último corte para aprobar.
- ✅ **Validación estricta de inputs decimales**: solo `.` como separador, recorte automático de caracteres inválidos, control de rangos `[0.0 – 5.0]` y exigencia de campos completos antes de calcular.
- 🔔 **Alertas elegantes con SweetAlert2** en vez de los `alert()` nativos.
- ⚛️ **Logo del átomo de React** girando en la cabecera, tematizado con el color principal de la marca.
- 📱 **Soporte PWA-ready**: incluye `manifest.webmanifest`, `theme-color` y `apple-touch-icon`.
- ♿ **Accesibilidad básica**: `aria-invalid`, `aria-label`, `prefers-reduced-motion`.
- 🚀 **Despliegue automatizado** a GitHub Pages con `gh-pages`.

---

## 🔄 Alternativas

Existen calculadoras similares en línea (hojas de cálculo, calculadoras genéricas en sitios universitarios, apps Android), pero suelen ser:

- **Demasiado genéricas** y no soportan el modelo colombiano de cortes ponderados (30/30/40).
- **Sin control de inputs**, aceptando comas, letras o valores fuera de rango sin avisar.
- **Sin proyección inversa** (qué necesitas para pasar).

`ev-qalif` se diferencia por estar **enfocada en un caso de uso concreto**, ofrecer **validación estricta** y mantener una **arquitectura limpia y extensible** que facilita añadir nuevas reglas (ej: distintas ponderaciones, escalas de notas, etc.).

---

## 🛡️ Insignias

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-n%2Fa-lightgrey)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-informational)
![React](https://img.shields.io/badge/react-18.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/typescript-5.x-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/vite-5.x-646CFF?logo=vite)

---

## 🛠️ Tecnologías Utilizadas

| Tecnología       | Propósito                                                                 |
| ---------------- | ------------------------------------------------------------------------- |
| **React 18**     | Librería de UI declarativa basada en componentes.                         |
| **TypeScript 5** | Tipado estático para mayor seguridad y mantenibilidad.                    |
| **Vite 5**       | Bundler y dev-server ultrarrápido con HMR.                                |
| **SweetAlert2**  | Alertas modales accesibles y personalizables.                             |
| **Boxicons**     | Set de íconos vía CDN para acciones de UI (eliminar, agregar, etc.).      |
| **gh-pages**     | Publicación automatizada del build estático en GitHub Pages.              |

### Patrón arquitectónico

El proyecto está estructurado en cuatro capas siguiendo **Clean Architecture**:

```
src/
├── domain/          → Entidades y puertos (reglas de negocio puras)
├── application/     → Casos de uso (orquestación)
├── infrastructure/  → Implementaciones concretas (SweetAlert, DI)
└── presentation/    → React: páginas, componentes, hooks, contexto
```

Las dependencias **siempre apuntan hacia adentro**: `presentation → application → domain`. La infraestructura implementa puertos definidos en el dominio (DIP).

---

## 📦 Instalación

### Requisitos previos

- **Node.js** ≥ 18.0
- **npm** ≥ 9.0 (o `pnpm` / `yarn` si prefieres)
- **Git**

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/sebastiannarvaez23/ev-qalif.git
cd ev-qalif

# 2. Instala las dependencias
npm install
```

---

## ▶️ Uso / Ejecución

### Modo desarrollo

```bash
npm run dev
```

La aplicación quedará disponible en [http://localhost:5173](http://localhost:5173) con recarga en caliente (HMR).

### Build de producción

```bash
npm run build
```

Genera la versión optimizada en `dist/`.

### Preview local del build

```bash
npm run preview
```

### Despliegue a GitHub Pages

```bash
npm run deploy
```

Este script ejecuta `npm run build` automáticamente (`predeploy`) y publica la carpeta `dist/` en la rama `gh-pages`.

> 🌐 **Demo en vivo:** [https://sebastiannarvaez23.github.io/ev-qalif](https://sebastiannarvaez23.github.io/ev-qalif)

### Dependencias externas

Esta aplicación **no requiere backend**. Toda la lógica corre en el cliente; no hay APIs, bases de datos ni autenticación.

---

## 🆘 Apoyo

¿Encontraste un bug o tienes una sugerencia?

- 🐛 **Issues**: [https://github.com/sebastiannarvaez23/ev-qalif/issues](https://github.com/sebastiannarvaez23/ev-qalif/issues)
- 💬 **Discusiones**: usa la pestaña *Discussions* del repositorio.
- 📧 **Contacto directo**: abrir un issue es la vía preferida para mantener trazabilidad.

---

## 🗺️ Mapa Vial (Roadmap)

- [ ] 💾 Persistencia local con `localStorage` (recordar última sesión).
- [ ] 🌗 Modo oscuro con `prefers-color-scheme`.
- [ ] 📄 Exportar resultados a PDF.
- [ ] 🎨 Iconos PWA dedicados (`192x192` y `512x512` maskable).
- [ ] 🌐 Internacionalización (i18n) — soporte ES / EN.
- [ ] 🧪 Cobertura de tests unitarios (Vitest) sobre casos de uso del dominio.
- [ ] ⚙️ Configurador de ponderaciones por materia (no solo 30/30/40).
- [ ] 📊 Histórico visual de cálculos previos.

---

## 🤝 Contribuyendo

Las contribuciones son bienvenidas. Para mantener la calidad del código:

1. **Fork** del repositorio.
2. Crea una rama descriptiva:
   ```bash
   git checkout -b feature/mi-mejora
   ```
3. Implementa tu cambio respetando la arquitectura por capas.
4. Asegúrate de que el build pasa:
   ```bash
   npm run build
   ```
5. Haz commit con mensajes claros (estilo *Conventional Commits* recomendado):
   ```bash
   git commit -m "feat(domain): añade validación de escala personalizada"
   ```
6. Abre un **Pull Request** explicando el qué y el porqué del cambio.

> 📌 **Regla de oro**: las dependencias siempre van de afuera hacia adentro. La capa `domain/` no debe importar nada de las otras capas.

---

## ⚙️ Configuración para Desarrollo

### Variables de entorno

Actualmente el proyecto **no requiere variables de entorno**. Si en el futuro se integran servicios externos, se documentarán en un archivo `.env.example`.

### Alias de importación

El `tsconfig.json` y `vite.config.ts` incluyen alias para imports limpios entre capas:

```ts
import { Grade } from "@domain/entities/Grade";
import { useContainer } from "@presentation/context/ContainerContext";
```

| Alias              | Apunta a              |
| ------------------ | --------------------- |
| `@domain/*`        | `src/domain/*`        |
| `@application/*`   | `src/application/*`   |
| `@infrastructure/*`| `src/infrastructure/* |
| `@presentation/*`  | `src/presentation/*`  |

### Buenas prácticas

- ✔️ Cada caso de uso resuelve **una sola operación** (SRP).
- ✔️ La presentación **no instancia** servicios; los recibe vía `ContainerContext` (DIP).
- ✔️ Las entidades validan sus invariantes en sus *factory methods* (`Grade.create`, `FinalGrade.create`).
- ✔️ Las alertas se inyectan como `INotificationService`, nunca llamando a `Swal` directo desde la UI.
- ❌ No usar `alert()`, `confirm()` ni `prompt()` nativos.
- ❌ No mutar el estado de los hooks; siempre devolver nuevas referencias.

### Estructura del proyecto

```
ev-qalif/
├── public/                          # Assets servidos tal cual (favicon, manifest)
├── src/
│   ├── domain/
│   │   ├── entities/                # Grade, FinalGrade
│   │   └── ports/                   # INotificationService
│   ├── application/
│   │   └── useCases/                # CalculateAccumulated, CalculateNeededToPass, ...
│   ├── infrastructure/
│   │   ├── config/theme.ts          # Tokens de diseño
│   │   ├── services/                # SweetAlertNotificationService
│   │   └── di/container.ts          # Composición de dependencias
│   └── presentation/
│       ├── context/                 # ContainerContext (DI por React Context)
│       ├── hooks/                   # useGradeCalculator, useFinalGradeCalculator
│       ├── components/              # AtomLogo, DecimalInput, GradeRow, ...
│       ├── pages/                   # CalculatorPage
│       ├── utils/                   # decimal.ts (sanitización)
│       └── styles/                  # globals.css
├── index.html
├── vite.config.ts
└── tsconfig.json
```

---

## 👥 Autores y Reconocimientos

- **Sebastián Narváez** — Desarrollo y arquitectura — [@sebastiannarvaez23](https://github.com/sebastiannarvaez23)

Agradecimientos a la comunidad de **React**, **Vite** y **SweetAlert2** por las herramientas open-source que hacen posible este proyecto.

---

## 📄 Licencia

Distribuido bajo la licencia **MIT**. Consulta el archivo [`LICENSE`](LICENSE) para más detalles.

```
MIT © 2026 Sebastián Narváez
```

---

## 📍 Estado del Proyecto

🟢 **Activo — En desarrollo.**

Versión actual: `1.0.0`. La aplicación es completamente funcional para los casos de uso definidos. Se aceptan reportes de bugs y propuestas de mejora vía *issues*.

---

> _"Aprende, calcula y aprueba — sin sorpresas."_
