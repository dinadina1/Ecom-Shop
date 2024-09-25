# Ecom Shop

The eComShop website is an online shopping platform built using the MERN stack. It offers users a seamless experience with features like product and category search, a shopping cart, and secure payments through the Stripe payment gateway. Shoppers can filter products by category, price, and ratings to find exactly what they need. The admin panel allows for efficient management of products, orders, and users, providing full control over the e-commerce operations.

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

