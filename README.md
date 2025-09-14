# Entrega Final Curso de Backend 2

## Tecnologías utilizadas:

- NodeJS
- ExpressJS
- MongoDB
- Passport, JWT, bcrypt

## Como correr el proyecto de forma local:

1. Correr "npm install" en la terminal.
2. Correr "npm run dev" en la terminal.
4. Actuliazar las variables de enterno con las credenciales correctas.


## Uso📌

A continuación se listan los endpoint correspondientes, junto con una breve descripción, y en caso de corresponder, un ejemplo del body que reciben. También se indica en la columna Role que si el usuario debe ser user o admin para ejecutar determinadas acciones.

### `/api/auth`

| Endpoint    | Http Req | Description                            | Role| Body                                                                                                    |
| ----------- | -------- | -------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------- |
| `/register` | POST     | Registrar nuevo usuario                | -   | `{ "firstName": "Edu","lastName": "Gutierrez", "email": "Edu14@gmail.com", "age": 31,"password": "123457904", "role": "user"}` |
| `/login`    | POST     | Loguear usuario registrado. Las credenciales se almacenan en cookies.             | -   | `{"email": "Edu14@gmail.com","password": "123457904"}`                                              |


### `/api/products`

| Endpoint | Http Req | Description                   | Role| Body                                                                                                                                                                                                    |
| -------- | -------- | ----------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`      | GET      | Obtener todos los productos   | -   | -                                                                                                                                                                                                       |
| `/:pid`   | GET      | Obtener un producto por su Id | -   | -                                                                                                                                                                                                       |
| `/`      | POST     | Guardar un producto           | admin   | `{"title": "Producto 7","description": "Este es otro producto mas","price": 570,"thumbnail":[],"code": "ASDF1245","stock": 42,"category":Electrónica"}` |
| `/:pid`   | PUT      | Actualizar un producto        | admin  | `{ "price": 389 }`                                                                                                                                                                                      |
| `/:pid`   | DELETE   | Eliminar un producto          | admin  | -                                                                                                                                                                                                       |

### `/api/cart`

| Endpoint              | Http Req | Description                                | Role| Body                                                   |
| --------------------- | -------- | ------------------------------------------ | ---- | ------------------------------------------------------ |
| `/`     | POST      | Crear un carrito                           | -   | -                                                      |
| `/:cid`            | GET      | Obtener un carrito              | -   | -                                                      |
| `/:cid/product/:pid`     | POST      | Agregar un producto al carrito | user   | -                                                      |
| `/:cid/product/:pid`     | DELETE      | ELimina un producto al carrito | user   | -                                                      |
| `/:cid/product/:pid`     | PUT      | Modifica la cantidad de un producto en el carrito | user   | { "quantity": 100 }                                                      |
| `/:cid`     | DELETE      | Elimina todo el carrito | user   | { "quantity": 100 }                                                      |
| `//:cid/purchase`     | POST      | Ejecuta la compra de un carrito | user   |                                                       |


### `/api/sessions`

| Endpoint              | Http Req | Description                                | Role| Body                                                   |
| --------------------- | -------- | ------------------------------------------ | ---- | ------------------------------------------------------ |
| `/current`     |    GET   | Devuelve info no sensible del usuario                | -   | -                                                      |


### `/api/users` 
 
| Endpoint              | Http Req | Description                                | Role| Body                                                   |
| --------------------- | -------- | ------------------------------------------ | ---- | ------------------------------------------------------ |
| `/`     |    GET   | Devuelve la información de todos los usuarios                | -   | -                                                      |
