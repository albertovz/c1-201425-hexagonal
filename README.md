# c1-201425-hexagonal

Elaborado por: Alberto Vázquez Miranda
201425

Instrucciones para la ejecución del proyecto:

1. Descomprimir el archivo .rar o clonar el repositorio dentro de una carpeta local.
2. Verificar que esté dentro de la raíz del proyecto a la altura del package.json.
3. Ejecutar 'npm install' para descargar todas las dependencias necesarias del proyecto.
4. Para inicializar el servidor ejecutar 'npm start'.
5. Abrir un navegador web y entrar a la url: localhost:3000.
6. Crear una base de datos con el nombre de 'gestion'. No es necesario crear tablas, ya que, si no existe se crea dentro del proyecto en automático.
7. Leer documentación de Postman para ver las rutas disponibles de cada entidad y hacer las pruebas de ejecución necesarias para cada endpoint.
https://documenter.getpostman.com/view/14450437/2s9YJW663J

A continuación endpoints disponibles para la ejecución de pruebas:

User:

    getUser: curl --location 'http://localhost:3000/users/api/user/ccdf627c-98df-4f98-8021-442d347496ac' \
--header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjY2RmNjI3Yy05OGRmLTRmOTgtODAyMS00NDJkMzQ3NDk2YWMiLCJpYXQiOjE2OTU1MzcxNzMsImV4cCI6MTY5NTU3MzE3M30.f_ySyCURJX2zReFxPribsm8tsqlpj8LYpz6tICsN5dk'
    Nos sirve para obtener un usuario por medio de id, solicita token como parámetro de seguridad.

    getUsers: curl --location 'http://localhost:3000/users/api/users' \
--header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhM2MzYzNlNS01NGRhLTQyNTEtODJkMy1hNzU5MDFiNzIwY2MiLCJpYXQiOjE2OTU1NzkwNDgsImV4cCI6MTY5NTYxNTA0OH0.JYJfdG4kT0dxNMhok7P-0QOgTwJ3rmgBXBnrLDDg03M'
    Nos ayuda a obtener todos los usuarios registrados, se necesita token para acceder con permisos.

    getInactiveUsers: curl --location 'http://localhost:3000/users/api/getInactiveUsers' \
--header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhM2MzYzNlNS01NGRhLTQyNTEtODJkMy1hNzU5MDFiNzIwY2MiLCJpYXQiOjE2OTU1MzgzOTksImV4cCI6MTY5NTU3NDM5OX0.2c49woTbwlDqUNYcFJ4vtpwzD1v03LG7WnLp6c6BGmw'
    Nos sirve para obtener todos los usuarios con estado inactivo. Se necesita permiso por medio de token para hacer esta petición.

    getFilterUser: curl --location 'http://localhost:3000/users/api/search?name=&email=' \
--header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhM2MzYzNlNS01NGRhLTQyNTEtODJkMy1hNzU5MDFiNzIwY2MiLCJpYXQiOjE2OTU1MzgzOTksImV4cCI6MTY5NTU3NDM5OX0.2c49woTbwlDqUNYcFJ4vtpwzD1v03LG7WnLp6c6BGmw'
    Endpoint que nos ayuda a filtrar por nombre o correo para una mejor búsqueda, se necesita autorización por medio de token para realizar la petición.

    createUser: curl --location 'http://localhost:3000/users/api/create' \
--header 'authorization;' \
--data-raw '{
    "name": "Alberto",
    "last_name": "Vázquez",
    "email": "avazquez@hotmail.com",
    "password": "alberto",
    "status": 1
}'
    Endpoint que nos sirve para crear un nuevo usuario.

    logoutUser: curl --location --request POST 'http://localhost:3000/users/api/logout/a3c3c3e5-54da-4251-82d3-a75901b720cc' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhM2MzYzNlNS01NGRhLTQyNTEtODJkMy1hNzU5MDFiNzIwY2MiLCJpYXQiOjE2OTU1NzkwNDgsImV4cCI6MTY5NTYxNTA0OH0.JYJfdG4kT0dxNMhok7P-0QOgTwJ3rmgBXBnrLDDg03M'
    Endpoint que nos ayuda a cerrar sesión y elimina el token generado. Se necesita token para realizar esta petición.

    loginUser: curl --location 'http://localhost:3000/users/api/login' \
--data-raw '{
    "email": "avazquez@hotmail.com",
    "password": "alberto"
}'
    Endpoint que nos sirve para iniciar sesión, si las credenciales coincides nos regresa el token que nos ayuda en casi todas las peticiones de permisos para realizar peticiones al servidor.

    updateUser: curl --location --request PUT 'http://localhost:3000/users/api/update/9cd96c10-77ff-4188-afde-0922905908cb' \
