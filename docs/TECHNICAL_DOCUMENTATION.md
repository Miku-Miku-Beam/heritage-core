# Warisin Heritage Platform - Technical Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Installation Guide](#installation-guide)
3. [Configuration](#configuration)
4. [Database Setup](#database-setup)
5. [Development Guide](#development-guide)
6. [User Guide](#user-guide)
7. [API Documentation](#api-documentation)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)
10. [Maintenance](#maintenance)

---

## 1. System Overview

### 1.1 Platform Description
Warisin is a digital heritage preservation platform connecting traditional artisans with students/applicants for cultural knowledge transfer.

### 1.2 Technology Stack
- **Frontend**: Next.js 15.4.3, React 19.1.0, TypeScript 5.8.3
- **Backend**: Next.js API Routes, Server Components
- **Database**: PostgreSQL with Prisma ORM 6.12.0
- **UI Framework**: Tailwind CSS 4, Framer Motion 12.23.9
- **Authentication**: Firebase Auth
- **File Upload**: UploadThing
- **Styling**: Modern gradient design system

### 1.3 Key Features
- **Artisan Management**: Profile creation, program management, applicant tracking
- **Student Learning**: Application system, progress tracking, learning journal
- **Progress Monitoring**: Weekly reports, visual documentation, artisan oversight
- **Real-time Dashboard**: Statistics, notifications, activity tracking

### 1.4 User Roles
- **Artisan**: Traditional craftsperson offering heritage programs
- **Applicant/Student**: Learner applying for and participating in programs
- **Admin**: Platform administrator (future implementation)

---

## 2. Installation Guide

### 2.1 Prerequisites
```bash
# Required software
Node.js >= 18.0.0
Bun >= 1.0.0 (package manager)
PostgreSQL >= 14.0
Git
```

### 2.2 Clone Repository
```bash
git clone https://github.com/Miku-Miku-Beam/heritage-core.git
cd heritage-core
```

### 2.3 Install Dependencies
```bash
# Install all dependencies
bun install

# Alternative with npm
npm install
```

### 2.4 Environment Variables
Create `.env.local` file:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/warisin_db"

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"

# Firebase Admin (Server-side)
FIREBASE_ADMIN_PRIVATE_KEY="your_private_key"
FIREBASE_ADMIN_CLIENT_EMAIL="your_service_account@your_project.iam.gserviceaccount.com"
FIREBASE_ADMIN_PROJECT_ID="your_project_id"

# UploadThing
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 3. Configuration

### 3.1 Firebase Setup
1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication with Email/Password
3. Generate service account key
4. Update environment variables

### 3.2 UploadThing Setup
1. Register at [uploadthing.com](https://uploadthing.com)
2. Create new application
3. Copy API keys to environment variables

### 3.3 Database Configuration
```bash
# Generate Prisma client
bun generate

# Run database migrations
bun db:migrate

# Seed initial data
bun db:seed
```

---

## 4. Database Setup

### 4.1 Database Schema Overview
```sql
-- Core entities
User (id, name, email, role, profile data)
Program (id, title, description, artisan, requirements)
Application (id, user, program, status, progress)
ProgressReport (id, application, week, content, image)
```

### 4.2 Key Relationships
- User → Programs (One artisan, many programs)
- User → Applications (One applicant, many applications)
- Application → ProgressReports (One application, many reports)

### 4.3 Database Commands
```bash
# Reset database (development only)
bun db:reset

# View database in GUI
bun studio

# Create new migration
bun db:migrate --name "migration_name"
```

---

## 5. Development Guide

### 5.1 Start Development Server
```bash
# Start with Turbopack (recommended)
bun dev

# Alternative
npm run dev
```

### 5.2 Project Structure
```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (app)/             # Public pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Protected dashboard
│   │   └── api/               # API routes
│   ├── lib/                   # Utilities, auth, database
│   └── components/            # Shared components
├── prisma/                    # Database schema & migrations
├── public/                    # Static assets
└── docs/                      # Documentation
```

### 5.3 Development Workflow
1. **Feature Development**
   ```bash
   git checkout -b feature/feature-name
   # Make changes
   git commit -m "feat: add feature description"
   git push origin feature/feature-name
   ```

2. **Code Quality**
   ```bash
   # Lint code
   npm run lint
   
   # Type checking
   npx tsc --noEmit
   ```

3. **Database Changes**
   ```bash
   # Modify schema.prisma
   bun db:migrate --name "descriptive_name"
   bun generate
   ```

---

## 6. User Guide

### 6.1 Artisan Workflow

#### 6.1.1 Account Setup
1. Register at `/register` with email/password
2. Complete profile with artisan information
3. Upload profile photo and portfolio images

#### 6.1.2 Program Management
1. **Create Program**: Dashboard → Programs → Add New
   - Title, description, requirements
   - Duration, capacity, difficulty level
   - Upload program images

2. **Manage Applications**: Dashboard → Applicants
   - Review submitted applications
   - Accept/reject applicants
   - View applicant profiles

3. **Monitor Progress**: Dashboard → Student Progress
   - View active students
   - Review weekly progress reports
   - Track learning milestones

#### 6.1.3 Dashboard Features
- **Overview**: Statistics, recent activity
- **Programs**: Manage all programs
- **Applicants**: Review and manage applications
- **Progress**: Monitor student development

### 6.2 Student/Applicant Workflow

#### 6.2.1 Getting Started
1. Browse programs at `/programs`
2. View artisan profiles at `/artisans`
3. Register account and complete profile

#### 6.2.2 Application Process
1. **Find Programs**: Use search and filters
2. **Apply**: Click "Apply Now" on program detail page
   - Fill application form
   - Upload required documents
   - Submit motivation letter

3. **Track Application**: Dashboard → Applications
   - View application status
   - Receive notifications

#### 6.2.3 Learning Journey
1. **Access Accepted Programs**: Dashboard shows active programs
2. **Submit Progress Reports**: Weekly documentation
   - Write learning reflection
   - Upload progress photos
   - Track personal development

3. **Learning Journal**: View all submitted reports
   - Edit previous reports
   - Track learning progression
   - Download completion certificates

---

## 7. API Documentation

### 7.1 Authentication Endpoints

#### POST /api/auth/register
```typescript
// Request
{
  name: string;
  email: string;
  password: string;
  role: 'ARTISAN' | 'APPLICANT';
}

// Response
{
  success: boolean;
  user?: User;
  error?: string;
}
```

#### POST /api/auth/login
```typescript
// Request
{
  email: string;
  password: string;
}

// Response
{
  success: boolean;
  token?: string;
  user?: User;
}
```

### 7.2 Program Endpoints

#### GET /api/programs
```typescript
// Query params
{
  search?: string;
  category?: string;
  difficulty?: string;
  page?: number;
}

// Response
{
  programs: Program[];
  pagination: {
    page: number;
    total: number;
    hasMore: boolean;
  };
}
```

#### POST /api/programs
```typescript
// Request (Artisan only)
{
  title: string;
  description: string;
  requirements: string;
  duration: number;
  capacity: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  imageUrl?: string;
}
```

### 7.3 Application Endpoints

#### POST /api/applications
```typescript
// Request
{
  programId: string;
  motivationLetter: string;
  experience?: string;
}
```

#### PUT /api/applications/:id/status
```typescript
// Request (Artisan only)
{
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
  feedback?: string;
}
```

### 7.4 Progress Report Endpoints

#### POST /api/progress-reports
```typescript
// Request
{
  applicationId: string;
  weekNumber: number;
  reportText: string;
  imageUrl?: string;
}
```

#### GET /api/progress-reports/:applicationId
```typescript
// Response
{
  reports: ProgressReport[];
}
```

---

## 8. Deployment

### 8.1 Production Build
```bash
# Generate production Prisma client
bun generate:prod

# Build application
bun build

# Start production server
bun start
```

### 8.2 Environment Setup
1. **Database**: Set up PostgreSQL production instance
2. **Environment Variables**: Update production values
3. **Firebase**: Configure production Firebase project
4. **UploadThing**: Set up production file storage

### 8.3 Deployment Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Manual Deployment
```bash
# Build and export
bun build

# Upload dist folder to server
# Configure reverse proxy (nginx/apache)
# Set up SSL certificate
```

### 8.4 Database Migration
```bash
# Production migration
npx prisma migrate deploy

# Generate client
npx prisma generate --no-engine
```

---

## 9. Troubleshooting

### 9.1 Common Issues

#### 9.1.1 Database Connection Failed
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Verify connection string
psql $DATABASE_URL

# Reset database
bun db:reset
```

#### 9.1.2 Firebase Authentication Error
1. Verify Firebase configuration
2. Check API keys in environment variables
3. Ensure authentication methods are enabled

#### 9.1.3 Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules bun.lockb
bun install

# Type checking
npx tsc --noEmit
```

#### 9.1.4 File Upload Issues
1. Verify UploadThing configuration
2. Check file size limits
3. Ensure proper CORS settings

### 9.2 Performance Issues

#### 9.2.1 Slow Database Queries
```sql
-- Add database indexes
CREATE INDEX idx_applications_user_id ON "Application"("userId");
CREATE INDEX idx_programs_artisan_id ON "Program"("artisanId");
CREATE INDEX idx_progress_reports_application_id ON "ProgressReport"("applicationId");
```

#### 9.2.2 Image Optimization
- Use Next.js Image component
- Optimize images before upload
- Implement lazy loading

---

## 10. Maintenance

### 10.1 Regular Tasks

#### 10.1.1 Database Maintenance
```bash
# Weekly backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Cleanup old data (if needed)
# Monitor database size and performance
```

#### 10.1.2 Security Updates
```bash
# Update dependencies
bun update

# Check for vulnerabilities
npm audit
```

#### 10.1.3 Performance Monitoring
- Monitor application metrics
- Check error logs regularly
- Optimize slow queries

### 10.2 Scaling Considerations

#### 10.2.1 Database Scaling
- Implement read replicas
- Add connection pooling
- Optimize queries with indexes

#### 10.2.2 Application Scaling
- Use CDN for static assets
- Implement caching strategies
- Consider serverless functions

### 10.3 Backup Strategy
1. **Daily database backups**
2. **Code repository backups**
3. **File storage backups**
4. **Environment configuration backups**

---

## Quick Reference

### Essential Commands
```bash
# Development
bun dev                    # Start development server
bun db:migrate            # Run database migrations
bun db:reset              # Reset database with seed data
bun studio                # Open Prisma Studio

# Production
bun generate:prod         # Generate production Prisma client
bun build                 # Build for production
bun start                 # Start production server
```

### Key URLs
- Development: `http://localhost:3000`
- Dashboard: `/dashboard/artisan` or `/dashboard/applicant`
- Programs: `/programs`
- Artisans: `/artisans`
- Authentication: `/login`, `/register`

### Support
- Documentation: `/docs`
- Repository: [GitHub](https://github.com/Miku-Miku-Beam/heritage-core)
- Issues: Create GitHub issue for bugs or feature requests

---

*This documentation covers the essential aspects of the Warisin Heritage Platform. For additional details or specific use cases, refer to the code comments and inline documentation.*
