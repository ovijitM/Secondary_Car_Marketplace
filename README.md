# Secondary Car Marketplace and Service Platform

This project offers a unified platform to buy, sell, rent, and maintain used cars. The primary objective is to create a transparent, efficient, and user-friendly service ecosystem that caters to all car-related needs.

## Overview

This platform is designed to streamline the process of buying, selling, renting, and maintaining cars. With a focus on security, transparency, and user experience, it connects buyers, sellers, renters, and service providers seamlessly. It also integrates essential features like car verification, secure transactions, and cost management.

## Features

### Car Buy and Sell
- Allow users to buy cars from our company.
- Users can sell cars to our company by comparing the current condition price.
- Enables users to buy/sell used cars via a peer-to-peer (P2P) marketplace.
- View car history and condition from site posts.

### User Accessibility and Tools
- Filtering by search.
- Side-by-side comparison (model, price, etc.).
- User dashboard for activity management.
- Secure transaction management.

### Rental and Booking
- Users can rent a car.
- Check car availability for rent.
- Schedule rentals and manage costs.
- Check driver reviews.

### Maintenance and Repair Services
- Schedule maintenance dates.
- Track maintenance updates and work status.
- Manage costs (parts price and condition).
- Delivery confirmation for serviced vehicles.

### Security and Transparency
- User and car verification (NID, photo, etc.).
- Chatting and secure negotiation for P2P transactions.
- Generate receipts and records for every legal transaction and deal.
- Help, support, and FAQ section for user assistance.

## Dependencies Installation

### Frontend

1. Clone the repository:
    ```bash
    git clone https://github.com/ovijitM/cse470_SCM.git
    cd cse470_SCM
    ```
2. Install the required packages:
    ```bash
    npm install
    ```
3. Install additional dependencies:
    ```bash
    npm install react-bootstrap bootstrap react-router-dom jwt-decode jsonwebtoken multer jspdf jspdf-autotable bcryptjs
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```

### Backend

1. Navigate to the backend folder.
2. Install backend dependencies:
    ```bash
    npm install express mongoose nodemon jsonwebtoken bcryptjs multer
    ```
3. Start the backend server:
    ```bash
    nodemon server.js
    ```

## Dependencies

### Frontend Dependencies
- React
- React Bootstrap
- Bootstrap
- React Router DOM
- jwt-decode
- jsonwebtoken
- multer
- jspdf
- jspdf-autotable
- bcryptjs

### Backend Dependencies
- Express
- Mongoose
- Nodemon
- jsonwebtoken
- bcryptjs
- Multer

## Collection Structure

### Database Collections
- **Book_car:** Contains booking details for car rentals or purchases.
- **Driver:** Stores driver information, including reviews and ratings.
- **New_cars:** Details about new cars available for sale.
- **Parts:** Inventory of car parts, including pricing and condition.
- **Rent_Cars:** Data on cars available for rent, including availability status.
- **Used_cars:** Listings of used cars for sale, including condition and history.
- **User_history:** Tracks user activities like transactions, rentals, and bookings.
- **Users:** Stores user information and verification details.

## Example Database Document Structure

```json
{
  "_id": "ObjectId()",
  "make": "Toyota",
  "model": "Corolla",
  "year": 2022,
  "mileage": 50000,
  "color": "Red",
  "price": 15000,
  "description": "A well-maintained car with excellent fuel efficiency.",
  "image": "https://example.com/car-image.jpg",
  "seller": {
    "name": "John Doe",
    "phone": "123-456-7890",
    "email": "johndoe@example.com"
  },
  "createdAt": "2023-12-01T12:00:00.000Z",
  "updatedAt": "2023-12-10T15:30:00.000Z"
}
```

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

**Contributors:**
- @ovijitM
- @mdrakib719
- @TheOnlyNaimur