--header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5Y2Q5NmMxMC03N2ZmLTQxODgtYWZkZS0wOTIyOTA1OTA4Y2IiLCJpYXQiOjE2OTU1MzE1MzksImV4cCI6MTY5NTU2NzUzOX0.JaXhs4uoNeKdWdmdG6ISKvICf3fhKX-wpMW8myZY3_k' \
--data-raw '{
    "name": "Andrea",
    "last_name": "Galvez",
    "email": "andreita@hotmail.com"
}'
    Endpoint que nos ayuda a actualizar los campos de algún usuario en específico por medio de id y token para permisos de realizar esta petición.

    updateUserPassword: curl --location --request PUT 'http://localhost:3000/users/api/updatePassword/67e4616f-bd96-4572-9623-5d66bd5bb63e' \
--header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2U0NjE2Zi1iZDk2LTQ1NzItOTYyMy01ZDY2YmQ1YmI2M2UiLCJpYXQiOjE2OTU1MzYxNjgsImV4cCI6MTY5NTU3MjE2OH0.7c4hSOF6ZNSlRtNX_9Fa2X0Czs-sI82WfxqzoNw_z1Q' \
--data '{
    "newPassword": "andreita"
}'
    Endpoint que nos permite actualizar la contraseña de un usuario en específico por medio de id como parámetro y token necesario para poder realizar esta petición.

    updateUserStatus: curl --location --request PUT 'http://localhost:3000/users/api/updateStatus/a3c3c3e5-54da-4251-82d3-a75901b720cc' \
--header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhM2MzYzNlNS01NGRhLTQyNTEtODJkMy1hNzU5MDFiNzIwY2MiLCJpYXQiOjE2OTU1MzgzOTksImV4cCI6MTY5NTU3NDM5OX0.2c49woTbwlDqUNYcFJ4vtpwzD1v03LG7WnLp6c6BGmw' \
--data '{
    "newStatus": true
}'
    Endpoint que nos permite actualizar el status del usuaruio. Es necesario el identificador del usuario y token para el permiso y poder realizar esta petición.

    deleteUser: curl --location --request DELETE 'http://localhost:3000/users/api/delete/67e4616f-bd96-4572-9623-5d66bd5bb63e' \
--header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2U0NjE2Zi1iZDk2LTQ1NzItOTYyMy01ZDY2YmQ1YmI2M2UiLCJpYXQiOjE2OTU1MzYxNjgsImV4cCI6MTY5NTU3MjE2OH0.7c4hSOF6ZNSlRtNX_9Fa2X0Czs-sI82WfxqzoNw_z1Q'
    Endpoint que nos permite eliminar un usuario de la base de datos, es necesario pasar el identificador y el token para poder realizar la petición solicitada.

