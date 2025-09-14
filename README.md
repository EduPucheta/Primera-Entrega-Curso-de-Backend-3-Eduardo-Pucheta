# Primera entrega Curso de Backend 3

## Tecnologías utilizadas:

- NodeJS
- ExpressJS
- MongoDB
- Faker, bcrypt

## Como correr el proyecto de forma local:

1. Correr "npm install" en la terminal.
2. Correr "npm run dev" en la terminal.
4. Actuliazar las variables de enterno con las credenciales correctas.


## Uso📌

A continuación se listan los endpoint correspondientes, junto con una breve descripción, y en caso de corresponder, un ejemplo del body que reciben. También se indica en la columna Role que si el usuario debe ser user o admin para ejecutar determinadas acciones.

### `/api/users` 

| Endpoint              | Http Req | Description                                | Role| Body                                                   |
| --------------------- | -------- | ------------------------------------------ | ---- | ------------------------------------------------------ |
| `/`                   | GET      | Devuelve la información de todos los usuarios | -   | -                                                      |
| `/:userId`            | GET      | Devuelve la información de un usuario específico | -   | -                                                      |
| `/`                   | POST     | Crea un nuevo usuario                      | -   | `{"first_name": "string", "last_name": "string", "email": "string", "age": number, "password": "string", "role": "user/admin"}` |
| `/:userId`            | PUT      | Actualiza un usuario existente             | -   | `{"first_name": "string", "last_name": "string", "email": "string", "age": number, "password": "string", "role": "user/admin"}` |
| `/:userId`            | DELETE   | Elimina un usuario específico              | -   | -                                                      |

### `/api/pets`

| Endpoint              | Http Req | Description                                | Role| Body                                                   |
| --------------------- | -------- | ------------------------------------------ | ---- | ------------------------------------------------------ |
| `/`                   | GET      | Devuelve la información de todas las mascotas | -   | -                                                      |
| `/:petId`             | GET      | Devuelve la información de una mascota específica | -   | -                                                      |
| `/`                   | POST     | Crea una nueva mascota                     | -   | `{"name": "string", "species": "string", "birthDate": "string", "owner": "ObjectId"}` |
| `/:petId`             | PUT      | Actualiza una mascota existente            | -   | `{"name": "string", "species": "string", "birthDate": "string", "owner": "ObjectId"}` |
| `/:petId`             | DELETE   | Elimina una mascota específica             | -   | -                                                      |

### `/api/mocks`

| Endpoint              | Http Req | Description                                | Role| Body                                                   |
| --------------------- | -------- | ------------------------------------------ | ---- | ------------------------------------------------------ |
| `/mockingpets`        | GET      | Genera 100 mascotas de prueba (mock data) | -   | -                                                      |
| `/mockingusers`       | GET      | Genera 50 usuarios de prueba (mock data)  | -   | -                                                      |
| `/generateData`       | POST     | Genera e inserta datos de prueba en la BD | -   | `{"users": number, "pets": number}`                   |
