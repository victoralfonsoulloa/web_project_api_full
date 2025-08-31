# Deployment Guide

## Prerequisites on Server
1. Node.js and npm installed
2. MongoDB installed and running
3. PM2 installed globally: `npm install -g pm2`
4. Git installed

## Deployment Steps

### 1. Clone Repository on Server
```bash
git clone <your-repo-url> /home/victoralfonsoulloa/web_project_api_full
cd /home/victoralfonsoulloa/web_project_api_full
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create .env file with production values
cp .env.example .env
# Edit .env with your production values
```

### 3. Frontend Setup & Build
```bash
cd ../frontend
npm install
npm run build
```

### 4. Start Backend with PM2
```bash
cd ../backend
pm2 start app.js --name "around-api"
pm2 save
pm2 startup
```

### 5. Serve Frontend (Option 1: Nginx)
- Install nginx: `sudo apt install nginx`
- Configure nginx to serve frontend build files
- Point to `/home/victoralfonsoulloa/web_project_api_full/frontend/dist`

### 5. Serve Frontend (Option 2: Simple HTTP Server)
```bash
cd ../frontend
npm install -g serve
pm2 start "serve -s dist -p 80" --name "around-frontend"
```

## Environment Variables

### Backend (.env)
```
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/aroundb
```

### Frontend (built into build)
```
VITE_API_BASE_URL=http://34.53.31.53:3000
```

## PM2 Commands
```bash
pm2 list                    # View running processes
pm2 restart around-api      # Restart backend
pm2 logs around-api         # View logs
pm2 stop around-api         # Stop backend
```

## Firewall Setup
```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 3000  # API
sudo ufw enable
```
