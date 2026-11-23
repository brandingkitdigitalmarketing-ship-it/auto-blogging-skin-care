#!/bin/bash
set -e

echo "=========================================================="
echo "🚀 Lumière Derma Journal — Hostinger Automated Deployment"
echo "=========================================================="

APP_DIR="/var/www/derma-journal"
REPO_URL="https://github.com/brandingkitdigitalmarketing-ship-it/auto-blogging-skin-care.git"

# 1. Update system & verify Node.js
echo "📦 Checking system dependencies..."
if ! command -v node &> /dev/null; then
    echo "Installing Node.js 20 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs git
fi

# 2. Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2 process manager..."
    sudo npm install -g pm2
fi

# 3. Setup application directory
if [ -d "$APP_DIR" ]; then
    echo "Updating existing installation at $APP_DIR..."
    cd "$APP_DIR"
    git pull origin main
else
    echo "Cloning repository to $APP_DIR..."
    sudo mkdir -p /var/www
    sudo git clone "$REPO_URL" "$APP_DIR"
    sudo chown -R $USER:$USER "$APP_DIR"
    cd "$APP_DIR"
fi

# 4. Install npm dependencies
echo "📥 Installing dependencies..."
npm install --production=false

# 5. Build Next.js
echo "🔨 Building Next.js production bundle..."
npm run build

# 6. Start / Reload with PM2
echo "⚡ Starting application with PM2..."
pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js
pm2 save

echo "=========================================================="
echo "✅ Deployment completed successfully!"
echo "Website is running on port 3000."
echo "Use 'pm2 status' to view application processes."
echo "=========================================================="
