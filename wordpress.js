/**
 * WordPress REST API Client
 * Uses native fetch with WordPress Application Passwords
 */
class WordPressClient {
  constructor(config) {
    this.siteUrl = config.siteUrl.replace(/\/+$/, '');
    this.username = config.username.trim();
    // Normalize application password by removing any spaces
    this.appPassword = config.applicationPassword.replace(/\s+/g, '');
    this.authHeader = 'Basic ' + Buffer.from(`${this.username}:${this.appPassword}`).toString('base64');
  }

  getHeaders(extra = {}) {
    return {
      'Authorization': this.authHeader,
      'User-Agent': 'Antigravity-AutoBlogger/1.0',
      ...extra
    };
  }

  /**
   * Test connection & authentication against WordPress REST API
   */
  async testConnection() {
    const url = `${this.siteUrl}/wp-json/wp/v2/users/me?context=edit`;
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!res.ok) {
        const errorText = await res.text();
        return {
          success: false,
          status: res.status,
          message: `WordPress responded with HTTP ${res.status}: ${errorText}`
        };
      }

      const user = await res.json();
      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          username: user.slug || this.username,
          roles: user.roles || []
        }
      };
    } catch (err) {
      return {
        success: false,
        message: `Network/connection error: ${err.message}`
      };
    }
  }

  /**
   * Find or create a category by name
   */
  async getOrCreateCategory(name) {
    if (!name) return null;
    const cleanName = name.trim();
    const searchUrl = `${this.siteUrl}/wp-json/wp/v2/categories?search=${encodeURIComponent(cleanName)}`;

    try {
      const res = await fetch(searchUrl, { headers: this.getHeaders() });
      if (res.ok) {
        const categories = await res.json();
        const existing = categories.find(c => c.name.toLowerCase() === cleanName.toLowerCase());
        if (existing) return existing.id;
      }

      // Create category if it doesn't exist
      const createRes = await fetch(`${this.siteUrl}/wp-json/wp/v2/categories`, {
        method: 'POST',
        headers: this.getHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ name: cleanName })
      });

      if (createRes.ok) {
        const newCat = await createRes.json();
        return newCat.id;
      }
    } catch (e) {
      console.warn(`Category lookup/creation warning for "${cleanName}":`, e.message);
    }
    return null;
  }

  /**
   * Find or create tags by list of names
   */
  async getOrCreateTags(tagNames = []) {
    const tagIds = [];
    for (const rawName of tagNames) {
      const name = rawName.trim();
      if (!name) continue;
      try {
        const searchUrl = `${this.siteUrl}/wp-json/wp/v2/tags?search=${encodeURIComponent(name)}`;
        const res = await fetch(searchUrl, { headers: this.getHeaders() });
        if (res.ok) {
          const tags = await res.json();
          const existing = tags.find(t => t.name.toLowerCase() === name.toLowerCase());
          if (existing) {
            tagIds.push(existing.id);
            continue;
          }
        }

        const createRes = await fetch(`${this.siteUrl}/wp-json/wp/v2/tags`, {
          method: 'POST',
          headers: this.getHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ name })
        });

        if (createRes.ok) {
          const newTag = await createRes.json();
          tagIds.push(newTag.id);
        }
      } catch (e) {
        console.warn(`Tag lookup/creation warning for "${name}":`, e.message);
      }
    }
    return tagIds;
  }

  /**
   * Upload an image from external URL to WordPress Media Library
   */
  async uploadFeaturedImage(imageUrl, title, altText) {
    if (!imageUrl) return null;
    try {
      console.log(`Downloading featured image from ${imageUrl}...`);
      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) return null;

      const arrayBuffer = await imgRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filename = `skincare-${Date.now()}.jpg`;

      const uploadUrl = `${this.siteUrl}/wp-json/wp/v2/media`;
      const uploadRes = await fetch(uploadUrl, {
        method: 'POST',
        headers: this.getHeaders({
          'Content-Type': 'image/jpeg',
          'Content-Disposition': `attachment; filename="${filename}"`
        }),
        body: buffer
      });

      if (!uploadRes.ok) {
        console.warn('Media upload to WordPress failed with HTTP', uploadRes.status);
        return null;
      }

      const media = await uploadRes.json();

      // Update alt text and title
      if (media && media.id) {
        await fetch(`${this.siteUrl}/wp-json/wp/v2/media/${media.id}`, {
          method: 'POST',
          headers: this.getHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({
            alt_text: altText || title,
            caption: altText || title,
            title: title
          })
        });
        return media.id;
      }
    } catch (err) {
      console.warn('Failed to upload image to WordPress:', err.message);
    }
    return null;
  }

  /**
   * Create a WordPress post
   */
  async createPost({ title, content, excerpt, categoryName, tagNames, status = 'draft', imageUrl, imageAlt, slug, meta }) {
    let categoryId = null;
    if (categoryName) {
      categoryId = await this.getOrCreateCategory(categoryName);
    }

    let tagIds = [];
    if (tagNames && tagNames.length > 0) {
      tagIds = await this.getOrCreateTags(tagNames);
    }

    let featuredMediaId = null;
    if (imageUrl) {
      featuredMediaId = await this.uploadFeaturedImage(imageUrl, title, imageAlt);
    }

    const postPayload = {
      title: title,
      content: content,
      excerpt: excerpt || '',
      status: status, // 'publish', 'draft', or 'pending'
      categories: categoryId ? [categoryId] : [],
      tags: tagIds,
      featured_media: featuredMediaId || 0
    };

    if (slug) postPayload.slug = slug;
    if (meta) postPayload.meta = meta;

    const postUrl = `${this.siteUrl}/wp-json/wp/v2/posts`;
    const res = await fetch(postUrl, {
      method: 'POST',
      headers: this.getHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(postPayload)
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`WordPress post creation failed (HTTP ${res.status}): ${errBody}`);
    }

    const createdPost = await res.json();
    return {
      id: createdPost.id,
      title: createdPost.title.rendered,
      link: createdPost.link,
      status: createdPost.status
    };
  }
}

module.exports = WordPressClient;
