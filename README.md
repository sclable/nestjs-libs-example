# NestJS Libs - Example Project
## Description
The goal of this repository is to provide an example project for the libraries can be found in the `sclable/nestjs-libs` reposotory.

### Implemented library examples:
* `@sclable/nestjs-storage`
  * Dummy Adapter
  * Local Adapter
  * Minio Adapter

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

To start minio in docker locally run the following command:
```bash
$ docker run --rm --name minio -d -p 9000:9000 minio/minio server /data
```

## TODOs

When libs are published
* correct library versions in package.json
* remove .npmrc when
