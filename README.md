# StockWise

StockWise is a comprehensive stock management application built with a Vue.js frontend and a Node.js backend, integrated with MongoDB for data persistence. It provides real-time stock tracking, CSV import capabilities, and analytical insights.

## Features

- Real-time stock data visualization
- Import/Export stock data via CSV
- Interactive dashboard with analytics
- Responsive and user-friendly interface
- MongoDB database integration (optional)

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
     const uri = "YOUR_MONGODB_CONNECTION_STRING";
     ```
   - Replace the database name at line 9:
     ```javascript
     const dbName = "YOUR_DATABASE_NAME";
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
   http://localhost:3000
   ```

## Running Without Backend

To use the frontend independently:
1. Open `stockwiseUi/src/main.js`
2. Comment out line 370:
   ```javascript
   // axios.defaults.baseURL = 'http://localhost:3000'
   ```
3. Note: 
   - CSV imports will reset on page reload
   - Data persistence requires backend integration

## Important Notes

- When running without backend:
  - All functionalities remain available
  - Data persists only during current session
  - CSV imports will override existing local data
- With backend:
  - Data persists in MongoDB
  - Requires valid connection string configuration
  - Supports full CRUD operations

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## License

[MIT License](LICENSE)
