# Nextjs Cart
Para correr localmente, se necesita una base de datos (MongoDB)
```
docker-compose up -d
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/teslodb
```

## Llenar la base de datos con información de pruebas

Llamara:
```
http://localhost:3000/api/seed
```