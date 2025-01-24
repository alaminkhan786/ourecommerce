# AudioEcommerce Admin Dashboard

## Features

### Authentication
- Single sign-on authentication
- Persistent login until logout
- Secure token-based authentication

### Product Management
- Add new products with details
- Delete existing products
- Product synchronization with frontend
- Image support for products

### Dashboard Capabilities
- Sidebar navigation
- One-time login access to all pages
- Modern, responsive UI

## Product Synchronization

The admin dashboard uses `localStorage` to synchronize products between the admin dashboard and the frontend. When a product is added or deleted in the admin dashboard, it is immediately reflected in the frontend's product list.

### How It Works
1. Products are stored in `localStorage` with the key `ecommerce_products`
2. Each product gets a unique timestamp-based ID
3. Frontend can read products directly from `localStorage`

## Login Credentials

- **Username:** `admin`
- **Password:** `AudioAdmin2024!`

## Technical Details

- React-based single-page application
- Material-UI for component styling
- React Router for navigation
- Context API for authentication management

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Restrictions
- Products can only be added and deleted
- No edit functionality for existing products
- Image URL is optional (placeholder used if not provided)
