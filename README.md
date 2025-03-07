# Planning Screen Application

## Overview
This application is built using **React**, **TypeScript**, **Material-UI (MUI)**, **AG-Grid**, and **Redux**. It provides a planning screen with a dynamic data grid, enabling users to manage stores, SKUs, and sales planning effectively.

## Features
- **Authentication (if implemented)**: Displays sign-in/sign-out menu.
- **Navigation**:
  - Top navigation bar with a company logo.
  - Left sidebar with icons and labels for navigation.
- **Store Management**:
  - Add, remove, update, and reorder stores.
- **SKU Management**:
  - Add, remove, and update SKUs with Prices and Costs.
- **Planning Screen**:
  - Displays AG-Grid with a cross-join of Stores and SKUs as rows, and Calendar grouped by Months as columns.
  - Editable **Sales Units**.
  - Auto-calculated **Sales Dollars**, **GM Dollars**, and **GM %**.
  - Conditional formatting for GM %:
    - **Green**: ≥ 40%
    - **Yellow**: 10% - 40%
    - **Orange**: 5% - 10%
    - **Red**: ≤ 5%
- **Responsive Design**:
  - Minimum width: **1080px**
  - Grid and chart fit within screen edges with appropriate margins.

## Tech Stack
- **React** (with TypeScript)
- **Material-UI (MUI)** for UI components and styling
- **AG-Grid** for data representation
- **Redux Toolkit** for state management
- **React Router** for navigation

## Installation
```bash
# Clone the repository
git clone https://github.com/GSynergy-Progressive-Web-App/GSynergy_Suryakanta_Sahu_123456.git

# Navigate to the project directory
cd GSynergy_Suryakanta_Sahu_123456

# Install dependencies
npm install
```

## Running the Application
```bash
npm start
```
The application will start at `http://localhost:3000/`.


## State Management
- The application uses **Redux Toolkit** for efficient state management.
- The state is structured to store **stores, SKUs, and planning data** efficiently.
- Async operations (such as fetching or updating data) use **Redux Thunks**.

## Dependencies
```json
"dependencies": {
   "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^5.0.0",
    "@mui/material": "^5.16.14",
    "@mui/x-data-grid": "^7.27.2",
    "@reduxjs/toolkit": "^2.6.0",
    "@types/react-redux": "^7.1.34",
    "ag-grid-community": "^28.0.0",
    "ag-grid-react": "^28.0.0",
    "chart.js": "^3.0.0",
    "react": "^17.0.0",
    "react-beautiful-dnd": "^13.1.1",
    "react-chartjs-2": "^3.0.0",
    "react-dom": "^17.0.0",
    "react-redux": "^7.2.9",
    "react-router-dom": "^6.18.0",
    "react-scripts": "^5.0.1",
    "recharts": "^2.15.1",
    "redux": "^4.1.0",
    "redux-thunk": "^2.3.0"
}
```

## License
This project is licensed under the MIT License.

