# DAP_2024

## YUMMLY - Descripción
Yummly es una aplicación de React Native que te permite crear, buscar, guardar y compartir tus recetas favoritas. Utilizando React Native junto con NodeJs y MongoDB, Yummly te brinda una experiencia completa para que puedas administrar tus propias recetas y encontrar las que más te gusten.

Algunas de las características de Yummly:
- Registro de usuarios de forma segura mediante Google. 
- Búsqueda de recetas por Tags: Explora una gran variedad de recetas utilizando filtros como ingredientes, tipo de receta (vegana, vegetariana, etc), y tiempo de preparación entre otros.
- Visualización de la cantidad de calorías, proteínas y grasas totales de cada receta: Lo que te permite tener una noción respecto a los nutrientes que tiene cada receta.
- Calificación por los usuarios: Permite que te guíes respecto al nivel de confianza de una receta según la valoración de la comunidad.
- Funcionalidad de compartir recetas: Yummly te permite compartir las recetas que más te gusten mediante whatsapp, email u otro medio de forma sencilla.


# Instalación 
1. El primer paso es abrir la terminal de Windows o Mac. Luego clonar el repositorio ejecutando el siguiente comando en tu terminal:
git clone https://github.com/federicobergantinos/DAP_2024.git
2. Una vez descargada la carpeta, accede a ella utilizando en la terminal el comando:
cd DAP_2024

## Frontend
Si aun no tienes Android Studio instalado, descargarlo desde la página oficial https://developer.android.com/studio. Es necesario tener un sdk y un device virtual instalado para que funcione como emulador.
Instalar y configurar React Native desde https://reactnative.dev/docs/environment-setup
1. Acceder al frontend utilizando en la terminal el comando:
cd frontend
2. Instala las dependencias de node.js correspondientes con el comando:
npm install
Si aún no tienes Node.js instalado en tu sistema, puedes descargarlo desde la página oficial https://nodejs.org/en/download
3. Realizar la precompilación con Expo con el comando:
npx expo prebuild
4. Iniciar el servidor de desarrollo con:
npx react-native start

Seleccionar android o ios en función de la versión que se quiera ejecutar.

## Backend
1. Acceder al backend utilizando en la terminal el comando:
cd backend
2. Instala las dependencias de node.js correspondientes con el comando:
npm install
Si aún no tienes Node.js instalado en tu sistema, puedes descargarlo desde la página oficial https://nodejs.org/en/download
3. Ingresar en la terminal el comando:
docker run --name daidb -e POSTGRES_PASSWORD=base1234 -e POSTGRES_DB=daidb -p 5432:5432 -d postgres
En caso de no tener Docker, instalarlo desde la página oficial https://docs.docker.com/desktop/install/
4. Ingresar en la terminal el comando:
node index.js

# Tecnologías Utilizadas
- React Native
- Node.js
- Mongodb
- Express.js
- Expo

# Autores
- Bergantiños Federico 
- Santoro Axel
- Cáliz Matías
- Galicia Moreno Nicolás