# Laboratorio semestral de sistemas distribuidos
## Integrantes
- Nicolás Romero
- Richard Torti
- Franco Leal

# Descripción de la solución
Para este laboratorio, se implementa una aplicacion que permite buscar informacion de peliculas. En el documento se explicara la arquitectura de como fue distribuida la aplicacion.

# Desplegar aplicacion

Se requiere tener Node.js, MongoDB y opcionalmente HAProxy. Luego se ejecutan los siguientes comandos:

Este comando levanta 3 replicas del back-end, y un balanceador de carga que usa round-robin, en caso de no tener HAProxy.
```
./start.sh
```
Luego se levanta el front-end.
```
cd front-buscador
npm start
```

![alt image](https://i.ibb.co/Q91FfVN/imagen.png "Aplicacion")


## Análisis y diseño de la arquitectura propuesta
El sistema fue diseñado para hacer consultas de formas distribuidas y es por esto, que cada uno de los procesos requiere un análisis para encontrar puntos críticos y posibles fallas o mejoras de la aplicación y su infraestructura. 
Al momento de que el usuario realiza una accion que gatilla la acción del front-end (como en este caso, realiza una consulta), ésta se va al proxy, el cual funciona como balanceador de carga, el cual lo recibe y redirige la consulta al servidor que tenga menos conexiones actualmente. Luego de que la consulta es adquirida por la aplicación, se realiza el proceso de obtención de los documentos que contienen la consulta. Esto se logra gracias al uso de indices invertidos y que conecta con la base de datos MongoDB para extraer la información anteriormente pedida. 



## Análisis de rendimiento de la arquitectura

Con la ayuda de la herramienta Apache HTTP server benchmarking tool, se hacen test de stress a la aplicacion.Para esto se realizan 25 conexiones durante 5 segundos con el balanceador de carga activado y 3 servidores de backend sirivendo las peticiones. La peticion realizada corresponde a obtener todas las peliculas de la base de datos.

```
ab -c25 -t5-k http://localhost:80/movie/all
```

Este test nos entrega un tiempo de respuesta promedio de 265 ms con un tiempo maximo de 605 ms. A modo de comparacion, cuando se realizo la misma consulta sin el balanceador de carga, el tiempo promedio fue de 618 ms y el tiempo maximo de 1233 ms. Se puede ver que la mejora es sustancial.

A continuacion se muestra una captura de la pagina de stats del HAProxy mientras se realizaba el test.

![alt image](https://i.ibb.co/fMJ9b1k/imagen.png "HAProxy Stats")



## Análisis sobre tolerancia a fallas y disponibilidad por parte del sistema

## Selección del servidor y enrutamiento de la consulta realizada por el cliente

## Paralelización de la consulta

## Análisis de la distribución de la base de datos

## Referencias

Para el HAProxy: https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts
Para el balanceador de carga usando Node.js: https://mazira.com/blog/introduction-load-balancing-nodejs
Apache HTTP server benchmarking tool : https://httpd.apache.org/docs/2.4/programs/ab.html
Express.js framwork: https://expressjs.com/es/
