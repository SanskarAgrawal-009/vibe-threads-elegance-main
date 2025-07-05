# Vibe Threads Elegance

A modern e-commerce platform built with Next.js 13, MongoDB, and Tailwind CSS.

## Features

- 🛍️ Product Management (Admin Dashboard)
- 🛒 Shopping Cart
- 💝 Wishlist
- 👕 Category Filtering
- 🎨 Modern UI with shadcn/ui
- 📱 Responsive Design
- 🔐 Admin Authentication
- 📦 MongoDB Integration

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- MongoDB & Mongoose
- Tailwind CSS
- shadcn/ui Components
- React Query
- React Hook Form

## Getting Started

1. Clone the repository:
```sh
git clone <repository-url>
cd vibe-threads-elegance-builder
```

2. Install dependencies:
```sh
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```sh
npm run dev
```

## Project Structure

```
├── src/
│   ├── app/           # Next.js 13 app directory
│   ├── components/    # Reusable components
│   ├── lib/          # Utilities and helpers
│   └── contexts/     # React Context providers
├── backend/
│   ├── config/       # Database configuration
│   ├── controllers/  # API controllers
│   └── models/       # MongoDB models
└── public/          # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
