# E-commerce Shop Frontend

E-commerdce Shop App is a shop application created to learn new techniques using React + TypeScript and Chakra UI. Code was formatted using eslint. Project is a frontend api for e-commerce shop application.

[Backend of application](https://github.com/Kamgre7/EcommerceShopBack)

### 🚀 Technologies
- React.js
- React-router-dom
- TypeScript
- Formik
- Chakra UI
- code formatter: eslint with airbnb-typescript

### ✅ Requirements
Before starting, you need to have Git installed.

### 🏁 Running the app

#### Run locally - backend

```bash
# Clone the project
$ git clone https://github.com/Kamgre7/EcommerceShopBack.git

# Go to the project directory
$ cd e-commerce-shop-back

# Install dependencies
$ npm install

# Start the server
$ npm run start
```

#### Run locally - frontend

```bash
# Clone the project
$ git clone https://github.com/Kamgre7/EcommerceShopFront.git

# Go to the project directory
$ cd ecommerce-shop-front

# Install dependencies
$ npm install

# Start the server
$ npm run start
```

### 📷 Screenshots

### Homepage view:

![image](https://user-images.githubusercontent.com/105069884/194760613-c7b99ccd-b04b-4e25-9897-4eddc2cd8cd6.png)

- Navigation and photo carousel with text about products

![image](https://user-images.githubusercontent.com/105069884/194760753-712758c1-6dc6-4cd5-96ed-d50b4e706330.png)

- Top sold products and footer on homepage

![image](https://user-images.githubusercontent.com/105069884/194760876-d1a97581-312e-42e0-8f4d-435c6172c997.png)

### Product view:
- product separated by category - category description on top view

![image](https://user-images.githubusercontent.com/105069884/194760988-189bae04-14a0-4348-93d6-0b406b46f8ef.png)

- single product details - when user click some product, he will see details of product like: name, description, quantity, price, sku code, which category, image and button "add to basket"

![image](https://user-images.githubusercontent.com/105069884/194761057-4ac17643-81a0-49e8-bf4a-cdcbdc4b4768.png)

- after clicked button user have information about added product to basket, if quantity is grater than product stock, he will get information about that

![image](https://user-images.githubusercontent.com/105069884/194761169-f05d1877-a489-4c3b-991e-246af77fbfa9.png)

![image](https://user-images.githubusercontent.com/105069884/194761208-1e5053dd-4252-47ab-a2e9-06fd84e99152.png)

- product form - created with chakra ui + formik implementation - all inputs are required when user want to add product, only admin can add product to shop

![image](https://user-images.githubusercontent.com/105069884/194761306-21612147-bfae-4945-bd9b-8ac1568ba66c.png)

- after adding a product user is redirected to homepage

![image](https://user-images.githubusercontent.com/105069884/194762740-3ca08905-fd16-47d9-a2b8-2a9739061cc3.png)

- if product exists

![image](https://user-images.githubusercontent.com/105069884/194762889-09f9a2cd-2f14-43ed-9a8a-2b4f0fbfa1fb.png)

### Basket and checkout view
- list of products in user basket - user can add or subtract item quantity, remove one product or clear basket

![image](https://user-images.githubusercontent.com/105069884/194763033-244a516e-ab01-4e02-9899-b4eb732b725c.png)

- removed single product

![image](https://user-images.githubusercontent.com/105069884/194763285-34c5dfed-ff32-4cb9-bb52-3f5fef70e1d7.png)

- clear basket

![image](https://user-images.githubusercontent.com/105069884/194763378-7d41c15e-3453-4bed-8750-a40f931d0038.png)


- after clicking checkout user is navigated to /order, and he must choose delivery address and give payment information

![image](https://user-images.githubusercontent.com/105069884/194763176-90d640a6-841f-4b39-82e2-15db28a12079.png)

### Forms view

- login form

![image](https://user-images.githubusercontent.com/105069884/194763449-5366beaf-d6a0-42f1-8e92-2388085b9810.png)

- register form

![image](https://user-images.githubusercontent.com/105069884/194763487-4b571bf6-53e7-4616-919e-ce032c62eea9.png)

- forgot password form

![image](https://user-images.githubusercontent.com/105069884/194765170-31a59a39-b4ea-496e-a5c9-741553e0c574.png)

### 🧭 TODO
- add admin panel view - updating/delete product
- sidebar for searching items by price/popularity etc.
- order - finalization of purchases 
- refactor code of components 
- user profile - editing information

### Author

[@Kamgre7](https://github.com/Kamgre7/)
