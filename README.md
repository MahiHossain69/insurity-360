# 🏢 Insurity Admin Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern, comprehensive insurance administration dashboard built with Next.js 15 and React 19. Designed for insurance companies to manage policies, clients, payments, commissions, and team operations with an intuitive and responsive interface.

## ✨ Features

### 📊 **Dashboard & Analytics**

- Real-time business metrics and KPI tracking
- Interactive charts for premium collection, policy categories, and revenue analysis
- Performance overview with agent rankings and leaderboards
- Customizable widgets for personalized dashboard views

### 🛡️ **Policy Management**

- Comprehensive policy lifecycle management
- Claims processing and tracking
- Product plan configuration
- Opportunity management and lead tracking

### 👥 **Client Management**

- Client profile management with detailed information
- Activity tracking and engagement history
- Client acquisition and retention analytics

### 💰 **Financial Operations**

- Payment records and transaction history
- Invoice generation and management
- Commission ledger with automated calculations
- Revenue tracking by product lines

### 🔐 **User Management & Security**

- Role-based access control (RBAC)
- Team member management
- Permission configuration
- Activity logging and audit trails

### 📱 **Modern UI/UX**

- Responsive design for all devices
- Dark/light theme support
- Intuitive navigation with breadcrumbs
- Advanced filtering and search capabilities

## 🚀 Tech Stack

### **Frontend**

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - Latest React with concurrent features
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern component library built on Radix UI

### **State Management & Data Fetching**

- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### **UI Components & Icons**

- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons
- **[Recharts](https://recharts.org/)** - Composable charting library

### **Development Tools**

- **[Biome](https://biomejs.dev/)** - Fast linter and formatter
- **[Turbopack](https://turbo.build/pack)** - High-performance bundler
- **[Prettier](https://prettier.io/)** - Code formatting

## 📦 Installation

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd insurity-admin

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run Biome linter
npm run format       # Format code with Biome
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   └── layout.jsx         # Root layout
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── scenes/           # Feature-specific components
│   ├── shared/           # Reusable components
│   └── ui/               # shadcn/ui components
├── data/                 # Static data and configurations
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
├── schemas/              # Validation schemas
├── services/             # API service layers
└── styles/               # Global styles
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=your_api_endpoint

# Authentication
NEXTAUTH_SECRET=your_secret_key
```

### Customization

The application uses a modular architecture that allows easy customization:

- **Themes**: Modify `src/styles/globals.css` for custom styling
- **Components**: Extend or override components in `src/components/ui/`
- **Data**: Update mock data in `src/data/` for development
- **Navigation**: Configure sidebar navigation in `src/data/navigation-sidebar.js`

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Deployment Platforms

The application is optimized for deployment on:

- **[Vercel](https://vercel.com/)** (Recommended)
- **[Netlify](https://netlify.com/)**
- **[AWS Amplify](https://aws.amazon.com/amplify/)**
- **Docker** containers

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- 📧 Email: support@insurity.com
- 📖 Documentation: [docs.insurity.com](https://docs.insurity.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

<div align="center">
  <p>Built with ❤️ by the Insurity Team</p>
  <p>
    <a href="#-insurity-admin-dashboard">Back to top</a>
  </p>
</div>