Book:

    getBooks: curl --location 'http://localhost:3000/books/api/books'
    Petición al servidor que nos permite obtener todos los libros registrados.

    getBook: curl --location 'http://localhost:3000/books/api/books/8a4ef781-eef4-4aa7-94da-9af199ac2ce2' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjY2RmNjI3Yy05OGRmLTRmOTgtODAyMS00NDJkMzQ3NDk2YWMiLCJpYXQiOjE2OTU1OTA3MzQsImV4cCI6MTY5NTYyNjczNH0.Mh9qXzNNR6k_ezKo8TkdMpVSqXJs5lZkK3H9uoQ2Iuc'
    Petición al servidor que nos permite obtener un libro en específico por medio de id, es necesario el token para poder realizar esta petición.

    searchBook: curl --location 'http://localhost:3000/books/api/search?title=&author=&code=' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjY2RmNjI3Yy05OGRmLTRmOTgtODAyMS00NDJkMzQ3NDk2YWMiLCJpYXQiOjE2OTU1OTA3MzQsImV4cCI6MTY5NTYyNjczNH0.Mh9qXzNNR6k_ezKo8TkdMpVSqXJs5lZkK3H9uoQ2Iuc'
    Petición al servidor que nos permite búscar un libro que coincida con la palabra clave por medio de título, autor o código de barras. Es necesario el token para poder realizar esta petición.

    getInactiveBooks: curl --location 'http://localhost:3000/books/api/list/inactive?=null' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjY2RmNjI3Yy05OGRmLTRmOTgtODAyMS00NDJkMzQ3NDk2YWMiLCJpYXQiOjE2OTU1OTA3MzQsImV4cCI6MTY5NTYyNjczNH0.Mh9qXzNNR6k_ezKo8TkdMpVSqXJs5lZkK3H9uoQ2Iuc'
    Petición al servidor que nos permite obtener todos los libros con estado inactivo. Es necesario el token para poder realizar esta petición.

    filterReviewsBooks: curl --location ''
    Endpoint que nos ayuda a ver todos los libros con reseñas. Es necesario el token para poder realizar esta petición.

    createBook: curl --location 'http://localhost:3000/books/api/create' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjY2RmNjI3Yy05OGRmLTRmOTgtODAyMS00NDJkMzQ3NDk2YWMiLCJpYXQiOjE2OTU1ODkxNzksImV4cCI6MTY5NTYyNTE3OX0.yI2K9sWFHmn5L6ueQK_fchMa0RtDSLyrY9XhPdqQdRY' \
--data '{
    "title": "Diario de Ana Frank",
    "author": "Ana Frank",
    "description": "En los relatos, se cuenta la historia y vida de Ana Frank como adolescente y los dos años en que permaneció oculta junto a su familia de origen judío de los nazis en Ámsterdam, en plena Segunda Guerra Mundial, hasta que fueron descubiertos.",
    "year": "1947",
    "img_url": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Diario_anne_frank.jpg",
    "status": 1,
    "code": "9780330341882 ",
    "idUser": "ccdf627c-98df-4f98-8021-442d347496ac"
}'
    Petición al servidor que nos permite crear un libro, se pasan parámetros como: título, autor, descripción, url de la imagen, año de publicación, estado, código de barra, id del usuario perteneciente a este libro. Se necesita token para poder realizar esta petición al servidor.

    updateStatusBook: curl --location --request PUT 'http://localhost:3000/books/api/update/4044a574-df34-492c-85b2-65586b9f2bcc/status' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjY2RmNjI3Yy05OGRmLTRmOTgtODAyMS00NDJkMzQ3NDk2YWMiLCJpYXQiOjE2OTU1OTc4MDAsImV4cCI6MTY5NTYzMzgwMH0.ciHIrrD01nBiMzGQXQHx-dvrLIkla6HUGd8lbhUo3aI' \
--data '{
    "title": "Diario de Ana Frank",
    "author": "Ana Frank",
    "description": "En los relatos, se cuenta la historia y vida de Ana Frank como adolescente y los dos años en que permaneció oculta junto a su familia de origen judío de los nazis en Ámsterdam, en plena Segunda Guerra Mundial, hasta que fueron descubiertos.",
    "year": "1947",
    "img_url": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Diario_anne_frank.jpg",
    "status": false,
    "code": "9780330341882 ",
    "idUser": "ccdf627c-98df-4f98-8021-442d347496ac"
}'
    Petición al servidor que nos permite actualizar el estado del libro. Es necesario especificar el libro mediante el id y el token para poder realizar esta peitición. Solo el autor del libro puede hacer la actualización del libro.

    updateBook: curl --location --request PUT 'http://localhost:3000/books/api/updateBook/8a4ef781-eef4-4aa7-94da-9af199ac2ce2' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhM2MzYzNlNS01NGRhLTQyNTEtODJkMy1hNzU5MDFiNzIwY2MiLCJpYXQiOjE2OTU1OTEzMDIsImV4cCI6MTY5NTYyNzMwMn0.Wn9mDos3NIah0YGx3VJwvIoEB9psNykTkq2w9LXalZA' \
--data '{
    "title": "Alberto",
    "author": "Herman Melville",
    "description": "Moby Dickn 1​ es una novela del escritor Herman Melville publicada en 1851. Narra la travesía del barco ballenero Pequod, comandado por el capitán Ahab, junto a Ismael y el arponero Queequeg en la obsesiva y autodestructiva persecución de un gran cachalote blanco.",
    "year": "1851",
    "img_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Moby-Dick_FE_title_page.jpg/330px-Moby-Dick_FE_title_page.jpg",
    "status": 1,
    "code": "9780142437247",
    "idUser": "a3c3c3e5-54da-4251-82d3-a75901b720cc"
}' 
    Petición al servidor que nos permite actualizar campos del libro. Es necesario especificar el libro mediante el id y el token para poder realizar esta petición. Solo el autor del libro puede hacer la actualización.

    deleteBook: curl --location --request DELETE 'http://localhost:3000/books/api/deleteBook/6edf7b7f-c11f-4dcf-90a4-25649445c360' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhM2MzYzNlNS01NGRhLTQyNTEtODJkMy1hNzU5MDFiNzIwY2MiLCJpYXQiOjE2OTU1OTUzMzksImV4cCI6MTY5NTYzMTMzOX0.LvXgKTVvAAA2zNOM1WKImw4D883aRM8PRUe_TCBJfBA'
    Endpoint que nos ayuda a eliminar un libro, es necesario especificar mediante el id y token para poder realizar esta petición. Solo el autor del libro puede realizar esta acción.

