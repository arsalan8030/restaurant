# 🍽️ Restaurant Booking Website

A modern, fully-featured restaurant table reservation system built with **Next.js 16**, **React**, **Tailwind CSS**, and **Razorpay Payment Integration**. This application allows users to browse restaurants, select seats, and complete secure online payments for their dining reservations.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🎯 Features

### 🏨 Restaurant Management
- Browse popular restaurants with detailed information
- View restaurant details and ratings
- Easy-to-use restaurant selection interface

### 📅 Booking System
- Interactive date and time selection
- Real-time seat availability visualization
- Visual seat grid with availability status
- Select multiple seats at once
- Instant booking confirmation

### 💳 Payment Integration
- **Razorpay Payment Gateway** integration
- Multiple payment methods:
  - 💰 Credit/Debit Card payments
  - 📱 UPI/QR Code payments
  - Google Pay, PhonePe support
- Real-time payment processing
- Secure SSL encrypted transactions

### 🎨 User Interface
- Modern, responsive design
- Dark mode optimized interface
- Smooth animations and transitions
- Real-time form validation
- Interactive tooltips and hints
- Professional payment page with security indicators

### 📄 Digital Receipts
- Instant booking confirmation
- Digital receipt generation
- Download receipt as PNG image
- Print receipt functionality
- Receipt verification codes

### 🔒 Security Features
- PCI DSS Level 1 compliant payments
- SSL encryption for all transactions
- Secure form validation
- CSRF protection
- Sensitive data protection

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 18+** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icon library
- **React Confetti** - Celebration animations
- **html2canvas** - Receipt download functionality

### Backend
- **Node.js** - JavaScript runtime
- **Next.js API Routes** - Serverless functions
- **MongoDB** - Database (optional, for persistence)

### Payment Processing
- **Razorpay** - Payment gateway integration
- Industry-leading security standards

### Development Tools
- **TypeScript** - Type safety (Next.js config)
- **ESLint** - Code quality
- **PostCSS** - CSS transformations
- **Turbopack** - Fast bundling

---

## 📋 Prerequisites

- **Node.js** >= 18.x
- **npm** or **yarn** package manager
- **Git** for version control
- **Razorpay Account** (for payment integration)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/restaurant.git
cd restaurant
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# Database (if using MongoDB)
MONGODB_URI=your_mongodb_connection_string

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Get Razorpay credentials:**
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to Settings → API Keys
3. Copy Key ID and Secret Key

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
restaurant/
├── app/
│   ├── api/                    # API routes
│   │   ├── booked-seats/       # Get booked seats
│   │   ├── confirm-booking/    # Confirm booking endpoint
│   │   ├── create-order/       # Create Razorpay order
│   │   └── verify-payment/     # Verify payment
│   ├── components/             # React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Footer.jsx
│   │   ├── SeatGrid.jsx        # Seat selection
│   │   ├── Seat.jsx            # Individual seat
│   │   └── PopularRestaurants.jsx
│   ├── book/                   # Booking page
│   │   └── page.jsx
│   ├── payment/                # Payment page
│   │   └── page.jsx            # Main payment form
│   ├── seats/                  # Seat selection page
│   │   └── page.js
│   ├── confirmation/           # Confirmation page
│   │   └── page.js
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── lib/
│   └── db.js                   # Database configuration
├── models/
│   └── Booking.js              # Booking model
├── public/                     # Static assets
├── .env.local                  # Environment variables
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.mjs          # PostCSS configuration
└── package.json                # Dependencies
```

---

## 💻 API Endpoints

### Create Order
```http
POST /api/create-order
Content-Type: application/json

{
  "amount": 50000,
  "currency": "INR",
  "receipt": "booking_1234567890"
}
```

### Verify Payment
```http
POST /api/verify-payment
Content-Type: application/json

{
  "razorpay_order_id": "order_id",
  "razorpay_payment_id": "pay_id",
  "razorpay_signature": "signature"
}
```

### Get Booked Seats
```http
GET /api/booked-seats?restaurant=restaurant_name&date=YYYY-MM-DD
```

### Confirm Booking
```http
POST /api/confirm-booking
Content-Type: application/json

{
  "restaurant": "restaurant_name",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "seats": "A1,A2,A3",
  "paymentId": "pay_id"
}
```

---

## 🎨 Customization

### Update Colors
Edit `tailwind.config.js` or modify Tailwind classes in component files.

### Add Restaurants
Update restaurant data in `app/components/PopularRestaurants.jsx`

### Modify Seat Layout
Edit `app/components/SeatGrid.jsx` to change grid dimensions and styling

### Payment Settings
Adjust amount calculations in `app/payment/page.jsx`

---

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with restaurant listings |
| Book | `/book` | Restaurant selection and details |
| Seats | `/seats` | Interactive seat selection |
| Payment | `/payment` | Payment processing |
| Confirmation | `/confirmation` | Booking confirmation |

---

## 🔐 Security Checklist

- ✅ Never commit `.env` files (use `.env.local`)
- ✅ Always use HTTPS in production
- ✅ Validate input on both frontend and backend
- ✅ Keep Razorpay keys secret
- ✅ Implement rate limiting on API endpoints
- ✅ Use CORS policies appropriately
- ✅ Regular security audits

---

## 🚢 Deployment

### Deploy on Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Follow the prompts and your app will be live!

### Deploy on Other Platforms

- **Netlify**: Connect GitHub repository
- **Heroku**: Use Procfile for deployment
- **DigitalOcean**: Use App Platform
- **AWS**: Use Amplify or Elastic Beanstalk

**Important**: Set environment variables in your hosting platform's dashboard.

---

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [Razorpay Integration Guide](https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/)
- [React Documentation](https://react.dev)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
# Change port
npm run dev -- -p 3001
```

### Module Not Found Error
```bash
# Reinstall dependencies
rm -r node_modules
npm install
```

### Razorpay Integration Issues
- Verify API keys in `.env.local`
- Check test/live mode settings
- Ensure CORS is configured correctly

### Payment Not Processing
- Check internet connection
- Verify payment amount format
- Review Razorpay dashboard for errors

---

## 📧 Contact & Support

For support, email: support@restaurant.com

Or open an issue on GitHub: [Issues](https://github.com/YOUR_USERNAME/restaurant/issues)

---

## 🎉 Acknowledgments

- **Razorpay** - Payment gateway
- **Vercel** - Next.js creators
- **Tailwind Labs** - Tailwind CSS
- **Heroicons** - Icon library

---

**Built with ❤️ by the Restaurant Team**

Last Updated: January 26, 2026
