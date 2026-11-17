# 🚀 Hostinger Production Deployment Guide
## Professional AI-Powered Skincare & Haircare News Magazine

This guide provides step-by-step instructions to deploy your **AI-Powered Skincare & Haircare News Magazine** on **Hostinger** (supporting both **Hostinger VPS / Cloud** and **Hostinger Web Hosting with Node.js**).

---

## 📋 Table of Contents
1. [Prerequisites & Architecture](#1-prerequisites--architecture)
2. [Option A: Deploying on Hostinger VPS / Cloud (Recommended)](#2-option-a-deploying-on-hostinger-vps--cloud-recommended)
3. [Option B: Deploying on Hostinger Business Web Hosting (Node.js Support)](#3-option-b-deploying-on-hostinger-business-web-hosting-nodejs-support)
4. [Custom Domain & SSL Configuration](#4-custom-domain--ssl-configuration)
5. [Environment Variables Setup](#5-environment-variables-setup)
6. [Daily Automated Publishing (Cron Job) Setup](#6-daily-automated-publishing-cron-job-setup)
7. [Automated CI/CD from GitHub](#7-automated-cicd-from-github)
8. [Maintenance, Backups & Monitoring](#8-maintenance-backups--monitoring)

---

## 1. Prerequisites & Architecture

* **Node.js Runtime:** Node.js v18.x or v20.x+
* **Framework:** Next.js 14 (App Router) + Tailwind CSS
* **Process Manager:** PM2 (via included `ecosystem.config.js`)
* **Reverse Proxy:** Nginx (via included `nginx.conf`)
* **Storage:** Embedded JSON/SQLite data engine in `/data` (no external database server required; zero latency, zero maintenance)

---

## 2. Option A: Deploying on Hostinger VPS / Cloud (Recommended)

Hostinger KVM VPS provides maximum performance, automatic scaling, and complete root access for running Next.js and background cron jobs.

### Step 1: Connect via SSH
Open your terminal (PowerShell, Command Prompt, or Mac Terminal):
```bash
ssh root@YOUR_HOSTINGER_VPS_IP
```

### Step 2: Install Node.js 20, Git & PM2
Run the following commands on your Hostinger VPS:
```bash
# Update package lists
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx

# Verify installations
node -v
npm -v

# Install PM2 globally for background process persistence
sudo npm install -g pm2
```

### Step 3: Clone Your GitHub Repository
```bash
# Navigate to web root
cd /var/www

# Clone your project repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git derma-journal

cd derma-journal
```

### Step 4: Configure Environment & Install Dependencies
```bash
# Copy environment configuration
cp .env.example .env.local

# Install dependencies
npm install

# Build the Next.js production bundle
npm run build
```

### Step 5: Start the Website with PM2
Launch the website and daily scheduler using the pre-configured `ecosystem.config.js`:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```
*(This ensures your website and daily auto-posting scheduler start automatically if the server reboots!)*

### Step 6: Configure Nginx Reverse Proxy
```bash
# Copy the provided nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/derma-journal

# Replace placeholder domain with your actual domain
sudo sed -i 's/yourskincaredomain.com/yourdomain.com/g' /etc/nginx/sites-available/derma-journal

# Enable site and test configuration
sudo ln -s /etc/nginx/sites-available/derma-journal /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 3. Option B: Deploying on Hostinger Business Web Hosting (Node.js Support)

If you are using Hostinger Shared / Business Web Hosting:

1. Log in to **Hostinger hPanel**.
2. Go to **Websites** → Click **Manage** on your domain.
3. Look for the **Node.js** icon in hPanel.
4. Set the following settings:
   * **Node.js version:** `20.x` or `18.x`
   * **Application Mode:** `Production`
   * **Application Root:** `derma-journal`
   * **Application URL:** `yourdomain.com`
   * **Application Startup File:** `server.js` or `npm start`
5. Upload your project files (via Git integration or File Manager).
6. Click **NPM Install**, then click **Run Script** → select `build`.
7. Click **Restart Application**.

---

## 4. Custom Domain & SSL Configuration

### Pointing Domain to Hostinger
In your Domain DNS manager (Hostinger, Cloudflare, or Namecheap):
* **Type A Record:** `@` points to your `VPS IP address`
* **Type CNAME Record:** `www` points to `yourdomain.com`

### Free SSL Certificate (Let's Encrypt / Certbot)
On your Hostinger VPS, run:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```
Certbot will automatically install the SSL certificate and renew it every 90 days.

---

## 5. Environment Variables Setup

Edit your production `.env.local` file:
```bash
nano .env.local
```

Configure:
```env
# Website URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# AI API Providers (Gemini or OpenAI)
AI_PROVIDER=builtin   # Set to 'gemini' or 'openai' when using your API key
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Cron Security Secret (protects the /api/cron endpoint from unauthorized requests)
CRON_SECRET=your_custom_secret_key_12345
```

---

## 6. Daily Automated Publishing (Cron Job) Setup

The publication is configured to publish **3 evidence-based articles per day** (Morning, Afternoon, Evening).

### Method 1: Hostinger hPanel Cron Job
1. In Hostinger hPanel, go to **Advanced** → **Cron Jobs**.
2. Select **Custom** command.
3. Add the following command to run 3 times daily (09:00, 13:00, 18:00):
```bash
curl -X POST https://yourdomain.com/api/cron -H "Authorization: Bearer your_custom_secret_key_12345"
```
* **Timing:** `0 9,13,18 * * *`

### Method 2: GitHub Actions Cloud Cron (100% Free & Independent)
The repository includes `.github/workflows/daily-auto-publish.yml`.
Simply add your `NEXT_PUBLIC_SITE_URL` and `CRON_SECRET` to your GitHub Repository Secrets:
* GitHub will trigger the publication endpoint automatically 3 times every single day!

---

## 7. Automated CI/CD from GitHub

To automatically deploy updates whenever you push to GitHub:
1. In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions**.
2. Add the following secrets:
   * `HOSTINGER_SSH_HOST`: Your Hostinger VPS IP
   * `HOSTINGER_SSH_USER`: `root` or your SSH username
   * `HOSTINGER_SSH_KEY`: Your private SSH key
   * `HOSTINGER_SSH_PORT`: `22`
3. The `.github/workflows/deploy-hostinger.yml` workflow will automatically pull the latest changes, build the app, and reload PM2 without downtime!

---

## 8. Maintenance, Backups & Monitoring

### Monitoring Application Logs
```bash
# View live logs of the website
pm2 logs derma-journal

# View live logs of the daily scheduler
pm2 logs derma-daily-scheduler

# Check CPU & RAM status
pm2 monit
```

### Automated Data Backups
All published articles, categories, and settings are stored in `/data/store.json`.
To create a daily backup on Hostinger:
```bash
# Add to crontab (crontab -e):
0 2 * * * cp /var/www/derma-journal/data/store.json /var/backups/derma-journal-backup-$(date +\%Y\%m\%d).json
```
Hostinger VPS also includes automatic weekly/daily snapshot backups in the VPS control panel.
