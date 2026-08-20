# CareerGenie - AI that recommends or guides job paths 🔥🔥

## 🚀 Overview

CareerGenie is a full-stack AI-powered career guidance platform that helps professionals discover their ideal career paths through intelligent recommendations, personalized guidance, and AI-driven tools. Built with modern web technologies, it provides comprehensive career development solutions including resume building, cover letter generation, and interview preparation.

## ✨ Features

### 🎯 Core Features
- **AI Career Path Recommendations** - Get personalized job path suggestions based on your skills and industry
- **Industry Insights Dashboard** - Real-time analytics and trends for your industry
- **Intelligent Resume Builder** - AI-powered resume creation and optimization
- **Cover Letter Generator** - Tailored cover letters for specific job applications
- **Interview Preparation** - Mock interviews with AI-generated questions
- **Performance Analytics** - Track your progress and improvement over time

### 🔧 Technical Features
- **User Authentication** - Secure sign-in/sign-up with Clerk
- **Real-time Database** - PostgreSQL with Prisma ORM
- **AI Integration** - Google Gemini AI for content generation
- **Background Jobs** - Inngest for async processing
- **Responsive Design** - Mobile-first UI with Tailwind CSS
- **Dark Mode** - Built-in theme switching

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Modern component library
- **Lucide React** - Icon library
- **React Spinners** - Loading animations

### Backend
- **Prisma** - Database ORM and query builder
- **Neon DB** - Serverless PostgreSQL database
- **Clerk** - Authentication and user management
- **Inngest** - Background job processing

### AI & Integrations
- **Google Gemini AI** - Content generation and recommendations
- **Markdown Support** - Rich text editing and display

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon DB recommended)
- Google Gemini API key
- Clerk account for authentication

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/ai-career-coach.git
cd ai-career-coach
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="your_neon_db_connection_string"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# AI Integration
GEMINI_API_KEY=your_gemini_api_key
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Start the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
ai-career-coach/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── (main)/                   # Main application pages
│   │   ├── dashboard/            # Industry insights dashboard
│   │   ├── resume/               # Resume builder
│   │   ├── ai-cover-letter/      # Cover letter generator
│   │   ├── interview/            # Interview preparation
│   │   └── onboarding/           # User onboarding
│   ├── api/                      # API routes
│   └── globals.css               # Global styles
├── actions/                      # Server actions
│   ├── cover-letter.js          # Cover letter operations
│   ├── dashboard.js             # Dashboard data
│   ├── interview.js             # Interview logic
│   ├── resume.js                # Resume operations
│   └── user.js                  # User management
├── components/                   # Reusable components
│   ├── ui/                      # Shadcn UI components
│   ├── header.jsx               # Navigation header
│   └── hero.jsx                 # Landing page hero
├── data/                        # Static data
│   ├── faqs.js                  # FAQ content
│   ├── features.js              # Feature descriptions
│   └── industries.js            # Industry data
├── lib/                         # Utility libraries
│   ├── inngest/                 # Background job functions
│   ├── prisma.js                # Database client
│   └── utils.js                 # Helper functions
├── prisma/                      # Database schema
│   └── schema.prisma            # Prisma schema definition
└── public/                      # Static assets
```

## 🔄 How It Works

### 1. User Onboarding
- Users sign up through Clerk authentication
- Complete onboarding form with industry, skills, and experience
- Profile data is stored in PostgreSQL via Prisma

### 2. AI-Powered Features
- **Resume Builder**: Uses Gemini AI to generate tailored resume content
- **Cover Letters**: Creates personalized cover letters based on job descriptions
- **Interview Prep**: Generates industry-specific interview questions
- **Career Recommendations**: Analyzes user profile for job path suggestions

### 3. Data Flow
```
User Input → Server Actions → Gemini AI → Database → UI Update
```

### 4. Background Processing
- Inngest handles async tasks like:
  - Industry data updates
  - Email notifications
  - Analytics processing

## 🎯 Key Pages & Features

### Dashboard (`/dashboard`)
- Industry insights and trends
- Salary data visualization
- Growth metrics and analytics

### Resume Builder (`/resume`)
- AI-powered content generation
- Real-time editing with markdown
- ATS score optimization

### Cover Letter Generator (`/ai-cover-letter`)
- Job-specific customization
- Company research integration
- Multiple templates

### Interview Preparation (`/interview`)
- Mock interview sessions
- Performance tracking
- AI feedback and tips

## 🔧 API Endpoints

### Server Actions
- `generateQuiz()` - Creates interview questions
- `saveQuizResult()` - Stores interview performance
- `getResume()` - Fetches user resume data
- `generateCoverLetter()` - Creates personalized cover letters

## 🎨 Styling & Design

- **Design System**: Shadcn/UI components
- **Themes**: Dark/Light mode support
- **Responsive**: Mobile-first approach
- **Animations**: Smooth transitions and loading states
- **Typography**: Custom gradient text effects

## 🔐 Security & Authentication

- **Clerk Integration**: Secure user authentication
- **Data Encryption**: All sensitive data encrypted
- **Environment Variables**: Secure API key management
- **Input Validation**: Zod schema validation

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on git push

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Live Demo](https://your-demo-url.com)
- [Documentation](https://your-docs-url.com)
- [Report Issues](https://github.com/your-username/ai-career-coach/issues)

## 💡 Future Enhancements

- [ ] LinkedIn integration
- [ ] Job board API connections
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Video interview practice

---

Built with ❤️ using Next.js, AI, and modern web technologies.
