/**
 * Article Generator (Supports Google Gemini, OpenAI, and Built-In Dermatology Engine)
 */

function getEditorialImage(topic, category = 'Skincare') {
  const lower = topic.toLowerCase();

  if (lower.includes('hair') || lower.includes('scalp') || lower.includes('minoxidil') || lower.includes('follicle') || category.toLowerCase() === 'haircare') {
    const hairImages = [
      {
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200',
        alt: 'Haircare formulation dropper for scalp follicular nourishment'
      },
      {
        url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=1200',
        alt: 'Lustrous healthy hair and balanced scalp microbiome'
      },
      {
        url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=1200',
        alt: 'Clinical trichology scalp assessment and follicular density'
      }
    ];
    return hairImages[Math.floor(Math.random() * hairImages.length)];
  }

  if (lower.includes('sunscreen') || lower.includes('spf') || lower.includes('uv') || lower.includes('filter')) {
    return {
      url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1200',
      alt: 'Broad spectrum SPF sunscreen application with zero white cast'
    };
  }

  if (lower.includes('retinol') || lower.includes('retinal') || lower.includes('anti-aging') || lower.includes('wrinkle')) {
    return {
      url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200',
      alt: 'Ceramide barrier restorative cream and retinoid nighttime routine'
    };
  }

  if (lower.includes('exosome') || lower.includes('laser') || lower.includes('peel') || lower.includes('clinic')) {
    return {
      url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200',
      alt: 'Clinical aesthetic dermatology consultation room'
    };
  }

  if (lower.includes('vitamin c') || lower.includes('serum') || lower.includes('peptide') || lower.includes('acid') || lower.includes('niacinamide')) {
    return {
      url: 'https://images.unsplash.com/photo-1608248597359-009d73347f8c?auto=format&fit=crop&q=80&w=1200',
      alt: 'Cosmetic chemistry laboratory dropper with molecular active serums'
    };
  }

  return {
    url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1200',
    alt: 'Clean modern skincare regimen bottles on minimal pedestal'
  };
}

/**
 * Built-In Dermatology Knowledge Engine (No API Key Required)
 */
