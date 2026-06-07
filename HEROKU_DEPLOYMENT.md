# 🚀 DEPLOYMENT GUIDE - Apex University Library Management System

## ⚡ QUICK START: Deploy to Heroku (5 minutes)

### Prerequisites
1. Heroku Account (free at heroku.com)
2. Heroku CLI installed
3. Git installed

### Step 1: Install Heroku CLI
```bash
# MacOS
brew tap heroku/brew && brew install heroku

# Windows (download from)
https://cli-assets.heroku.com/heroku-x64.exe

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

### Step 2: Login to Heroku
```bash
heroku login
# Opens browser to authenticate
```

### Step 3: Create Backend App
```bash
cd backend
heroku create apex-library-api
```

### Step 4: Add PostgreSQL Database
```bash
heroku addons:create heroku-postgresql:hobby-dev -a apex-library-api
```

### Step 5: Set Environment Variables
```bash
heroku config:set NODE_ENV=production -a apex-library-api
heroku config:set JWT_SECRET=your-super-secret-key-change-this -a apex-library-api
heroku config:set FRONTEND_URL=https://apex-library-web.herokuapp.com -a apex-library-api
```

### Step 6: Deploy Backend
```bash
git push heroku main
```

### Step 7: Create Frontend App
```bash
cd ../frontend
heroku create apex-library-web
```

### Step 8: Set Frontend API URL
```bash
heroku config:set REACT_APP_API_BASE_URL=https://apex-library-api.herokuapp.com/api -a apex-library-web
```

### Step 9: Deploy Frontend
```bash
git push heroku main
```

### Step 10: Open Your App
```bash
heroku open -a apex-library-web
```

---

## ✅ Verify Deployment

### Check Logs
```bash
# Backend logs
heroku logs -a apex-library-api --tail

# Frontend logs
heroku logs -a apex-library-web --tail
```

### Test Backend API
```bash
curl https://apex-library-api.herokuapp.com/api/health
```

### Access Your Apps
- **Frontend:** https://apex-library-web.herokuapp.com
- **Backend API:** https://apex-library-api.herokuapp.com/api

---

## 🔐 Create Admin Account

### Access Backend Shell
```bash
heroku run bash -a apex-library-api
```

### Create Admin User (in backend shell)
```bash
node -e "
const bcrypt = require('bcryptjs');
const pool = require('./src/config/database');

async function createAdmin() {
  const password = await bcrypt.hash('admin123', 10);
  await pool.query(
    'INSERT INTO users (id, email, password, full_name, role, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
    ['550e8400-admin', 'admin@apexlibrary.com', password, 'Admin User', 'admin', new Date()]
  );
  console.log('Admin created: admin@apexlibrary.com / admin123');
}

createAdmin();
"
```

Then login at: https://apex-library-web.herokuapp.com
- Email: `admin@apexlibrary.com`
- Password: `admin123`

---

## 📊 Monitor Your Apps

### Heroku Dashboard
1. Go to dashboard.heroku.com
2. Select your apps
3. View logs, metrics, and dyno status

### View Database
```bash
heroku pg:psql -a apex-library-api
# Then run SQL queries
SELECT * FROM users;
```

### Restart Apps
```bash
heroku restart -a apex-library-api
heroku restart -a apex-library-web
```

---

## 🔄 Update & Redeploy

After making changes:

```bash
# Backend changes
cd backend
git add .
git commit -m "Update backend"
git push heroku main

# Frontend changes
cd frontend
git add .
git commit -m "Update frontend"
git push heroku main
```

---

## 💾 Backup Database

```bash
# Create backup
heroku pg:backups:capture -a apex-library-api

# Download backup
heroku pg:backups:download -a apex-library-api
```

---

## 🚨 Troubleshooting

### App won't start
```bash
heroku logs -a apex-library-api --tail
```

### Database connection error
```bash
# Check database URL
heroku config -a apex-library-api

# Verify connection
heroku pg:info -a apex-library-api
```

### Port issues
Heroku sets `process.env.PORT` automatically. Your app should listen to it:
```javascript
const port = process.env.PORT || 5000;
app.listen(port);
```

### CORS errors
Update backend `.env`:
```
FRONTEND_URL=https://apex-library-web.herokuapp.com
```

---

## 🎯 Production Checklist

- [ ] Changed JWT_SECRET to secure value
- [ ] Set NODE_ENV=production
- [ ] Configured DATABASE_URL
- [ ] Set FRONTEND_URL
- [ ] Tested login functionality
- [ ] Tested admin dashboard
- [ ] Verified database backups
- [ ] Set up error monitoring (optional)
- [ ] Configured custom domain (optional)
- [ ] Enabled HTTPS (automatic on Heroku)

---

## 📱 Custom Domain (Optional)

```bash
# Add custom domain
heroku domains:add library.apexuniversity.edu -a apex-library-web

# Point DNS to Heroku
# Follow instructions after running above command
```

---

## 💰 Cost Estimate

| Item | Cost |
|------|------|
| Backend Dyno (1) | $7/month |
| Frontend Dyno (1) | $7/month |
| PostgreSQL | Free (hobby) or $9/month |
| **Total** | **$14-23/month** |

Note: Heroku free tier has limitations. Hobby tier starts at $7/month per dyno.

---

## 🎊 Deployment Complete!

Your app is now live! Share the URLs:
- **Frontend:** https://apex-library-web.herokuapp.com
- **Admin:** https://apex-library-web.herokuapp.com/admin

**Admin Credentials:**
- Email: `admin@apexlibrary.com`
- Password: `admin123` (change after first login!)

---

## 📚 More Resources

- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/deploying-nodejs)
- [Heroku PostgreSQL](https://devcenter.heroku.com/articles/heroku-postgresql)
- [Heroku CLI Reference](https://devcenter.heroku.com/articles/heroku-cli-commands)

---

## 🆘 Need Help?

Check logs:
```bash
heroku logs -a apex-library-api --tail
heroku logs -a apex-library-web --tail
```

View config:
```bash
heroku config -a apex-library-api
```

Restart apps:
```bash
heroku restart -a apex-library-api
heroku restart -a apex-library-web
```

---

**Happy Deploying! 🚀**
