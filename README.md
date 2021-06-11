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
Import the `insomnia.yaml` file to get a list of API calls to interact with the application.  
See: https://insomnia.rest

### Storage Library Example
To try the different storage types you have to change the respective configuration entry in the `.env` file. After changed the application must be restarted (to parse the new config).  
The implemented examples are: `dummy|local|minio`.
```dotenv
## STORAGE_DEFAULT_DRIVER=[dummy|local|minio|azure]
STORAGE_DEFAULT_DRIVER=local
``` 

To start minio in docker locally run the following command:
```bash
$ docker run --rm --name minio -d -p 9000:9000 minio/minio server /data
```

## TODOs

When libs are published
* correct library versions in package.json
* remove .npmrc when
