# BHIV-HR Platform

Intelligent HR Platform with AI-powered recruitment and Supabase authentication.

## 🔐 Authentication

This project uses **Supabase** for authentication. All user roles (Candidate, Recruiter, Client) are secured with email/password authentication.

### Quick Start with Authentication

1. **Install Dependencies**
   ```bash
   .\setup_supabase_auth.bat
   ```

2. **Configure Supabase Database**
   - Open your Supabase SQL Editor: https://fhwtxghyfcygpgefgurn.supabase.co
   - Run the SQL from `supabase_setup.sql`

3. **Start Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

### Authentication Documentation
- 📖 **Complete Setup Guide**: [SUPABASE_AUTH_SETUP.md](./SUPABASE_AUTH_SETUP.md)
- 📋 **Implementation Summary**: [SUPABASE_INTEGRATION_SUMMARY.md](./SUPABASE_INTEGRATION_SUMMARY.md)
- 💾 **Database Setup SQL**: [supabase_setup.sql](./supabase_setup.sql)

### Authentication Features
✅ Secure user signup and login  
✅ Protected routes with authentication checks  
✅ Role-based access (Candidate/Recruiter/Client)  
✅ JWT token management  
✅ Session persistence  
✅ User profile management  
✅ Logout functionality  

---

## 🚀 Project Structure

```
BHIV-HR/
├── frontend/                 # React frontend with Vite
│   ├── src/
│   │   ├── lib/             # Supabase client setup
│   │   ├── contexts/        # AuthContext for global auth state
│   │   ├── components/      # Reusable components (ProtectedRoute, etc.)
│   │   ├── pages/           # Page components
│   │   │   ├── auth/        # Authentication pages
│   │   │   ├── candidate/   # Candidate dashboard
│   │   │   ├── recruiter/   # Recruiter dashboard
│   │   │   └── client/      # Client dashboard
│   │   └── services/        # API services
│   ├── .env                 # Supabase credentials (git ignored)
│   └── package.json
└── backend/                 # Python backend services
    └── services/
        ├── gateway/         # API Gateway
        ├── agent/           # AI Agent service
        └── ...

```

## 💻 Development

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
# Follow backend-specific setup instructions
```

## 🔑 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://fhwtxghyfcygpgefgurn.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 📱 User Roles

### 1. Candidate
- Create and manage profile
- Browse job listings
- Apply to positions
- Track application status

### 2. Recruiter
- Post job openings
- Review applications
- Manage candidates
- Access AI matching

### 3. Client
- Review final candidates
- Approve/reject selections
- View analytics
- Manage hiring pipeline

## 🧪 Testing Authentication

1. Visit http://localhost:5173
2. Select a role (Candidate/Recruiter/Client)
3. Create an account with:
   - Email: test@example.com
   - Password: test123456
4. Login and access the dashboard
5. Test logout functionality

## 🛠️ Technologies

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router
- TanStack Query
- Supabase Auth
- Lucide Icons

### Backend
- Python/FastAPI
- PostgreSQL
- LangGraph
- AI/ML Services

## 📚 Documentation

- [Supabase Auth Setup](./SUPABASE_AUTH_SETUP.md) - Complete authentication setup guide
- [Integration Summary](./SUPABASE_INTEGRATION_SUMMARY.md) - Implementation details
- [Database Setup](./supabase_setup.sql) - SQL for Supabase database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test authentication flows
5. Submit a pull request

## 📄 License

This project is proprietary.

## 🐛 Troubleshooting

### Authentication Issues
- Check `.env` file exists with correct Supabase credentials
- Verify database tables are created (run `supabase_setup.sql`)
- Clear browser cache and localStorage
- Check Supabase dashboard for error logs

### Build Issues
- Delete `node_modules` and run `npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check Node.js version (requires v18+)

## 📞 Support

For authentication issues, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Setup Guide](./SUPABASE_AUTH_SETUP.md)

---

**Last Updated**: December 6, 2025  
**Status**: ✅ Supabase Authentication Fully Integrated