Review:

    getReviews: curl --location 'http://localhost:3000/reviews/api/reviews'
    Endpoint que nos ayuda a ver todas las reseñas disponibles.

    getInactiveReviews: curl --location 'http://localhost:3000/reviews/api/reviews/inactives' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhM2MzYzNlNS01NGRhLTQyNTEtODJkMy1hNzU5MDFiNzIwY2MiLCJpYXQiOjE2OTU2MDQzNjQsImV4cCI6MTY5NTY0MDM2NH0.R_yA7zO_ONWr_uB6EhrC0IaF6E_iX52ECfC8HmZ_axI'
    Endpoint que nos ayuda a ver todos los libros con estado inactivo. Es necesario el token para poder realizar esta acción.

    getReview: curl --location 'http://localhost:3000/reviews/api/reviews'
    Endpoint que nos permite obtener una reseña en específica por medio de id, es necesario el token para poder realizar esta acción.

    filterReviews: curl --location 'http://localhost:3000/reviews/api/filter' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhM2MzYzNlNS01NGRhLTQyNTEtODJkMy1hNzU5MDFiNzIwY2MiLCJpYXQiOjE2OTU2MTE1MTEsImV4cCI6MTY5NTY0NzUxMX0.OHl4JpgvOfjhMxuTE8acSjIq-P1L0GuNuJDegF1QSno'
    Endpoint que nos permite filtras las reseñas. Es necesario el token para poder realizar esta acción.

    createReview: curl --location 'http://localhost:3000/reviews/api/create' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhM2MzYzNlNS01NGRhLTQyNTEtODJkMy1hNzU5MDFiNzIwY2MiLCJpYXQiOjE2OTU2MDQzNjQsImV4cCI6MTY5NTY0MDM2NH0.R_yA7zO_ONWr_uB6EhrC0IaF6E_iX52ECfC8HmZ_axI' \
--data '{
    "idBook": "a653e540-124f-4c13-ba3f-5612fe59cb0d",
    "idUser": "a3c3c3e5-54da-4251-82d3-a75901b720cc",
    "description": "Uno de los mejores libros que he leído, sin duda volvería a leerlo.",
    "stars": "5"
}'
    Endpoint que nos permite crear una nueva reseña. Campos como: id del libro, id del usuario, descripción de la reseña, puntuación son requeridas. Es necesario la autorización del token para poder realizar esta petición.

    updateReview: curl --location --request PUT 'http://localhost:3000/reviews/api/update/review/d50fc983-efc6-47d4-94be-e87c805492be' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhM2MzYzNlNS01NGRhLTQyNTEtODJkMy1hNzU5MDFiNzIwY2MiLCJpYXQiOjE2OTU2MDQzNjQsImV4cCI6MTY5NTY0MDM2NH0.R_yA7zO_ONWr_uB6EhrC0IaF6E_iX52ECfC8HmZ_axI' \
--data '{
    "idBook": "a653e540-124f-4c13-ba3f-5612fe59cb0d",
    "idUser": "a3c3c3e5-54da-4251-82d3-a75901b720cc",
    "description": "Uno de los peores libros que he leído, sin duda volvería a leerlo.",
    "stars": "1"
}'
    Endpoint que nos permite actulizar la reseña, solo el autor de la reseña puede actualizar. Es necesario el token para poder realizar esta acción.

    updateStatusReview: curl --location --request PUT 'http://localhost:3000/reviews/api/reviews/d50fc983-efc6-47d4-94be-e87c805492be/change-status' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhM2MzYzNlNS01NGRhLTQyNTEtODJkMy1hNzU5MDFiNzIwY2MiLCJpYXQiOjE2OTU2MDQzNjQsImV4cCI6MTY5NTY0MDM2NH0.R_yA7zO_ONWr_uB6EhrC0IaF6E_iX52ECfC8HmZ_axI' \
--data '{
    "newStatus": false
}'
    Endpoint que nos permite actualizar el estado de la reseña a activar o inactiva. Se necesita especificar por medio del id y token para poder realizar esta acción.

    deleteReview: curl --location --request DELETE 'http://localhost:3000/reviews/api/reviews'
    Endpoint que nos permite eliminar un usuario, se necesita especificar la reseña por medio del id. El token es necesario para poder realizar esta acción.


201425
Universidad Politécnica de Chiapas
