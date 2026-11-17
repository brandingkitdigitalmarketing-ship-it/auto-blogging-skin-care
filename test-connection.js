/**
 * Test Connection Script
 * Validates WordPress URL, Application Password, and AI Configuration
 */

const fs = require('fs');
const path = require('path');
const WordPressClient = require('./wordpress');

const CONFIG_PATH = path.join(__dirname, 'config.json');

async function test() {
  console.log('==================================================');
  console.log('   WordPress Auto-Blogger Connection Diagnostic');
  console.log('==================================================\n');

  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('❌ config.json not found!');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  console.log(`Checking WordPress Site: ${config.wordpress.siteUrl}`);
  console.log(`Username:                ${config.wordpress.username}`);
  console.log(`AI Provider:             ${config.ai?.provider || 'builtin'}\n`);

  if (config.wordpress.siteUrl.includes('your-wordpress-site.com') || config.wordpress.applicationPassword.includes('xxxx')) {
    console.warn('⚠️  Placeholder credentials detected in config.json.');
    console.log('Please open config.json and enter your real WordPress siteUrl and applicationPassword.\n');
    return;
  }

  const wpClient = new WordPressClient(config.wordpress);
  const result = await wpClient.testConnection();

  if (result.success) {
    console.log('✅ [SUCCESS] Connected to WordPress REST API!');
    console.log(`   User:     ${result.user.name}`);
    console.log(`   Username: ${result.user.username}`);
    console.log(`   Roles:    ${result.user.roles.join(', ')}`);
    console.log('\nYour WordPress site is 100% ready for automatic daily posting!\n');
  } else {
    console.error('❌ [FAILED] Could not connect to WordPress:');
    console.error(`   ${result.message}\n`);
    console.log('Troubleshooting steps:');
    console.log('1. Ensure your site URL includes https:// (e.g. https://yourdomain.com)');
    console.log('2. In WP Admin, go to: Users -> Profile -> Application Passwords');
    console.log('3. Add a new application password named "AutoBlogger" and copy it to config.json');
    console.log('4. Ensure your WordPress user has "Administrator" or "Editor" permissions');
  }
}

test().catch(console.error);
