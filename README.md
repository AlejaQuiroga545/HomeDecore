# HomeDecor - Modern E-commerce platform

A complete, modern e-commerce platform built with Next.js 16, React, TypeScript, and Tailwind CSS. HomeDecor is a full-featured furniture and home decor online store with advanced functionality including user authentication, shopping cart management, payment processing, and an admin dashboard.

## 🚀 Features

### Customer Features
- **Landing Page**: Beautiful hero section with featured products and category exploration
- **Product Catalog**: Full product browsing with server-side pagination, filtering, and search
- **Product Details**: Comprehensive product pages with images, descriptions, and specifications
- **Shopping Cart**: Persistent cart with localStorage and database synchronization for logged-in users
- **Favorites System**: Save favorite products for quick access
- **User Authentication**: Secure login and registration with NextAuth.js (Google OAuth support)
- **User Profile**: Manage personal information and view order history
- **Contact Form**: Contact support with automatic email confirmations
- **Internationalization**: Full i18n support (English and Spanish)
- **Responsive Design**: Fully responsive design optimized for desktop, tablet, and mobile devices

### Admin Features
- **Admin Dashboard**: Professional dashboard for managing products, users, and settings
- **Product Management**: Full CRUD operations for products with image upload via Cloudinary
- **User Management**: View and manage user accounts
- **Search & Filtering**: Advanced search and category filtering with pagination
- **Product Cards**: Visual product cards with edit and delete functionality

### Technical Features
- **Server-Side Rendering (SSR)**: Optimized performance with Next.js App Router
- **API Routes**: RESTful API endpoints for all operations
- **Database Integration**: MongoDB with Mongoose ODM
- **Payment Processing**: PayPal integration for secure checkout
- **Email System**: Automated emails using Nodemailer (welcome, contact confirmations, login notifications)
- **Cron Jobs**: Scheduled tasks for daily operations (Vercel cron compatible)
- **Form Validation**: Yup schema validation on both frontend and backend
- **Image Upload**: Cloudinary integration for product images
- **Password Security**: bcryptjs for secure password hashing

## 🛠️ Technologies

### Core
- **Next.js 16** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

### Backend & Database
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **NextAuth.js** - Authentication library
- **bcryptjs** - Password hashing

### Payment & Services
- **PayPal SDK** - Payment processing
- **Cloudinary** - Image upload and management
- **Nodemailer** - Email sending service

### Validation & Forms
- **Yup** - Schema validation
- **React Hook Form** - Form management

### UI & Icons
- **Heroicons** - Icon library
- **React Toastify** - Toast notifications
- **SweetAlert2** - Beautiful alert dialogs

### Testing
- **Cypress** - E2E and Component Testing
- **Jest** - Unit testing framework
- **Testing Library** - React component testing utilities

### Development Tools
- **Turbopack** - Fast bundler (Next.js 16)
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## 📁 Project structure

