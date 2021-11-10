# NestJS Libs - Example Project
## Description
The goal of this repository is to provide an example project for the libraries can be found in the `sclable/nestjs-libs` reposotory.

### Implemented library examples:
* `@sclable/nestjs-auth`
  * Local/JWT Guard
  * Keycloak Guard
* `@sclable/nestjs-storage`
  * Dummy Adapter
  * Local Adapter
  * Minio Adapter
* `@sclable/nestjs-queue`
  * Dummy Adapter
  * RabbitMQ Adapter

## Installation
```bash
$ npm install
```

## Running the app
The API is available on `http://localhost:3000` when it's started:
```bash
$ npm run start
```

## Usage
See: https://insomnia.rest  
Import the `insomnia.yaml` file to get a list of API calls to interact with the application.  

For local tryout we suggest running docker compose for RabbitMQ, Minio and Keycloak server
```bash
docker-compose up -d
```

## Authentication Library Implementation
To see the integration of the authentication library check the authentication module in `src/auth`. There is a local
authentication implementation, using the library-built-in controllers, but there is also commented out code for keycloak.

## Storage Library Implementation
To see the integration of the storage library check the storage modul in `src/storage`.
* StorageModule - initializes the library
* StorageService - connects the app to the library
* StorageController - implements usecases to be able to test the library

To try the different storage types you have to change the respective configuration entry in the `.env` file. 
The implemented examples are: `dummy`, `local`, `minio`.
```dotenv
## STORAGE_DEFAULT_DRIVER=[dummy|local|minio|azure]
STORAGE_DEFAULT_DRIVER=local
``` 
After changed the application must be restarted (to parse the new config). 

## Queue Library Implementation
To see the integration of the queue library check the storage modul in `src/queue`.
* QueueModule - initializes the library
* QueueService - connects the app to the library
* QueueController - implements usecases to be able to test the library

To try the different queue types you have to change the respective configuration entry in the `.env` file. 
The implemented examples are: `dummy` and `rabbitmq`.
```dotenv
## QUEUE_TYPE=[dummy|rabbitmq|azure-service-bus]
QUEUE_TYPE=rabbitmq
``` 
After changed the application must be restarted (to parse the new config). 

To have an admin UI available on http://localhost:15672 run the following command:
```bash
$ docker exec <rabbitmq-container-name> rabbitmq-plugins enable rabbitmq_management
```
