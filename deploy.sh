#!/bin/bash

# Deploy to Cloud Server (using existing folders)
# Usage: ./deploy.sh

SERVER_USER="victoralfonsoulloa"
SERVER_IP="34.53.31.53"
BACKEND_PATH="/home/$SERVER_USER/around-the-us/web_project_around_express"
FRONTEND_PATH="/home/$SERVER_USER/around-the-us/web_project_around_frontend"

echo "🚀 Starting deployment to $SERVER_IP..."
echo "📁 Using existing project structure in around-the-us/"

# Copy backend files to existing backend folder
echo "📁 Uploading backend files..."
rsync -avz --exclude 'node_modules' --exclude '.git' backend/ $SERVER_USER@$SERVER_IP:$BACKEND_PATH/

# Copy frontend files to existing frontend folder  
echo "📁 Uploading frontend files..."
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude 'dist' frontend/ $SERVER_USER@$SERVER_IP:$FRONTEND_PATH/

# Connect to server and run deployment commands
echo "🔧 Setting up on server..."
ssh $SERVER_USER@$SERVER_IP << EOF
    echo " Setting up backend..."
    cd $BACKEND_PATH
    
    # Install backend dependencies
    echo "📦 Installing backend dependencies..."
    npm install
    
    # Create production .env file if it doesn't exist
    if [ ! -f .env ]; then
        echo "📝 Creating production .env file..."
        cat > .env << EOL
NODE_ENV=production
JWT_SECRET=super-secret-production-jwt-key-$(date +%s)
PORT=3000
MONGODB_URI=mongodb://localhost:27017/aroundb
EOL
    fi
    
    # Install PM2 globally if not already installed
    echo "🔄 Installing/updating PM2..."
    npm install -g pm2
    
    # Stop existing PM2 process if running
    pm2 stop around-backend 2>/dev/null || true
    pm2 delete around-backend 2>/dev/null || true
    
    # Start backend with PM2
    echo "🚀 Starting backend with PM2..."
    pm2 start app.js --name "around-backend"
    pm2 save
    pm2 startup
    
    echo "✅ Backend deployed successfully!"
    
    # Setup frontend
    cd $FRONTEND_PATH
    echo "📦 Installing frontend dependencies..."
    npm install
    
    # Build frontend for production
    echo "🏗️ Building frontend..."
    VITE_API_BASE_URL=http://around-the-us.mooo.com/api npm run build
    
    # Install nginx if not already installed
    echo "🌐 Setting up Nginx..."
    sudo apt update
    sudo apt install -y nginx
    
    # Create nginx configuration
    sudo tee /etc/nginx/sites-available/around-the-us << EOL
server {
    listen 80;
    server_name around-the-us.mooo.com www.around-the-us.mooo.com;
    
    # Frontend
    location / {
        root $FRONTEND_PATH/dist;
        index index.html;
        try_files \\\$uri \\\$uri/ /index.html;
    }
    
    # API proxy
    location /api {
        rewrite ^/api/(.*) /\\\$1 break;
        proxy_pass http://localhost:3000;
        proxy_set_header Host \\\$host;
        proxy_set_header X-Real-IP \\\$remote_addr;
        proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
    }
}
EOL
    
    # Enable the site
    sudo ln -sf /etc/nginx/sites-available/around-the-us /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test and reload nginx
    sudo nginx -t && sudo systemctl reload nginx
    
    echo "✅ Frontend deployed successfully!"
    
    # Show status
    echo "📊 Deployment Status:"
    pm2 status
    sudo systemctl status nginx --no-pager -l
    
    echo "🎉 Deployment completed!"
    echo "🌐 Your app should be accessible at: http://around-the-us.mooo.com"
    
EOF

echo "✅ Deployment script completed!"
echo "🌐 Your app should be accessible at: http://around-the-us.mooo.com"
