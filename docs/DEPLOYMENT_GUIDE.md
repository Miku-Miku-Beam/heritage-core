# Warisin Platform - Deployment Guide

## Overview
This guide covers deploying the Warisin Heritage Platform to production environments.

---

## Pre-Deployment Checklist

### 1. Environment Preparation
- [ ] Production database (PostgreSQL) ready
- [ ] Firebase project configured for production
- [ ] UploadThing production app created
- [ ] Domain name configured
- [ ] SSL certificate ready

### 2. Code Preparation
- [ ] All features tested in development
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Build process tested
- [ ] Error handling implemented

---

## Deployment Options

## Option 1: Vercel (Recommended)

### Setup
1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project root
   vercel
   ```

2. **Environment Variables**
   Set in Vercel Dashboard or via CLI:
   ```bash
   vercel env add DATABASE_URL
   vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
   vercel env add UPLOADTHING_SECRET
   # ... add all environment variables
   ```

3. **Build Configuration**
   Vercel automatically detects Next.js. Ensure `vercel.json`:
   ```json
   {
     "buildCommand": "bun generate:prod && next build",
     "devCommand": "next dev",
     "installCommand": "bun install"
   }
   ```

4. **Database Setup**
   ```bash
   # Run migrations on production database
   npx prisma migrate deploy
   
   # Seed initial data (if needed)
   npx prisma db seed
   ```

### Production Deployment
```bash
vercel --prod
```

---

## Option 2: Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install Bun
RUN npm install -g bun

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate --no-engine

# Build application
RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXT_PUBLIC_FIREBASE_API_KEY=${NEXT_PUBLIC_FIREBASE_API_KEY}
      - UPLOADTHING_SECRET=${UPLOADTHING_SECRET}
    depends_on:
      - db

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=warisin
      - POSTGRES_USER=warisin
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app

volumes:
  postgres_data:
```

---

## Option 3: VPS/Cloud Server

### 1. Server Setup (Ubuntu 22.04)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Bun
curl -fsSL https://bun.sh/install | bash

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install PM2 for process management
npm install -g pm2

# Install Nginx
sudo apt install nginx

# Install certbot for SSL
sudo apt install certbot python3-certbot-nginx
```

### 2. Database Setup
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE warisin;
CREATE USER warisin WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE warisin TO warisin;
\q
```

### 3. Application Deployment
```bash
# Clone repository
git clone https://github.com/Miku-Miku-Beam/heritage-core.git
cd heritage-core

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with production values

# Generate Prisma client
bun generate:prod

# Run database migrations
bun db:migrate

# Build application
bun build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. PM2 Configuration
Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'warisin',
    script: 'npm start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

### 5. Nginx Configuration
Create `/etc/nginx/sites-available/warisin`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/warisin /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. SSL Certificate
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Database Migration

### Production Migration Process
1. **Backup Current Database**
   ```bash
   pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. **Run Migrations**
   ```bash
   # Dry run first
   npx prisma migrate diff --from-url $DATABASE_URL --to-schema-datamodel prisma/schema.prisma
   
   # Apply migrations
   npx prisma migrate deploy
   ```

3. **Verify Migration**
   ```bash
   npx prisma db pull
   npx prisma generate
   ```

---

## Environment Variables

### Production Environment File
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/warisin_prod"

# Firebase (Production)
NEXT_PUBLIC_FIREBASE_API_KEY="prod_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="warisin-prod.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="warisin-prod"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="warisin-prod.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="app_id"

# Firebase Admin
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL="firebase-adminsdk@warisin-prod.iam.gserviceaccount.com"
FIREBASE_ADMIN_PROJECT_ID="warisin-prod"

# UploadThing (Production)
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your_prod_app_id"

# Application
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NODE_ENV="production"
```

---

## Monitoring & Logging

### 1. Application Monitoring
```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs warisin

# Application metrics
pm2 install pm2-server-monit
```

### 2. Database Monitoring
```sql
-- Monitor database performance
SELECT * FROM pg_stat_activity;
SELECT * FROM pg_stat_database;

-- Check database size
SELECT pg_size_pretty(pg_database_size('warisin'));
```

### 3. Log Management
```bash
# Set up log rotation
sudo nano /etc/logrotate.d/warisin

# Content:
/path/to/app/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reload warisin
    endscript
}
```

---

## Security Checklist

### Application Security
- [ ] Environment variables secured
- [ ] HTTPS enabled with valid SSL certificate
- [ ] Security headers configured in Nginx
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (Prisma ORM)
- [ ] XSS protection implemented

### Infrastructure Security
- [ ] Firewall configured (UFW or cloud security groups)
- [ ] SSH key authentication only
- [ ] Regular security updates
- [ ] Database access restricted
- [ ] Backup encryption enabled
- [ ] Monitoring and alerting set up

---

## Backup Strategy

### 1. Database Backups
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/database"
DB_NAME="warisin"

# Create backup
pg_dump $DATABASE_URL > $BACKUP_DIR/warisin_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/warisin_$DATE.sql

# Remove backups older than 30 days
find $BACKUP_DIR -name "warisin_*.sql.gz" -mtime +30 -delete

# Upload to cloud storage (optional)
# aws s3 cp $BACKUP_DIR/warisin_$DATE.sql.gz s3://your-backup-bucket/
```

### 2. Application Backups
```bash
# Code backup (automated via Git)
git archive --format=tar.gz --output=backup_$(date +%Y%m%d).tar.gz HEAD

# Files backup
tar -czf files_backup_$(date +%Y%m%d).tar.gz uploads/ logs/
```

### 3. Automated Backup Schedule
```bash
# Add to crontab
crontab -e

# Daily database backup at 2 AM
0 2 * * * /path/to/backup.sh

# Weekly file backup
0 3 * * 0 /path/to/file_backup.sh
```

---

## Performance Optimization

### 1. Database Optimization
```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_applications_user_id ON "Application"("userId");
CREATE INDEX idx_applications_program_id ON "Application"("programId");
CREATE INDEX idx_programs_artisan_id ON "Program"("artisanId");
CREATE INDEX idx_progress_reports_application_id ON "ProgressReport"("applicationId");

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM "Application" WHERE "userId" = 'user_123';
```

### 2. Application Optimization
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['uploadthing.com', 'firebasestorage.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'standalone', // For Docker deployments
};
```

### 3. CDN Configuration
```nginx
# Add to Nginx config for static asset caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules bun.lockb
bun install

# Check for TypeScript errors
npx tsc --noEmit
```

#### 2. Database Connection Issues
```bash
# Test database connection
psql $DATABASE_URL

# Check Prisma schema
npx prisma db pull
npx prisma validate
```

#### 3. Memory Issues
```bash
# Monitor memory usage
free -h
pm2 monit

# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
```

#### 4. SSL Certificate Issues
```bash
# Renew SSL certificate
sudo certbot renew

# Test SSL configuration
sudo nginx -t
```

---

## Post-Deployment Tasks

### 1. Health Checks
- [ ] Application loads successfully
- [ ] Database connections working
- [ ] Authentication flow functional
- [ ] File uploads working
- [ ] Email notifications sending

### 2. Performance Testing
```bash
# Load testing with Artillery
npm install -g artillery
artillery quick --count 10 --num 50 https://yourdomain.com
```

### 3. Monitoring Setup
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure error tracking (Sentry)
- Set up performance monitoring (New Relic, DataDog)

---

This deployment guide covers the essential steps for getting Warisin Platform running in production. Choose the deployment method that best fits your infrastructure and requirements.