function generateBuiltinArticle(topicItem) {
  const { topic, category, keywords } = topicItem;
  const isHair = category === 'Haircare' || topic.toLowerCase().includes('hair') || topic.toLowerCase().includes('scalp');
  const imageInfo = getEditorialImage(topic, category);
  const primaryKw = (keywords && keywords[0]) || topic.toLowerCase();

  const title = topic.includes(':') ? topic : `${topic}: Evidence-Based Clinical Review`;
  const excerpt = `A deep-dive clinical analysis into ${primaryKw}. Explore cutaneous cellular mechanisms, double-blind trials, morning & evening protocols, and common patient pitfalls.`;

  const content = `
<p class="lead"><strong>Clinical Overview:</strong> ${
  isHair
    ? `Follicular biology and scalp microbiome balance represent one of the fastest-advancing fields in trichology. When approaching <em>${topic}</em>, navigating between aggressive marketing claims and evidence-based dermatological science is critical for long-term follicular vitality.`
    : `In modern evidence-based dermatology, optimizing skin health requires looking beyond cosmetic buzzwords and understanding transdermal biology. Today, we investigate the clinical research, lipid barrier dynamics, and therapeutic efficacy behind <em>${topic}</em>.`
}</p>

<h2>1. Biological Mechanism & Physiological Impact</h2>
<p>The cutaneous barrier (stratum corneum) functions as the body's primary immunological and physical defense. When administering targeted therapeutics for ${primaryKw}, therapeutic outcomes depend directly on molecular weight, vehicle pH, and formulation delivery systems.</p>

<p>Double-blind clinical evaluations published in dermatological literature highlight several crucial biological milestones:</p>
<ul>
  <li><strong>Epidermal Cellular Turnover:</strong> Accelerated keratinocyte differentiation without inducing trans-epidermal water loss (TEWL).</li>
  <li><strong>Dermal Fibroblast Stimulation:</strong> Upregulation of Type I and Type III pro-collagen mRNA transcription.</li>
  <li><strong>Microbiome Equilibrium:</strong> Preservation of beneficial commensal flora (such as <em>Staphylococcus epidermidis</em>) while preventing pathogenic overgrowth.</li>
</ul>

<h2>2. Head-to-Head Comparison & Formulation Metrics</h2>
<p>To assist both patients and practitioners, our clinical review board has summarized key formulation parameters in the protocol matrix below:</p>

<table style="width:100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #e2e8f0;">
  <thead>
    <tr style="background-color: #f8fafc; text-align: left;">
      <th style="padding: 12px; border: 1px solid #e2e8f0;">Clinical Parameter</th>
      <th style="padding: 12px; border: 1px solid #e2e8f0;">Optimal Target</th>
      <th style="padding: 12px; border: 1px solid #e2e8f0;">Mechanism of Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Formulation pH</strong></td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">4.5 – 5.5 (Skin Acid Mantle)</td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">Prevents enzyme degradation and barrier disruption</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Active Concentration</strong></td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">Therapeutic Threshold</td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">Maximizes receptor binding while minimizing erythema</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Vehicle Matrix</strong></td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">Liposomal / Ceramide-enriched</td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">Enhances transdermal penetration beyond the lipid bilayer</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Clinical Timeline</strong></td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">8 to 12 Weeks</td>
      <td style="padding: 12px; border: 1px solid #e2e8f0;">Required duration to complete full epidermal renewal cycle</td>
    </tr>
  </tbody>
</table>

<h2>3. Board-Certified Step-by-Step Routine Protocol</h2>
<p>Integrating ${primaryKw} effectively requires careful layering to prevent barrier sensitization:</p>

<h3>Morning (AM) Defense Protocol</h3>
<ol>
  <li><strong>Gentle Non-Stripping Cleanser:</strong> Maintain lipid bilayer hydration with a low-foaming, physiological-pH cleanser.</li>
  <li><strong>Targeted Antioxidant Treatment:</strong> Neutralize reactive oxygen species (ROS) caused by HEV blue light and environmental pollution.</li>
  <li><strong>Ceramide Barrier Restorative:</strong> Reinforce cutaneous moisture with bio-identical lipids (ceramides, fatty acids, and cholesterol).</li>
  <li><strong>Broad-Spectrum SPF 50+ Sunscreen:</strong> Non-negotiable photoprotection against UVA/UVB collagen degradation.</li>
</ol>

<h3>Evening (PM) Cellular Repair Protocol</h3>
<ol>
  <li><strong>Double Cleanse:</strong> Dissolve water-resistant UV filters and atmospheric particulate matter (PM 2.5).</li>
  <li><strong>Active Treatment Application:</strong> Apply ${primaryKw} to completely dry skin (or buffer with a light moisturizer if sensitive).</li>
  <li><strong>Occlusive Recovery Cream:</strong> Lock in hydration to prevent nighttime trans-epidermal moisture loss during circadian repair cycles.</li>
</ol>

<h2>4. Dermatologist Pearls: Common Mistakes to Avoid</h2>
<ul>
  <li><strong>Over-Exfoliation:</strong> Combining strong chemical exfoliants (AHA/BHA) with potent actives on the same evening can trigger acute barrier breakdown.</li>
  <li><strong>Skipping Sunscreen:</strong> Active cellular turnover increases epidermal photosensitivity. Daily broad-spectrum SPF is imperative.</li>
  <li><strong>Impatient Inconsistency:</strong> Cellular remodeling requires at least 6 to 12 weeks of consistent application before definitive clinical results appear.</li>
</ul>

<h2>5. Frequently Asked Questions (FAQ)</h2>
<div class="faq-section" style="margin-top: 20px;">
  <div style="margin-bottom: 16px;">
    <h3>How soon can I expect visible clinical improvements?</h3>
    <p>While subtle hydration and texture benefits may appear within 10 to 14 days, structural cellular improvements (collagen synthesis, pore refinement, and follicular density) require 8 to 12 weeks corresponding to natural biological renewal cycles.</p>
  </div>
  <div style="margin-bottom: 16px;">
    <h3>Is this suitable for sensitive or reactive skin?</h3>
    <p>Yes, provided you introduce the active gradually (1 to 2 nights per week) and employ the "sandwich buffering method"—applying a lightweight ceramide lotion before and after the active treatment.</p>
  </div>
  <div style="margin-bottom: 16px;">
    <h3>Can this be used alongside Vitamin C and Niacinamide?</h3>
    <p>Yes. Vitamin C is best applied during the morning protocol for photoprotection, while restorative actives are reserved for evening repair. Niacinamide can be paired harmoniously with both.</p>
  </div>
</div>

<hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;" />
<p style="font-size: 0.85em; color: #64748b;"><em>Medical Disclaimer: This article is intended for educational purposes only and does not substitute for personalized medical diagnosis, prescription, or clinical advice from a licensed board-certified dermatologist.</em></p>
`;

  return {
    title,
    content,
    excerpt,
    category,
    tags: keywords || [category, 'skincare', 'dermatology'],
    imageUrl: imageInfo.url,
    imageAlt: imageInfo.alt
  };
}

