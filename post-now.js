/**
 * Post-Now Script
 * Publishes 1 article to WordPress immediately
 */

const fs = require('fs');
const path = require('path');
const WordPressClient = require('./wordpress');
const { generateArticle } = require('./generator');
const allTopics = require('./topics');

const CONFIG_PATH = path.join(__dirname, 'config.json');
const HISTORY_PATH = path.join(__dirname, 'history.json');

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error('config.json not found! Please copy config.example.json to config.json and fill in your WordPress details.');
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
}

function loadHistory() {
  if (!fs.existsSync(HISTORY_PATH)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

function saveHistory(history) {
  fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2), 'utf-8');
}

function pickNextTopic(history) {
  const postedTopics = new Set(history.map(h => (h.topic || '').toLowerCase().trim()));
  const unposted = allTopics.filter(t => !postedTopics.has(t.topic.toLowerCase().trim()));

  if (unposted.length > 0) {
    return unposted[0];
  }

  // All topics posted once! Pick the oldest one to update or loop
  console.log('All curated topics have been published once! Looping through queue...');
  return allTopics[Math.floor(Math.random() * allTopics.length)];
}

async function run() {
  console.log('==================================================');
  console.log('   WordPress Skincare Auto-Blogger Engine');
  console.log('==================================================\n');

  const config = loadConfig();

  // Validate WordPress config
  if (!config.wordpress.siteUrl || config.wordpress.siteUrl.includes('your-wordpress-site.com')) {
    console.error('❌ ERROR: Please configure your WordPress siteUrl in config.json before publishing.');
    console.error('   Current URL:', config.wordpress.siteUrl);
    process.exit(1);
  }

  if (!config.wordpress.applicationPassword || config.wordpress.applicationPassword.includes('xxxx')) {
    console.error('❌ ERROR: Please provide your WordPress applicationPassword in config.json.');
    process.exit(1);
  }

  const wpClient = new WordPressClient(config.wordpress);

  // 1. Verify connection
  console.log(`Connecting to WordPress: ${config.wordpress.siteUrl}...`);
  const connCheck = await wpClient.testConnection();
  if (!connCheck.success) {
    console.error(`❌ Authentication Failed: ${connCheck.message}`);
    console.error('\nTips to fix:');
    console.error('1. Make sure the siteUrl is correct (e.g. https://example.com).');
    console.error('2. Go to WordPress Admin -> Users -> Profile -> Application Passwords.');
    console.error('3. Create a new Application Password and copy it to config.json.');
    process.exit(1);
  }

  console.log(`✅ Connected successfully as "${connCheck.user.name}" (${connCheck.user.username})!\n`);

  // 2. Select next topic
  const history = loadHistory();
  const topicItem = pickNextTopic(history);
  console.log(`Selected Topic: "${topicItem.topic}" [${topicItem.category}]`);

  // 3. Generate content
  console.log('Generating clinical article & SEO metadata...');
  const article = await generateArticle(topicItem, config.ai);
  console.log(`✅ Generated: "${article.title}"`);
  console.log(`   Word count: ~${article.content.split(/\s+/).length} words`);

  // 4. Publish to WordPress
  const postStatus = config.wordpress.postStatus || 'draft';
  console.log(`Publishing to WordPress as [${postStatus.toUpperCase()}]...`);

  const result = await wpClient.createPost({
    title: article.title,
    content: article.content,
    excerpt: article.excerpt,
    categoryName: article.category,
    tagNames: article.tags,
    status: postStatus,
    imageUrl: config.publishing?.uploadFeaturedImage !== false ? article.imageUrl : null,
    imageAlt: article.imageAlt
  });

  console.log('\n==================================================');
  console.log('🎉 POST SUCCESSFULLY CREATED IN WORDPRESS!');
  console.log('==================================================');
  console.log(`ID:     ${result.id}`);
  console.log(`Title:  ${result.title}`);
  console.log(`Status: ${result.status}`);
  console.log(`Link:   ${result.link}`);
  console.log('==================================================\n');

  // Record to history
  history.push({
    id: result.id,
    topic: topicItem.topic,
    title: result.title,
    link: result.link,
    status: result.status,
    publishedAt: new Date().toISOString()
  });
  saveHistory(history);

  return result;
}

if (require.main === module) {
  run().catch(err => {
    console.error('❌ Execution error:', err.message);
    process.exit(1);
  });
}

module.exports = { run };
