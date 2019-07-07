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

## Análisis y diseño de la arquitectura propuesta
El sistema fue diseñado para hacer consultas de formas distribuidas y es por esto, que cada uno de los procesos requiere un análisis para encontrar puntos críticos y posibles fallas o mejoras de la aplicación y su infraestructura. 
Al momento de que el usuario realiza una accion que gatilla la acción del front-end (como en este caso, realiza una consulta), ésta se va al proxy, el cual funciona como balanceador de carga, el cual lo recibe y redirige la consulta al servidor que tenga menos conexiones actualmente. Luego de que la consulta es adquirida por la aplicación, se realiza el proceso de obtención de los documentos que contienen la consulta. Esto se logra gracias al uso de indices invertidos y que conecta con la base de datos MongoDB para extraer la información anteriormente pedida. 



## Análisis de rendimiento de la arquitectura

## Análisis sobre tolerancia a fallas y disponibilidad por parte del sistema

## Selección del servidor y enrutamiento de la consulta realizada por el cliente

## Paralelización de la consulta

## Análisis de la distribución de la base de datos
