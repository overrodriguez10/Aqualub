# Guía de Despliegue - AQUALUB

Sigue estos pasos para que tu proyecto esté en internet y funcione desde cualquier computadora.

## 1. Base de Datos en la Nube (MySQL)
Como `localhost` no funciona en internet, necesitas una base de datos real.
1.  Crea una cuenta gratuita en [Aiven.io](https://aiven.io/) o [Railway.app](https://railway.app/).
2.  Crea un servicio de **MySQL**.
3.  Copia la **Connection URI** o los datos de conexión (Host, User, Password, Port).

## 2. Desplegar el Backend (Render)
1.  Sube tu código a un repositorio de **GitHub**.
2.  Entra en [Render.com](https://render.com/) y crea un nuevo **Web Service**.
3.  Conecta tu repositorio de GitHub.
4.  Configura los comandos:
    - **Build Command**: `cd backend && npm install && npm run build`
    - **Start Command**: `cd backend && npm start`
5.  En la sección **Environment**, agrega las variables de tu base de datos en la nube:
    - `DB_HOST`: (el host de Aiven/Railway)
    - `DB_USER`: (el usuario)
    - `DB_PASSWORD`: (la contraseña)
    - `DB_NAME`: `aqualub_db`
    - `PORT`: `3001`
6.  Copia la URL que te de Render (ej: `https://aqualub-backend.onrender.com`).

## 3. Desplegar el Frontend (Vercel)
1.  Entra en [Vercel.com](https://vercel.com/) y crea un nuevo proyecto.
2.  Conecta el mismo repositorio de GitHub.
3.  Configura la carpeta raíz como `frontend`.
4.  En **Environment Variables**, agrega:
    - `VITE_API_URL`: `https://tu-url-de-render.onrender.com/api` (la que copiaste en el paso anterior).
5.  ¡Dale a **Deploy**!

---

### ¿Por qué no corría en otro computador?
El servidor usaba `localhost`, que solo existe dentro de TU computadora. Al desplegarlo en la nube con una base de datos real, ahora cualquier persona con el link de Vercel podrá usar la aplicación.
