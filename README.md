# StockWise

StockWise is a comprehensive stock management application built with a Vue.js frontend and a Node.js backend, integrated with MongoDB for data persistence.

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB Atlas account or local MongoDB instance

## Installation

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd stockwiseUi
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install required packages:
   ```bash
   npm install express --save
   npm install cors --save
   npm install mongodb@latest --save
   ```

## Configuration

### MongoDB Setup

1. Create a [MongoDB Atlas cluster](https://www.mongodb.com/atlas/database) or use a local MongoDB instance
2. Obtain your connection string from MongoDB Atlas
3. Update the backend configuration:
   - Open `backend/index.js`
   - Replace the connection string at line 8:
     ```javascript
     const CONNECTION_STRING = "YOUR_MONGODB_CONNECTION_STRING";
     ```
   - Replace the database name at line 9:
     ```javascript
     const DATABASE_NAME = "YOUR_DATABASE_NAME";
     ```

## Running the Application

### Frontend Development Server

1. From the `stockwiseUi` directory:
   ```bash
   npm run dev
   ```
2. Access the application at:
   ```
   http://localhost:5173
   ```

### Backend Server

1. From the `backend` directory:
   ```bash
   node index.js
   ```
2. The backend will run at:
   ```
   http://localhost:5073
   ```

## Running Without Backend
The vue application is capable of running without backend service if needed.

To use the frontend independently:
1. Open `stockwiseUi/src/views/LandingPage.vue`
2. Comment out line 370:
   ```javascript
   // await productService.saveProducts(importedProducts, this.replaceData)
   ```

## Important Notes

- When running without backend:
  - All functionalities remain available
  - CSV imports will override existing local data
- With backend:
  - Data persists in MongoDB
  - Requires valid connection string configuration
  - Supports full CRUD operations
