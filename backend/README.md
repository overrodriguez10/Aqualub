# Aqualub Backend

Backend para el sistema de monitoreo de energía de Aqualub en Tierra Bomba. Desarrollado con Node.js, TypeScript, Express y MySQL.

## Requisitos

- Node.js (v18+)
- MySQL

## Configuración

1.  Clona el repositorio.
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Crea un archivo `.env` en la raíz del proyecto basado en `.env.example` (o usa los valores por defecto si tienes MySQL local sin contraseña):
    ```env
    PORT=3001
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_NAME=aqualub_db
    ```
4.  El sistema inicializará automáticamente la base de datos y las tablas al arrancar por primera vez.

## Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/zones`: Lista todas las zonas y su estado actual.
- `POST /api/zones/report`: Reporta un corte de energía (`{ "zoneId": ID }`).
- `POST /api/zones/restore`: Reporta restauración de energía (`{ "zoneId": ID }`).
- `GET /api/reports`: Historial de los últimos 20 reportes.
- `GET /api/health`: Estado del servidor.

## Estructura del Proyecto

- `src/controllers`: Lógica de negocio.
- `src/routes`: Definición de endpoints.
- `src/db.ts`: Configuración e inicialización de la base de datos.
- `src/index.ts`: Punto de entrada del servidor.
