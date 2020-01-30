# Project developed with Express, Typescript, TypeORM and DDD.

## This is a simple api rest to get, create, edit and deactivate (not delete) users, all this developed with hexagonal architecture, ddd, Express, typescript and TypeORM.
```

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `docker-compose up` command
4. Run `npm run dev` command
5. Run `npm run migration:run` command for create entities in the docker database
6. Import `postman/express_typescript_ddd.postman_collection.json` in your postman client to make request to the API
