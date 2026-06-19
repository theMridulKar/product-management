# Local Installation Guide
### Prerequisites
Before running the project, make sure the following software is installed:
* PHP 8.2+
* Composer
* MySQL
* Node.js 20+
* npm
* Git
---
## Clone Repository
```bash
git clone https://github.com/theMridulKar/product-management.git
cd product-management
```
---
# Backend Setup
Navigate to backend directory:
```bash
cd  backend
```
Install dependencies:
```bash
composer  install
```
Copy environment file:
```bash
cp  .env.example  .env
```
Generate application key:
```bash
php artisan key:generate
```
Configure database credentials inside `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=product_management
DB_USERNAME=root
DB_PASSWORD=
```
## Mail Configuration
Update your `.env` file with valid SMTP credentials:
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=youremail@gmail.com
MAIL_PASSWORD=your_google_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=youremail@gmail.com
MAIL_FROM_NAME="Product Management System"
```
> **Note:** For Gmail, you must use a Google App Password instead of your Gmail account password.

Generate JWT Secret
```bash
php artisan jwt:secret
```
Run migrations:
```bash
php artisan migrate
```
Start Laravel server:
```bash
php artisan serve
```
Backend will run at:
```text
http://127.0.0.1:8000
```
Queue Worker Run:
```bash
php artisan queue:work
```
---
# Frontend Setup
Open a new terminal and navigate to frontend directory
```bash
cd  frontend
```
Install dependencies:
```bash
npm  install
```
Start development server:
```bash
npm  run  dev
```
Frontend will run at:
```text
http://localhost:5173
```
---
# Login/Register
> **Important:** Please use a valid email address during registration, as product notification emails will be sent to the registered email address.
```text
http://localhost:5173/register
http://localhost:5173/login
```
---


































# Product Management System API Documentation
## Base URL
```http
http://127.0.0.1:8000/api
```
---
# Authentication
All protected endpoints require:
```http
Authorization: Bearer {token}
Accept: application/json
```
---
# Register User
### Endpoint
```http
POST /register
```
### Request
```json
{
    "name": "Mridul Kar",
    "email": "mridul@example.com",
    "password": "123456",
    "password_confirmation": "123456"
}
```
### Success Response
```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "Mridul Kar",
            "email": "mridul@example.com"
        },
        "token": "1|xxxxxxxxxxxxxxxxxxxxxxxx"
    }
}
```
---
# Login
### Endpoint
```http
POST /login
```
### Request
```json
{
    "email": "mridul@example.com",
    "password": "123456"
}
```
### Success Response
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "Mridul Kar",
            "email": "mridul@example.com"
        },
        "token": "1|xxxxxxxxxxxxxxxxxxxxxxxx"
    }
}
```
### Failed Response
```json
{
    "success": false,
    "message": "Invalid credentials"
}
```
---
# Get Authenticated User
### Endpoint
```http
GET /profile
```
### Headers
```http
Authorization: Bearer {token}
```
### Success Response
```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "Mridul Kar",
        "email": "mridul@example.com"
    }
}
```
---
# Logout
### Endpoint
```http
POST /logout
```
### Success Response
```json
{
    "success": true,
    "message": "Logged out successfully"
}
```
---
# Categories
## Get Categories
### Endpoint
```http
GET /categories?page=1&per_page=10&search=
```
### Success Response
```json
{
    "success": true,
    "message": "Categories retrieved successfully",
    "data": {
        "current_page": 1,
        "last_page": 1,
        "total": 2,
        "data": [
            {
                "id": 1,
                "name": "Electronics"
            },
            {
                "id": 2,
                "name": "Clothing"
            }
        ]
    }
}
```
---
## Create Category
### Endpoint
```http
POST /categories
```
### Request
```json
{
    "name": "Electronics"
}
```
### Success Response
```json
{
    "success": true,
    "message": "Category created successfully"
}
```
---
## Update Category
### Endpoint
```http
PUT /categories/{id}
```
### Example
```http
PUT /categories/1
```
### Request
```json
{
    "name": "Updated Electronics"
}
```
### Success Response
```json
{
    "success": true,
    "message": "Category updated successfully"
}
```
---
## Delete Category
### Endpoint
```http
DELETE /categories/{id}
```
### Example
```http
DELETE /categories/1
```
### Success Response
```json
{
    "success": true,
    "message": "Category deleted successfully"
}
```
---
# Products
## Get Products
### Endpoint
```http
GET /products?page=1&per_page=10&search=
```
### Success Response
```json
{
    "success": true,
    "message": "Products retrieved successfully",
    "data": {
        "current_page": 1,
        "last_page": 1,
        "total": 1,
        "data": [
            {
                "id": 1,
                "category_id": 1,
                "name": "Laptop",
                "price": "65000",
                "description": "Gaming Laptop",
                "category": {
                    "id": 1,
                    "name": "Electronics"
                }
            }
        ]
    }
}
```
---
## Get Single Product
### Endpoint
```http
GET /products/{id}
```
### Example
```http
GET /products/1
```
### Success Response
```json
{
    "success": true,
    "data": {
        "id": 1,
        "category_id": 1,
        "name": "Laptop",
        "price": "65000",
        "description": "Gaming Laptop"
    }
}
```
---
## Create Product
### Endpoint
```http
POST /products
```
### Request
```json
{
    "category_id": 1,
    "name": "Laptop",
    "price": 65000,
    "description": "Gaming Laptop"
}
```
### Success Response
```json
{
    "success": true,
    "message": "Product created successfully"
}
```
---
## Update Product
### Endpoint
```http
PUT /products/{id}
```
### Example
```http
PUT /products/1
```
### Request
```json
{
    "category_id": 1,
    "name": "Updated Laptop",
    "price": 70000,
    "description": "Updated Description"
}
```
### Success Response
```json
{
    "success": true,
    "message": "Product updated successfully"
}
```
---
## Delete Product
### Endpoint
```http
DELETE /products/{id}
```
### Example
```http
DELETE /products/1
```
### Success Response
```json
{
    "success": true,
    "message": "Product deleted successfully"
}
```
---
# Technologies Used
## Frontend
- React.js
- React Router DOM (Routing)
- Axios (API Communication)
- React Hot Toast (Notifications)
- Bootstrap 5 (UI Components & Layout)
- Vite (Build Tool)
- LocalStorage (Token Persistence)

## Backend
- Laravel 12
- JWT Authentication
- Eloquent ORM
- Repository Pattern
- Form Request Validation
- Queue Jobs
- Observers
- MySQL

---


## Live Link:
```text
https://product-management-six-nu.vercel.app/
```

# Deployment Notes
This project has been successfully deployed using:
- Frontend: Vercel
- Backend: Railway
- Database: Railway MySQL
> **Known Limitation:** Railway's free environment may restrict or timeout outbound SMTP connections to Gmail (`smtp.gmail.com:587`).

As a result:
- Product CRUD operations work correctly.
- Authentication works correctly.
- Queue jobs execute correctly.
- Email notification functionality may not work on the deployed environment due to SMTP connection restrictions.

Email notifications work correctly in local development when using valid Gmail SMTP credentials and a google app 16 character password

# Author
**Mridul Kar**
