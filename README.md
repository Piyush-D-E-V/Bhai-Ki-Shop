# 🛍️ BHAI KI — AI-Powered E-Commerce Platform

**BHAI KI** is a modern full-stack e-commerce web application built around an **AI Shopping Assistant** that allows users to discover products using natural-language queries instead of relying entirely on traditional filters and navigation.

Users can simply describe what they are looking for — such as *"Demon Slayer hoodie"* or *"Give me car wall art"* — and the AI helps them find relevant products through a conversational shopping experience.

> 🚀 Built as a full-stack project to explore modern web architecture, AI integration, authentication, CMS-driven content, and secure online payments.

---

## ✨ Features

### 🤖 AI Shopping Assistant

* Natural-language product discovery
* Understands conversational product requests
* Helps users find relevant products
* Product comparison and recommendation capabilities
* Order-status assistance through the chat interface

### 🛒 E-Commerce Experience

* Product browsing and discovery
* Dynamic product categories
* Detailed product pages
* Shopping cart
* Complete checkout flow
* Order confirmation
* Responsive experience across screen sizes

### 🔐 Authentication

* Secure user authentication with **Clerk**
* Protected user sessions
* User-specific shopping functionality

### 💳 Payments

* Integrated **Stripe Checkout**
* Secure payment processing
* Complete checkout-to-order workflow

### 📦 Product Management

* Product data managed through **Sanity CMS**
* Dynamic product information
* Category-based product organization

### 🎨 Modern UI

* Responsive design
* Dynamic product grids
* Interactive hover effects
* Clean and modern shopping interface
* Mobile-friendly layouts

---

## 🧠 AI Shopping Experience

Traditional e-commerce platforms often require users to manually navigate through categories, filters, and multiple product pages.

BHAI KI takes a more conversational approach.

Instead of:

`Category → Filters → Subcategory → Product → Compare`

Users can simply ask:

> **"Tell me about my orders."**

or

> **"Show me car-themed wall art/etc."**

The AI processes the request and helps the user discover suitable products directly through the shopping assistant.

---

## 🛠️ Tech Stack

| Technology        | Purpose                                      |
| ----------------- | -------------------------------------------- |
| **Next.js**       | Full-stack React framework                   |
| **React.js**      | User interface                               |
| **TypeScript**    | Type-safe development                        |
| **Tailwind CSS**  | Styling and responsive UI                    |
| **Sanity**        | Headless CMS and product management          |
| **Supabase**      | Database and backend services                |
| **Clerk**         | Authentication and user management           |
| **Stripe**        | Payment processing                           |
| **Google AI SDK** | AI integration and conversational experience |
| **Vercel**        | Deployment                                   |

---

## 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │      BHAI KI        │
                    │   E-Commerce App    │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
        Next.js / React     Sanity CMS       Clerk Auth
             │                 │                 │
             │                 ▼                 │
             │          Product Management       │
             │                                   │
             ▼                                   ▼
      AI Shopping Assistant                  User Sessions
             │
             ▼
       Vercel AI SDK
             │
             ▼
      Product Discovery
             │
             ▼
        Cart / Checkout
             │
             ▼
           Stripe
             │
             ▼
       Order Processing
```

---

## 📸 Screenshots

### Homepage

![BHAI KI Homepage](https://github.com/Piyush-D-E-V/Bhai-Ki-Shop/blob/2c3e7758ccfd7121d5bd036bd923edbf19756d84/Screenshots/Bhai-ki-shop.png)

### AI Shopping Assistant

![AI Shopping Assistant](https://github.com/Piyush-D-E-V/Bhai-Ki-Shop/blob/06f7c06a33653ca5035c3a4787fea026e735e90b/Screenshots/Ai%20Assistant%20.png)

### Product Details

![Product Details](https://github.com/Piyush-D-E-V/Bhai-Ki-Shop/blob/06f7c06a33653ca5035c3a4787fea026e735e90b/Screenshots/product_details.png)

### checkout

![Shopping Cart](https://github.com/Piyush-D-E-V/Bhai-Ki-Shop/blob/06f7c06a33653ca5035c3a4787fea026e735e90b/Screenshots/checkout.png)

### payments

![Payment_gatway](https://github.com/Piyush-D-E-V/Bhai-Ki-Shop/blob/06f7c06a33653ca5035c3a4787fea026e735e90b/Screenshots/payment.png)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* pnpm
* Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/bhai-ki.git
```

### 2. Navigate to the project

```bash
cd bhai-ki
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

GOOGLE_GENERATIVE_AI_API_KEY=
```

> ⚠️ Never commit `.env.local` or expose private API keys in your repository.

### 5. Start the development server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

## 📁 Project Structure

```text
bhai-ki/
├── app/
│   ├── api/
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── products/
│   ├── cart/
│   └── ...
│
├── lib/
│   ├── sanity/
│   ├── supabase/
│   └── ...
│
├── sanity/
│   └── schemaTypes/
│
├── public/
│   └── screenshots/
│
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

> The structure above is an example. Update it to match your actual repository structure.

---

## 🔄 User Flow

```text
                    ┌──────────────┐
                    │   Homepage   │
                    └──────┬───────┘
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ▼                   ▼
          Browse Products      Ask AI Assistant
                 │                   │
                 │                   ▼
                 │            Product Discovery
                 │                   │
                 └─────────┬─────────┘
                           ▼
                    Product Details
                           │
                           ▼
                       Cart/Buynow
                           │
                           ▼
                       Checkout
                           │
                           ▼
                    Stripe Payment
                           │
                           ▼
                    Order Confirmation
```

---

## 🎯 Project Goals

The main goals behind BHAI KI were to:

* Build a realistic full-stack e-commerce application
* Explore AI-powered product discovery
* Implement authentication and user sessions
* Integrate a headless CMS
* Implement an online payment workflow
* Build responsive and reusable UI components
* Understand how multiple services can work together in a production-style application

---

## 📚 What I Learned

Building BHAI KI helped me gain practical experience with:

* Full-stack application architecture
* Next.js application development
* TypeScript in a larger project
* Headless CMS integration
* Authentication and authorization
* AI SDK integration
* Natural-language product search
* Payment gateway integration
* API and backend workflows
* Responsive UI development
* Managing environment variables and third-party services

---

## 🔮 Future Improvements

Some features I would like to explore in future iterations:

* [ ] Advanced product filtering
* [ ] Personalized AI recommendations
* [ ] Product reviews and ratings
* [ ] Wishlist functionality
* [ ] Improved order tracking
* [ ] Admin dashboard
* [ ] Inventory management
* [ ] AI-powered product comparison
* [ ] Improved search relevance
* [ ] Performance and accessibility optimization

---

## 🌐 Live Demo

🚀 Live Website: [https://bhai-ki-shop.vercel.app]

## 💻 GitHub Repository

📂Source Code:[https://github.com/Piyush-D-E-V/Bhai-Ki-Shop]

## 🤠 My Portfolio
My Portfolio :[https://piyushmina.vercel.app/]
---

## 👨‍💻 About the Developer

Built by **Piyush**, a Computer Science Engineering student focused on building modern web applications with **React, Next.js, TypeScript, and AI technologies**.

I'm currently focused on strengthening my frontend and full-stack development skills by building real-world projects and exploring modern web technologies.

---

## ⭐ Support

If you found this project interesting, consider giving the repository a ⭐ on GitHub.

---

### 📄 License

This project is created for learning and portfolio purposes.
