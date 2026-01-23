# 📚 BookStream - MERN Stack Book Store with Stripe

BookStream ek powerful E-commerce application hai jo MERN stack (MongoDB, Express, React, Node.js) aur Next.js par bani hai. Isme users books browse kar sakte hain, Stripe se secure payment kar sakte hain aur Admin pura store control kar sakta hai.

---

## 🌟 Key Features

### 👤 User Features
* **Authentication**: JWT based Secure Login aur Logout.
* **Smart Filters**: Books ko Author Name, Price aur Category ke basis par filter karne ki suvidha.
* **Shopping Cart**: Books ko cart mein add karein, quantity manage karein aur total price calculate karein.
* **Secure Checkout**: Stripe Payment Gateway integration for fast and secure transactions. 💳
* **User Dashboard**: 
    * Profile management.
    * **My Orders**: Apne orders ki history aur live status (Pending, Processing, Shipped, Delivered) track karein.

### 🛡️ Admin Features (Advanced Dashboard)
* **Inventory Management**: Nayi books add karein (Title, Author, Price, Discount, Stock, Category aur Image upload).
* **Order Management**: Sabhi users ke orders ko monitor karein aur unka delivery status update karein.
* **Sales Analytics**: Dashboard par total sales aur active orders ka overview.

---

## 🛠️ Tech Stack

**Frontend:**
- **Next.js / React.js** (App Router)
- **Tailwind CSS** & **Shadcn UI** (Modern Styling)
- **Axios** (API Requests)
- **Sonner** (Toast Notifications)

**Backend:**
- **Node.js** & **Express.js**
- **MongoDB** (Database)
- **Stripe API** (Payments)
- **Cloudinary** (Image Hosting)
- **JWT** (Security)

---

## 📦 Project Structure

```text
├── frontend/
│   ├── app/           # Pages & Routes
│   ├── components/    # UI & Shared Components
│   └── lib/           # Stripe & Helper Functions
├── backend/
│   ├── models/        # Database Schemas (User, Book, Order)
│   ├── routes/        # API Endpoints
│   ├── controllers/   # Business Logic
│   └── utils/         # Auth & Stripe Config