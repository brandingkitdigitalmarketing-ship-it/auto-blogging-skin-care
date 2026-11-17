/**
 * Daily Scheduler Script
 * Runs as a background service and triggers post-now once every day at the scheduled hour
 */

const { run } = require('./post-now');
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, 'config.json');
const HISTORY_PATH = path.join(__dirname, 'history.json');

function getConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
}

function hasPostedToday() {
  if (!fs.existsSync(HISTORY_PATH)) return false;
  try {
    const history = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf-8'));
    if (history.length === 0) return false;
    const last = history[history.length - 1];
    const lastDate = new Date(last.publishedAt).toDateString();
    const today = new Date().toDateString();
    return lastDate === today;
  } catch {
    return false;
  }
}

async function startScheduler() {
  const config = getConfig();
  const targetHour = config.publishing?.scheduleHour ?? 9;
  const targetMinute = config.publishing?.scheduleMinute ?? 0;

  console.log('==================================================');
  console.log('   WordPress Daily Auto-Blogger Scheduler Active');
  console.log('==================================================');
  console.log(`Scheduled Time: Every day at ${String(targetHour).padStart(2, '0')}:${String(targetMinute).padStart(2, '0')}`);
  console.log('Status: Running in background. Press Ctrl+C to stop.\n');

  // Check every 30 seconds
  setInterval(async () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour === targetHour && currentMinute === targetMinute) {
      if (!hasPostedToday()) {
        console.log(`[${now.toLocaleTimeString()}] Scheduled time reached! Triggering daily post...`);
        try {
          await run();
        } catch (e) {
          console.error('Scheduled post failed:', e.message);
        }
      }
    }
  }, 30000);
}

startScheduler();
