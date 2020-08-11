# PackToGo
## Background and Overview
We are building an App to reduce the cost of shipping through peer-to-peer connections. For users who'd like to ship a package and save money, they can enlist a peer who's already heading to the same destination to bring it along and drop it off for the user. For users who'd like to deliver a package and make money, they can look for people who want to ship packages.

## Functionality and MVP
### 1. Hosting on Heroku By 8/10/2020

### 2. New account creation, login, and guest login
* Users can sign up, sign in and log out
** Carriers
** Shippers
* Users cannot have access to certain features if they are not logged in (e.g. create a post)

### 3. Carrier Post / Shipper Post
* CRUD: Carriers can offer their services by specifying their origin, destination, travel date, price, etc.
* CRUD: Shippers can express interests in sending a package by specifying their origin, destination, travel date, price, etc.

### 4. Search for Carrier Posts / Shipper Posts (Polymorphic)
* Carriers and Shippers should be able to filter by origin, destination, date, etc.

### 5. Booking
* Only for shippers able to book through a carrier's post 

### 6. Mobile Friendly
* All views should be able to be viewed and responsive on Mobile devices (Media queries)

### 7. ReadMe

### 8. BONUS: Map

### 9. BONUS: Message 

### 9. BONUS: Reviews

## Technologies and Technical Challenges
* MERN stack
* User authentication for different types of users
* Mobile friendly: testing
* Payment
* Reviews on Carriers / Shippers

## Group Members and Work Breakdown
Yuanyuan Zhou, George Rodnikov, Brandon Kim, Jonathan Su

### August 10
* MongoDB - George
* Initiate application - All
* Git workflow - Yuan
* User auth backend: Model, Validation, Routes - George (Research on update and delete action - Yuan)
* User auth frontend: Design Layout, Util, Action, Reducers, Component - Brandon 
* Heroku deployment - Yuan
* Post Schema and Sample State - Jon

### August 11
* User auth frontend - Brandon
* Carrier Post and Shipper Post backend: Model, Validation, Routes - George and Jon
* Carrier Post and Shipper Post frontend - Yuan
* Search backend: Model, Validation, Routes - George
* Map - Jon

### August 12
* Post 
* Search feature

### August 13
* Booking
