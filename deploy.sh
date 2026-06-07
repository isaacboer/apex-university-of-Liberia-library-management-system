#!/bin/bash

# Apex University Library Management System - Heroku Deployment Script
# This script automates deployment to Heroku

set -e

echo "🚀 Apex University Library Management System - Heroku Deployment"
echo "=============================================================="
echo ""

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found. Please install it from https://cli-assets.heroku.com/heroku-x64.exe"
    exit 1
fi

echo "✅ Heroku CLI found"

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git not found. Please install Git"
    exit 1
fi

echo "✅ Git found"

# Login to Heroku
echo ""
echo "🔐 Logging in to Heroku..."
heroku login

# Get app names
echo ""
echo "Enter your desired app names:"
read -p "Backend app name (default: apex-library-api): " BACKEND_APP
BACKEND_APP=${BACKEND_APP:-apex-library-api}

read -p "Frontend app name (default: apex-library-web): " FRONTEND_APP
FRONTEND_APP=${FRONTEND_APP:-apex-library-web}

echo ""
echo "📦 Creating backend app: $BACKEND_APP"
heroku create $BACKEND_APP 2>/dev/null || echo "App already exists or name taken"

echo ""
echo "📦 Creating frontend app: $FRONTEND_APP"
heroku create $FRONTEND_APP 2>/dev/null || echo "App already exists or name taken"

# Add PostgreSQL to backend
echo ""
echo "🗄️ Adding PostgreSQL database..."
heroku addons:create heroku-postgresql:hobby-dev -a $BACKEND_APP 2>/dev/null || echo "Database already exists"

# Set environment variables for backend
echo ""
echo "🔧 Setting backend environment variables..."
heroku config:set NODE_ENV=production -a $BACKEND_APP
heroku config:set JWT_SECRET=$(openssl rand -hex 32) -a $BACKEND_APP
heroku config:set FRONTEND_URL=https://$FRONTEND_APP.herokuapp.com -a $BACKEND_APP

echo ""
echo "✅ Backend environment variables set"

# Set environment variables for frontend
echo ""
echo "🔧 Setting frontend environment variables..."
heroku config:set REACT_APP_API_BASE_URL=https://$BACKEND_APP.herokuapp.com/api -a $FRONTEND_APP

echo ""
echo "✅ Frontend environment variables set"

# Deploy backend
echo ""
echo "🚀 Deploying backend..."
cd backend
git push heroku main 2>&1 | tail -20
cd ..

echo ""
echo "✅ Backend deployed!"

# Deploy frontend
echo ""
echo "🚀 Deploying frontend..."
cd frontend
git push heroku main 2>&1 | tail -20
cd ..

echo ""
echo "✅ Frontend deployed!"

# Display deployment info
echo ""
echo "=============================================================="
echo "🎉 Deployment Complete!"
echo "=============================================================="
echo ""
echo "📱 Your apps are live at:"
echo "   Frontend: https://$FRONTEND_APP.herokuapp.com"
echo "   Backend API: https://$BACKEND_APP.herokuapp.com/api"
echo "   Admin Dashboard: https://$FRONTEND_APP.herokuapp.com/admin"
echo ""
echo "📝 Default Admin Credentials:"
echo "   Email: admin@apexlibrary.com"
echo "   Password: admin123"
echo "   (Change password after first login!)"
echo ""
echo "📊 View logs:"
echo "   heroku logs -a $BACKEND_APP --tail"
echo "   heroku logs -a $FRONTEND_APP --tail"
echo ""
echo "🌍 Open in browser:"
echo "   heroku open -a $FRONTEND_APP"
echo ""
echo "=============================================================="
