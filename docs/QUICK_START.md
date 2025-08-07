# Warisin Platform - Installation Guide

## Quick Start (5 Minutes)

### 1. Prerequisites
```bash
✅ Node.js 18+ 
✅ Bun package manager
✅ PostgreSQL 14+
✅ Git
```

### 2. Clone & Install
```bash
git clone https://github.com/Miku-Miku-Beam/heritage-core.git
cd heritage-core
bun install
```

### 3. Environment Setup
Create `.env.local`:
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/warisin"
NEXT_PUBLIC_FIREBASE_API_KEY="your_key"
UPLOADTHING_SECRET="your_secret"
```

### 4. Database Setup
```bash
bun db:migrate
bun db:seed
```

### 5. Start Development
```bash
bun dev
```
🚀 Open http://localhost:3000

---

## User Guide

### For Artisans
1. **Register** → Choose "Artisan" role
2. **Create Programs** → Dashboard → Add Program
3. **Manage Applications** → Review & accept students
4. **Monitor Progress** → Track student reports

### For Students
1. **Browse Programs** → Find interesting courses
2. **Apply** → Submit application with motivation
3. **Learn** → Access accepted programs
4. **Report Progress** → Submit weekly updates

---

## API Quick Reference

### Authentication
```typescript
POST /api/auth/register
POST /api/auth/login
```

### Programs
```typescript
GET /api/programs              // List all programs
POST /api/programs             // Create program (artisan)
GET /api/programs/:id          // Get program details
```

### Applications
```typescript
POST /api/applications         // Apply to program
PUT /api/applications/:id      // Update status (artisan)
GET /api/applications          // List user applications
```

### Progress Reports
```typescript
POST /api/progress-reports     // Submit weekly report
GET /api/progress-reports/:id  // Get application reports
```

---

## Troubleshooting

### Database Issues
```bash
# Reset database
bun db:reset

# Check connection
psql $DATABASE_URL
```

### Build Issues
```bash
# Clear cache
rm -rf .next node_modules
bun install
```

### Firebase Issues
- Verify API keys in `.env.local`
- Check Firebase console settings
- Ensure authentication is enabled

---

## Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Manual
```bash
bun generate:prod
bun build
bun start
```

---

## Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Database**: PostgreSQL + Prisma ORM  
- **Auth**: Firebase Authentication
- **Upload**: UploadThing
- **Style**: Tailwind CSS + Framer Motion

## Support
- 📖 [Full Documentation](./TECHNICAL_DOCUMENTATION.md)
- 🐛 [Report Issues](https://github.com/Miku-Miku-Beam/heritage-core/issues)
- 💬 [Discussions](https://github.com/Miku-Miku-Beam/heritage-core/discussions)
