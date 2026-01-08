# Cloudflare Workers + KV Setup for Anonymous Comments

This guide will help you deploy the anonymous comments system to Cloudflare.

## Prerequisites

1. A Cloudflare account (free tier works fine)
2. `wrangler` CLI installed: `npm install -g wrangler`
3. Your Cloudflare account ID (found in Cloudflare dashboard)

## Step 1: Create KV Namespace

1. Go to Cloudflare Dashboard → **Workers & Pages** → **KV**
2. Click **Create a namespace**
3. Name it: `COMMENTS_KV`
4. Copy the **Namespace ID** (you'll need it)

## Step 2: Deploy the Worker

1. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

2. **Navigate to the worker directory:**
   ```bash
   cd cloudflare-worker
   ```

3. **Create `wrangler.toml` file:**
   ```toml
   name = "comments-worker"
   main = "comments.js"
   compatibility_date = "2024-01-01"

   [[kv_namespaces]]
   binding = "COMMENTS_KV"
   id = "YOUR_NAMESPACE_ID_HERE"  # Replace with your KV namespace ID
   ```

4. **Deploy:**
   ```bash
   wrangler deploy
   ```

5. **Copy your Worker URL** (e.g., `https://comments-worker.your-username.workers.dev`)

## Step 3: Update Your Site Config

1. **Edit `_config.yml`:**
   ```yaml
   cloudflare_comments_enabled: true
   cloudflare_worker_url: "https://comments-worker.your-username.workers.dev"
   ```

2. **Edit `assets/js/comments-widget.js`:**
   - Replace `YOUR_WORKER_URL` on line 4 with your actual Worker URL

## Step 4: Test

1. Restart Jekyll: `bundle exec jekyll serve --livereload`
2. Visit any poem page
3. Try submitting an anonymous comment
4. Check Cloudflare Dashboard → Workers → your worker → Logs to see requests

## Features

- ✅ **Anonymous comments** (no login required)
- ✅ **Rate limiting** (1 comment per minute per IP per page)
- ✅ **Spam protection** (minimum length, basic validation)
- ✅ **Free tier** (100k requests/day)
- ✅ **Fast** (edge-cached globally)

## Moderation

Comments are stored in Cloudflare KV. To moderate:

1. Go to Cloudflare Dashboard → **Workers & Pages** → **KV** → **COMMENTS_KV**
2. Find the key matching your page path (e.g., `/poems/pehle-pyaar-ki-kahani/`)
3. Edit the JSON array to remove unwanted comments
4. Save

## Custom Domain (Optional)

To use a custom domain like `comments.yoursite.com`:

1. Go to Workers → your worker → **Triggers** → **Custom Domains**
2. Add your domain
3. Update `cloudflare_worker_url` in `_config.yml`

## Troubleshooting

**Comments not loading?**
- Check browser console for errors
- Verify Worker URL is correct in `comments-widget.js`
- Check Cloudflare Worker logs

**CORS errors?**
- Worker should handle CORS automatically, but verify `corsHeaders` in `comments.js`

**Rate limit too strict?**
- Edit `comments.js` line ~60: change `60000` (1 minute) to a higher value

## Security Notes

- Comments are public (anyone can read)
- Rate limiting prevents spam but isn't foolproof
- Consider adding CAPTCHA for production (requires additional setup)
- Email addresses are stored but not displayed (optional field)

