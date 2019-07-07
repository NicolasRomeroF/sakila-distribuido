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

A continuación se muestra el resultado entregado por la aplicación en la cual se ingresó la búsqueda "academy" y los resultados entregados son todas las películas que tienen relación con academia tanto en su título como en su descripción.

![alt image](https://i.ibb.co/Q91FfVN/imagen.png "Aplicacion")


## Análisis y diseño de la arquitectura propuesta
El sistema fue diseñado para hacer consultas de formas distribuidas y es por esto, que cada uno de los procesos requiere un análisis para encontrar puntos críticos y posibles fallas o mejoras de la aplicación y su infraestructura. 
Al momento de que el usuario realiza una accion que gatilla la acción del front-end (como en este caso, realiza una consulta), ésta se va al proxy, el cual funciona como balanceador de carga, el cual lo recibe y redirige la consulta al servidor que tenga menos conexiones actualmente. Luego de que la consulta es adquirida por la aplicación, se realiza el proceso de obtención de los documentos que contienen la consulta. Esto se logra gracias al uso de indices invertidos que conecta con la base de datos MongoDB para extraer la información anteriormente pedida. Una vez realidada la consulta, es devueta hasta llegar al front-end donde se muestran los resultados obtenidos.



## Análisis de rendimiento de la arquitectura

Con la ayuda de la herramienta Apache HTTP server benchmarking tool, se hacen test de stress a la aplicacion. Para esto se realizan 25 conexiones durante 5 segundos con el balanceador de carga activado y 3 servidores de backend sirivendo las peticiones. La peticion realizada corresponde a obtener todas las peliculas de la base de datos.

```
ab -c25 -t5-k http://localhost:80/movie/all
```

Este test nos entrega un tiempo de respuesta promedio de 265 ms con un tiempo maximo de 605 ms. A modo de comparacion, cuando se realizo la misma consulta sin el balanceador de carga, el tiempo promedio fue de 618 ms y el tiempo maximo de 1233 ms. Se puede ver que la mejora es sustancial.

A continuacion se muestra una captura de la pagina de stats del HAProxy mientras se realizaba el test.

![alt image](https://i.ibb.co/fMJ9b1k/imagen.png "HAProxy Stats")



## Análisis sobre tolerancia a fallas y disponibilidad por parte del sistema
La arquitectura del sistema provee disponibilidad durante todo momento, ya que se encuentra distribuida entre varios servidores y cada servidor tiene una réplica de la base de datos (explicada en el analisis de la distribución de la base de datos). Por lo que no hay procesos en donde requieran encolar consultas o donde pueda ocurrir starvation. En caso de caida de un servidor, el sistema puede seguir funcionando con los que quedan sin mayor complicaciones.


## Selección del servidor y enrutamiento de la consulta realizada por el cliente
Al momento de que el usuario realiza una consulta, ésta es enviada a un proxy, el cual selecciona un servidor para llevar a cabo la consulta de manera distribuida. Para la elección del servidor a mandar la consulta, se tiene una lista con cada uno de ellos, y el proxy elige según un criterio de uso para repartir equitativamente la cantidad de consultas que son enviadas.

## Paralelización de la consulta
Dado un gran numero de consultas, los proxy's se encargan de enviar éstas a los servidores. Cada uno de los servidores tendrá consultas diferentes, por lo que pueden haber tantas consultas simultaneamente como servidores hayan. Esto logra tener un ratio mucho mayor de consultas resueltas en el largo plazo a comparación con replicar la misma a varios servidores y esperar la primera respuesta que llegue (la cual es más rapida pero solo si se esta considerando una consulta, y no varias que se esten generando en el momento).

## Análisis de la distribución de la base de datos
Cada uno de los servidores tiene a cargo una base de datos, la cual exactamente la misma para todos ellos. La base de datos esta replicada tantas veces como servidores hayan, por lo tanto cada uno de ellos esta en condiciones de realizar la misma consulta y obtendría la misma respuesta. 


## Referencias

- Para el HAProxy: https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts
- Para el balanceador de carga usando Node.js: https://mazira.com/blog/introduction-load-balancing-nodejs
- Apache HTTP server benchmarking tool : https://httpd.apache.org/docs/2.4/programs/ab.html
- Express.js framwork: https://expressjs.com/es/
