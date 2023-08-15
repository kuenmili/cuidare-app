# Mi Aplicación de Notas

Esta aplicación te permite crear, editar y eliminar notas en una interfaz sencilla y fácil de usar.

## Características

- Creación de notas: Puedes crear nuevas notas con un título, contenido y una imagen.
- Edición de notas: Puedes editar el título, el contenido y la imagen de una nota existente.
- Eliminación de notas: Puedes eliminar notas que ya no necesitas.
- Paginación: Si tienes más de 5 notas, se divide en páginas para una mejor navegación.

## Cambios que le haria
- En primer lugar, podría modularizar más el Cliente para que el componente Home esté menos cargado de información, se reparta la responsabilidad entre distintos componentes y  sea mas legible. Como por ejemplo, un componente solo de paginado.
- En segundo lugar, podría añadir un componente Detail para cada nota, que incluya mas información, como por ejemplo el autor de la nota. Esto último requeriría que utilice una forma distinta de manejar el inicio de sesión para que la aplicación pueda detectar quién inicia sesión y poder transmitir la información a todos los componentes. Podría hacer esto con firebase por ejemplo, que tiene opciones muy simples de iniciar sesión y actualizar el estado del usuario. Incluso expandir esta funcionalidad del inicio de sesión para poder ingresar con terceros (google o algún otro medio) mediante los métodos que tiene firebase Auth, o alguna otra forma de autenticación como JWT.
- En tercer lugar, se podría mejorar la eficiencia ofreciendo un almacenamiento de imágenes (también podría ser con firebase Storage) para subir una o más imágenes a una nube y que no se sobrecargue la base de datos.
- En cuarto lugar, a nivel de estilo, la aplicación es muy sencilla así que ésto podría mejorarse ampliamente, haciendo que la aplicación sea más dinámica y atractiva. Yo utilicé CSS module, pero se podría haber utilizado Tailwind para manejar los estilos por clase y no por archivo modularizado. Creo que le quitaría legibilidad, pero si se aprovechan, los componentes de Tailwind son muy atractivos y fáciles de utilizar.

## Tecnologías Utilizadas

- React: Biblioteca de JavaScript para construir interfaces de usuario.
- Redux: Para una mejor gestión del estado de la aplicación.
- React Router: Navegación entre las diferentes secciones de la aplicación.
- CSS Modules: Estilos modulares para cada componente.
- MongoDB: Base de datos NoSQL para almacenar las notas.
- Node.js: Entorno de ejecución de JavaScript del lado del servidor.
- Express: Framework de Node.js para crear APIs y gestionar solicitudes HTTP.

## Instalación y Uso

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en el directorio del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.
4. Ejecuta `npm start` para iniciar la aplicación en tu navegador.
5. Abre tu navegador y navega a `http://localhost:3000`.

## Cómo Usar la Aplicación

1. En la página principal, verás tus notas en forma de tarjetas.
2. Puedes agregar una nueva nota haciendo clic en el botón "Add Note" en el menú.
3. Rellena los campos de título, contenido e imagen (opcional) y haz clic en "Add Note".
4. Puedes editar una nota existente haciendo clic en el botón de edición en la tarjeta de la nota.
5. Realiza las ediciones necesarias en los campos y haz clic en "Save" para guardar los cambios.
6. Si tienes más de 5 notas, puedes usar la paginación para navegar entre las páginas.