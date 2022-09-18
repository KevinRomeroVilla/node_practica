# nodepop

Start the aplication:

In Production:

On first deploy, load initial data into de database:

```js
node initDB.jS
```

```sh
npm start
```

para el uso de filtros por nombre utilizar las palabras
"bicicleta"
"iPhone 3GS"
"control_Play"

para el uso de filtros con tags utilizar "tags" en vez de "tag" debido a que estan definido de esta forma en el initDB

para la creación de anuncios nuevos utilizar la ruta

```
http://localhost:3000/api/anuncios/
```


In development

```sh
npm run dev
```