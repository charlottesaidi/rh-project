# Server

Api created with Symfony 6.4.

## Available Scripts

#### `cd server && composer install`
Install composer dependencies

#### `symfony console console lexik:jwt:generate-keypair`
Generate ssl key pair

#### `symfony console doctrine:database:create`
#### `&& symfony console doctrine:migrations:migrate`
Create database and tables.

#### `symfony console doctrine:fixtures:load`
Populate database with fake datas.

#### `symfony serve`
Runs the app in the development mode.\
Use [http://localhost:8000](http://localhost:8000) to connect to the api.

# Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

#### `cd client && yarn install`
Install node dependencies.

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# Connexion
Use one of the fixtured user to test :  
- Username : recruteur@nfs.school  
- Password : recruteur@nfs.school