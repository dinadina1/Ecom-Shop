# Ecom Shop

an E-commerce Website built with MERN stack.

## Deployed URL:
http://3.87.50.31/

## Postman Documentation
https://documenter.getpostman.com/view/33767617/2sA3s3FqXR

## Instructions

after cloning, run this command in the root folder
```bash
npm install
```
navigate to "frontend" folder, run these commands 
```bash
npm install
npm run build
```
wait for application build
after that open the backend/config/config.env
and update the MongoDB connection string

```bash
MONGO_URI=
```

navigate back to "root" folder and run this command for loading demo data
```bash
npm run seeder
```

run this below command to run the app in production mode
```bash
npm run prod
```
(or) run this below command to run the app in development mode
```bash
npm run dev
```


## Test
open the http://localhost:8000 and test the application.

