# 🗄️ Documentación Técnica - Backend API (Sistema de Gestión)

## 1\. Visión General

Este proyecto consiste en una API RESTful desarrollada con **Node.js** y **Express**, diseñada para gestionar la lógica de negocio de un sistema comercial (e-commerce/gastronomía). La arquitectura implementa el patrón **Controller-Service** para desacoplar el manejo de peticiones HTTP de la lógica de negocio y acceso a datos.

El servidor está configurado para ejecutarse como un Módulo de ES (`"type": "module"`) y sirve los recursos bajo el prefijo `/api`.

## 2\. Stack Tecnológico y Dependencias

El núcleo del servidor utiliza las siguientes tecnologías clave definidas en el `package.json`:

  * **Core:**
      * `express` (^5.1.0): Framework web para el manejo de rutas y servidor.
      * `mongoose` (^8.18.3): ODM para modelado de datos en MongoDB.
      * `dotenv` (^17.2.2): Gestión de variables de entorno.
  * **Seguridad y Autenticación:**
      * `argon2` (^0.44.0): Hashing avanzado de contraseñas (más seguro que bcrypt).
      * `jsonwebtoken` (^9.0.2): Generación y validación de tokens de sesión.
      * `cors` (^2.8.5): Configuración de acceso cruzado (Cross-Origin Resource Sharing).
  * **Utilidades y Validaciones:**
      * `express-validator` (^7.2.1): Middleware para validación de datos entrantes.
      * `morgan` (^1.10.1): Logger de peticiones HTTP para desarrollo.
      * `nodemon`: Reinicio automático del servidor en entorno de desarrollo.

## 3\. Instalación y Configuración

### Requisitos Previos

  * Node.js v16 o superior.
  * MongoDB (Instancia local o Cluster en Atlas).

### Pasos para levantar el proyecto

1.  **Instalación de dependencias:**
    Ejecuta el siguiente comando para instalar las librerías listadas en `package.json`:

    ```bash
    npm install
    ```

2.  **Configuración de Entorno (.env):**
    Crea un archivo `.env` en la raíz del proyecto con las siguientes variables (ajusta según tu entorno):

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos
    SECRET_KEY=tu_clave_secreta_jwt
    ```

    *Nota: El puerto por defecto configurado en `index.js` es 3000*.

3.  **Ejecución:**

      * **Modo Desarrollo:** Utiliza `nodemon` para recarga automática.
        ```bash
        npm run dev
        ```
      * **Modo Producción:**
        ```bash
        npm start
        ```

## 4\. Arquitectura del Proyecto

El punto de entrada es `index.js`, donde se inicializa la conexión a la base de datos (`connectDB`), se aplican los middlewares globales (`cors`, `express.json`, `morgan`) y se definen las rutas base.

**Estructura de Directorios:**

```text
backend/
├── src/
│   ├── config/         # Conexión a DB (config.db.js)
│   ├── controllers/    # Controladores (Manejo de req/res)
│   ├── services/       # Lógica de negocio y consultas a BD
│   ├── models/         # Modelos de Mongoose
│   ├── routes/         # Definición de endpoints
│   └── middlewares/    # Validaciones y Auth
├── index.js            # Entry Point
└── package.json
```

-----

## 5\. Referencia de API (Endpoints)

Todas las rutas están prefijadas con `/api`. Las respuestas siguen una estructura estandarizada JSON: `{ msg, statusCode, data }` o similar.

### 👤 Usuarios (Auth)

Gestión de cuentas segura utilizando **Argon2** para encriptación.

| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/usuarios/register` | Registro de nuevo usuario. | Público |
| **POST** | `/api/usuarios/login` | Inicio de sesión (Retorna JWT). | Público |
| **GET** | `/api/usuarios` | Listar todos los usuarios. | Admin |
| **PUT** | `/api/usuarios/:id` | Editar usuario. | Admin/Propio |
| **DELETE** | `/api/usuarios/:id` | Eliminar usuario. | Admin |

### 🍔 Productos

Gestión del catálogo comercial.

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/productos` | Obtener lista de productos. |
| **GET** | `/api/productos/:id` | Obtener detalle de producto. |
| **POST** | `/api/productos` | Crear nuevo producto. |
| **PUT** | `/api/productos/:id` | Actualizar producto existente. |
| **DELETE** | `/api/productos/:id` | Eliminar producto. |

### 📅 Reservas

Sistema de gestión de mesas con validación de conflictos (evita duplicados de mesa/hora).

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/reservas` | Listar reservas (soporta filtros por query). |
| **POST** | `/api/reservas` | Crear reserva. |
| **GET** | `/api/reservas/:id` | Ver detalle de reserva. |
| **PUT** | `/api/reservas/:id` | Modificar datos de reserva. |
| **DELETE** | `/api/reservas/:id` | Cancelar reserva. |

### 📦 Pedidos

Gestión de órdenes con estados específicos (`pending`, `confirmed`, `ready`, etc.).

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **POST** | `/api/pedidos` | Generar nuevo pedido. |
| **GET** | `/api/pedidos` | Historial de pedidos. |
| **GET** | `/api/pedidos/:id` | Detalle de pedido específico. |
| **PUT** | `/api/pedidos/:id/estado`| Actualizar estado del pedido. |
| **DELETE** | `/api/pedidos/:id` | Eliminar registro de pedido. |

### 📩 Contacto

Gestión de mensajes enviados desde el formulario web.

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **POST** | `/api/contactos` | Enviar mensaje de contacto. |
| **GET** | `/api/contactos` | Ver mensajes recibidos. |
| **GET** | `/api/contactos/:id` | Ver detalle de mensaje. |
| **PUT** | `/api/contactos/:id` | Actualizar estado/info de contacto. |
| **DELETE** | `/api/contactos/:id` | Eliminar mensaje. |

### ⭐ Reseñas

Sistema de opiniones con moderación.

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/resenias` | Obtener todas las reseñas. |
| **POST** | `/api/resenias` | Publicar nueva reseña. |
| **PATCH** | `/api/resenias/:id/estado`| **Moderar** (Activar/Ocultar visibilidad). |
| **DELETE** | `/api/resenias/:id` | Eliminar reseña. |

-----

## 6\. Lógica Destacada

  * **Separación de Responsabilidades:** Los controladores solo manejan la petición HTTP y delegan la lógica compleja a los servicios.
  * **Validaciones de Base de Datos:** Se manejan errores específicos de MongoDB, como el código `11000` para detectar duplicados en reservas.
  * **Seguridad:** Uso de `argon2` en lugar de bcrypt para un hashing de contraseñas más robusto ante ataques de fuerza bruta modernos.
