# PostureCheck — Frontend

Aplicación frontend desarrollada con React y Vite para el curso Full Stack de Tecsup.

El proyecto implementa un CRUD completo (Create, Read, Update y Delete) de evaluaciones posturales, consumiendo una API REST propia desarrollada con Node.js, Express y PostgreSQL.

## Tecnologías utilizadas

### Frontend
- React
- Vite
- JavaScript
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express
- PostgreSQL (Neon)

### Deploy
- Vercel (Frontend)
- Render (Backend)
- Neon (Base de datos)

## Funcionalidades

- Landing page
- Registro e inicio de sesión con JWT
- Diagrama corporal SVG interactivo para selección de zona
- Crear evaluaciones posturales
- Listar evaluaciones con búsqueda y paginación
- Ver detalle de evaluación con recomendaciones
- Editar evaluaciones
- Eliminar evaluaciones con confirmación
- Dashboard con gráfica de evolución del dolor
- Recomendaciones personalizadas por zona
- Biblioteca de ejercicios
- Diseño responsive (desktop y mobile)
- Formularios controlados con validaciones

## Arquitectura del proyecto

```
src
├── components
│   ├── BodyDiagram.jsx
│   ├── ItemForm.jsx
│   ├── ItemList.jsx
│   ├── Loader.jsx
│   ├── Modal.jsx
│   ├── PainScale.jsx
│   ├── Sidebar.jsx
│   └── Toast.jsx
├── constants
│   └── zones.js
├── context
│   └── AuthContext.jsx
├── hooks
│   ├── useAuth.js
│   └── useEvaluaciones.js
├── services
│   └── api.js
├── styles
│   └── index.css
├── views
│   ├── AuthView.jsx
│   ├── DashboardView.jsx
│   ├── DetailView.jsx
│   ├── EditView.jsx
│   ├── EvaluationFormView.jsx
│   ├── EvaluationZoneView.jsx
│   ├── ExercisesView.jsx
│   ├── HistoryView.jsx
│   ├── LandingView.jsx
│   ├── ProfileView.jsx
│   ├── RecommendationsView.jsx
│   └── WelcomeView.jsx
├── App.jsx
└── main.jsx
```

## Backend utilizado

API REST desarrollada con:

- Node.js + Express
- PostgreSQL (Neon)
- JWT + bcrypt
- Render

Repositorio backend:
https://github.com/TU_USUARIO/posturecheck-back

## Deploy

Aplicación desplegada en Vercel:
https://posturecheck-front.vercel.app

## Variables de entorno

Crear archivo `.env.local` con el siguiente contenido:

```
VITE_API_BASE_URL=https://posturecheck-back.onrender.com/api/v1
```

## Instalación local

Clonar repositorio:
```bash
git clone https://github.com/TU_USUARIO/posturecheck-front.git
```

Ingresar al proyecto:
```bash
cd posturecheck-front
```

Instalar dependencias:
```bash
pnpm install
```

Ejecutar proyecto:
```bash
pnpm dev
```

## CRUD implementado

| Operación | Método HTTP | Endpoint |
|---|---|---|
| Listar evaluaciones | GET | `/api/v1/evaluaciones` |
| Ver evaluación | GET | `/api/v1/evaluaciones/:id` |
| Crear evaluación | POST | `/api/v1/evaluaciones` |
| Actualizar evaluación | PUT | `/api/v1/evaluaciones/:id` |
| Eliminar evaluación | DELETE | `/api/v1/evaluaciones/:id` |

## Autor


Arturo Chaparro
Curso Full Stack java — Tecsup

















