# Deployment Guide

## Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or MongoDB server
- Server with public IP or hosting service (Heroku, Railway, DigitalOcean, etc.)

## Pre-deployment Checklist

### 1. Environment Variables
- Copy `.env.example` to `.env`
- Update all environment variables with production values
- Ensure MongoDB connection string is correct
- Set `FRONTEND_URL` to your actual frontend domain
- Generate secure JWT secrets

### 2. Security Updates
- Change default database credentials
- Use strong JWT secrets
- Update CORS origins to match your frontend domain
- Consider adding rate limiting middleware

### 3. Database Setup
- Ensure MongoDB database is accessible from your server
- Test database connection
- Set up proper indexes for performance

## Deployment Steps

### For VPS/Server Deployment:
```bash
# 1. Install dependencies
npm install

# 2. Build the project (if needed)
npm run build

# 3. Start the server
npm start
```

### For PM2 (Process Manager):
```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start backend/script.js --name "car-marketplace-api"

# Save PM2 configuration
pm2 save
pm2 startup
```

### For Docker:
Create a Dockerfile in the project root.

### For Heroku:
```bash
# Login to Heroku
heroku login

# Create a new app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set FRONTEND_URL=your_frontend_url

# Deploy
git push heroku main
```

## Post-deployment
- Test all API endpoints
- Verify file uploads work
- Check database connections
- Monitor server logs
- Set up SSL certificate
- Configure domain and DNS

## Monitoring
- Set up logging
- Monitor server resources
- Set up alerts for downtime
- Regular backups of database

## Important Notes
- Never commit `.env` file to version control
- Regularly update dependencies
- Monitor for security vulnerabilities
- Keep database credentials secure
- Use HTTPS in production