/**
 * Generate article using Google Gemini API
 */
async function generateGeminiArticle(topicItem, apiKey, model = 'gemini-1.5-flash') {
  const { topic, category, keywords } = topicItem;
  const imageInfo = getEditorialImage(topic, category);

  const prompt = `You are a Board-Certified Dermatologist and Chief Medical Editor for a premier skincare and dermatology publication.
Write an in-depth, authoritative, 1,200+ word clinical article about: "${topic}".
Target Category: ${category}
Target Keywords: ${(keywords || []).join(', ')}

Strict Requirements:
1. Provide a catchy, SEO-optimized Title.
2. Provide a compelling Meta Description (120-155 characters).
3. Format the article body in clean, valid HTML (do NOT wrap in markdown code blocks like \`\`\`html, return pure JSON).
4. Structure the body with:
   - Engaging clinical introduction
   - <h2> and <h3> subheadings detailing biological mechanisms
   - An HTML comparison table with relevant parameters (pH, active concentration, frequency, skin type)
   - Step-by-step AM and PM routine protocols
   - Dermatologist "Pearls & Pitfalls"
   - FAQ section (at least 3 detailed questions and answers)
   - Brief medical disclaimer at the bottom
5. Tone: Evidence-based, clinical yet engaging and accessible to informed skincare consumers.

Output strictly valid JSON with this exact schema:
{
  "title": "SEO Title",
  "excerpt": "Meta description (120-155 chars)",
  "content": "<p>...HTML content...</p>",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API Error (HTTP ${response.status}): ${err}`);
  }

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;
  const parsed = JSON.parse(text);

  return {
    title: parsed.title,
    content: parsed.content,
    excerpt: parsed.excerpt,
    category: category,
    tags: parsed.tags || keywords,
    imageUrl: imageInfo.url,
    imageAlt: imageInfo.alt
  };
}

/**
 * Generate article using OpenAI API
 */
async function generateOpenAiArticle(topicItem, apiKey) {
  const { topic, category, keywords } = topicItem;
  const imageInfo = getEditorialImage(topic, category);

  const prompt = `You are a Board-Certified Dermatologist and Chief Medical Editor.
Write an in-depth, authoritative, 1,200+ word clinical article about: "${topic}".
Target Category: ${category}
Keywords: ${(keywords || []).join(', ')}

Strict Requirements:
1. Return strictly JSON with keys: "title", "excerpt", "content", "tags".
2. "content" must be valid semantic HTML with <h2>, <h3>, <table>, <p>, <ul>/<ol>, and FAQ section.
3. Include an HTML table comparing parameters or active strengths.
4. Include AM/PM routine protocol steps.
5. Include a brief medical disclaimer at the end.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API Error (HTTP ${response.status}): ${err}`);
  }

  const data = await response.json();
  const parsed = JSON.parse(data.choices[0].message.content);

  return {
    title: parsed.title,
    content: parsed.content,
    excerpt: parsed.excerpt,
    category: category,
    tags: parsed.tags || keywords,
    imageUrl: imageInfo.url,
    imageAlt: imageInfo.alt
  };
}

/**
 * Main generator entry point
 */
async function generateArticle(topicItem, aiConfig = {}) {
  const provider = (aiConfig.provider || 'builtin').toLowerCase();

  if (provider === 'gemini' && aiConfig.geminiApiKey) {
    try {
      console.log('Generating article via Google Gemini API...');
      return await generateGeminiArticle(topicItem, aiConfig.geminiApiKey, aiConfig.model);
    } catch (err) {
      console.warn('Gemini API failed, falling back to built-in clinical generator:', err.message);
    }
  }

  if (provider === 'openai' && aiConfig.openaiApiKey) {
    try {
      console.log('Generating article via OpenAI API...');
      return await generateOpenAiArticle(topicItem, aiConfig.openaiApiKey);
    } catch (err) {
      console.warn('OpenAI API failed, falling back to built-in clinical generator:', err.message);
    }
  }

  console.log('Generating article using Built-In Dermatology Knowledge Engine...');
  return generateBuiltinArticle(topicItem);
}

module.exports = {
  generateArticle,
  getEditorialImage
};