```
HomeDecor/
├── app/                          # Next.js App Router pages
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── cart/                # Cart management
│   │   ├── cron/                # Scheduled tasks
│   │   ├── paypal/              # PayPal integration
│   │   ├── products/            # Product CRUD
│   │   ├── sendEmail/           # Email sending
│   │   └── upload/              # Image upload
│   ├── auth/                    # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── about/                    # About page
│   ├── cart/                    # Shopping cart
│   ├── contact/                  # Contact form
│   ├── dashboard/                # Admin dashboard
│   ├── favorites/                # Favorites page
│   ├── product/[id]/             # Product detail page
│   ├── profile/                  # User profile
│   ├── shop/                     # Product catalog
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── providers.tsx             # Context providers
├── components/                   # Reusable components
│   ├── Button.tsx
│   ├── CartSummary.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── Input.tsx
│   ├── Navbar.tsx
│   ├── Pagination.tsx
│   ├── PayPalButton.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   └── ProductModal.tsx
├── context/                      # React Context providers
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   ├── FavoritesContext.tsx
│   ├── LanguageContext.tsx
│   └── ProductsContext.tsx
├── cypress/                     # Cypress tests
│   ├── component/               # Component tests
│   ├── e2e/                     # E2E tests
│   └── support/                 # Test support files
├── lib/                         # Utility libraries
│   ├── api.ts                   # API client
│   ├── emailTemplates.ts        # Email templates
│   ├── nodemailer.ts            # Email configuration
│   ├── translations.ts          # i18n translations
│   ├── utils.ts                # Utility functions
│   ├── validations.ts          # Yup schemas
│   └── swalConfig.ts           # SweetAlert config
├── models/                      # Mongoose models
│   ├── Cart.ts
│   ├── Product.ts
│   └── User.ts
├── data/                        # Static data
│   └── products.json
├── public/                      # Static assets
├── cypress.config.ts            # Cypress configuration
├── next.config.js               # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── vercel.json                  # Vercel deployment config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or cloud)
- Cloudinary account (for image uploads)
- PayPal developer account (for payments)
- Email service credentials (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HomeDecor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # PayPal
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   PAYPAL_MODE=sandbox
   
   # Email (Nodemailer)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM=your_email@gmail.com
   
   # Base URL
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Set up the database**
   
   Ensure MongoDB is running and accessible. The application will automatically create collections on first use.

5. **Create admin user**
   
   Use the API endpoint to create an admin user:
   ```bash
   # Via browser console or API client
   POST /api/auth/create-admin
   {
     "email": "admin@homedecor.com",
     "password": "xyz1507",
     "update": true
   }
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available scripts

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Testing
- `npm test` - Run Jest unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run cypress:open` - Open Cypress E2E test runner
- `npm run cypress:run` - Run Cypress E2E tests headless
- `npm run cypress:component` - Run Cypress component tests
- `npm run cypress:component:open` - Open Cypress component test runner
- `npm run cypress:test` - Run E2E tests with dev server
- `npm run cypress:test:open` - Open E2E tests with dev server

## 🧪 Testing

### Component Testing (Cypress)

Component tests are located in `cypress/component/`:

- **Button.cy.tsx** - Tests for Button component (variants, sizes, events)
- **Input.cy.tsx** - Tests for Input component (validation, types, events)
- **ProductCard.cy.tsx** - Tests for ProductCard (rendering, interactions)
- **Pagination.cy.tsx** - Tests for Pagination (navigation, states)

Run component tests:
```bash
npm run cypress:component:open
```

### E2E Testing (Cypress)

E2E tests are located in `cypress/e2e/`:

- **login.integration.cy.ts** - Login flow tests
- **register.integration.cy.ts** - Registration flow tests

Run E2E tests:
```bash
npm run cypress:open
```

## 🔐 Admin Credentials

Default admin credentials:
- **Email**: `admin@homedecor.com`
- **Password**: `xyz1507`

> **Note**: Change these credentials in production!

## 🎨 Design System

### Color Palette
- **Primary**: Brown tones (#2C2416) - Main brand color
- **Accent**: Terracotta (#C97D60) - Secondary color
- **Warm**: Soft oranges (#e37a3f) - Accent highlights
- **Cream**: Light backgrounds (#fefdfb)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Design Principles
- Rounded corners (rounded-xl, rounded-2xl)
- Glass/blur effects for modern look
- Smooth transitions and animations
- Minimalist and clean aesthetic
- Responsive grid layouts

## 🌐 Internationalization (i18n)

The application supports multiple languages:
- **English (en)**
- **Spanish (es)**

Language preference is stored in localStorage and persists across sessions. All UI text is fully translatable.

## 📦 Key Features Explained

### Shopping Cart
- **Guest Cart**: Cart persists in localStorage for non-logged-in users
- **User Cart**: Cart syncs with database for logged-in users
- **Cart Sync**: Guest cart transfers to user account upon login
- **Real-time Updates**: Cart updates immediately across all pages

### Product Management
- **Server-Side Pagination**: Efficient product loading
- **Advanced Filtering**: By category, price, and search term
- **Image Upload**: Direct upload to Cloudinary
- **Stock Management**: Track product inventory

### Payment Processing
- **PayPal Integration**: Secure payment processing
- **Order Management**: Order creation and capture
- **Guest Checkout**: Redirects to login if not authenticated

### Email System
- **Welcome Emails**: Sent upon user registration
- **Contact Confirmations**: Automatic confirmation to users
- **Login Notifications**: Security alerts for account access
- **Daily Cron Jobs**: Scheduled email tasks (9 AM daily)

### Form Validation
- **Frontend**: Yup validation with real-time feedback
- **Backend**: Server-side validation before database operations
- **Error Handling**: User-friendly error messages

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy

3. **Configure Cron Jobs**
   
   The `vercel.json` file is already configured for daily email cron jobs.

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:
- `MONGODB_URI`
- `NEXTAUTH_URL` (production URL)
- `NEXTAUTH_SECRET`
- `CLOUDINARY_*`
- `PAYPAL_*` (use production credentials)
- `EMAIL_*`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/create-admin` - Create admin user
- `GET /api/auth/[...nextauth]` - NextAuth.js endpoints

### Products
- `GET /api/products` - Get products (with pagination, filtering, search)
- `POST /api/products` - Create product (admin only)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Save user cart

### Payments
- `POST /api/paypal/create-order` - Create PayPal order
- `POST /api/paypal/capture-order` - Capture PayPal payment

### Other
- `POST /api/upload` - Upload image to Cloudinary
- `POST /api/sendEmail` - Send contact form email
- `GET /api/cron/daily-email` - Daily email cron job

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Yup schemas prevent injection attacks
- **HTTPS**: Enforced in production
- **Environment Variables**: Sensitive data not exposed
- **CORS**: Configured for security

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify `MONGODB_URI` is correct
   - Ensure MongoDB is running
   - Check network connectivity

2. **Image Upload Fails**
   - Verify Cloudinary credentials
   - Check API key permissions
   - Ensure CORS is configured

3. **Email Not Sending**
   - Verify email credentials
   - Check SMTP settings
   - For Gmail, use App Password

4. **PayPal Integration Issues**
   - Verify PayPal credentials
   - Check sandbox/production mode
   - Ensure callback URLs are correct

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Alejandra Quiroga G**

---

Built with ❤️ using Next.js, React, and TypeScript