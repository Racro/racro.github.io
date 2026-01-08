# How to Reset/Clear All Comments

## Method 1: Cloudflare Dashboard (Easiest)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **KV**
3. Click on your `COMMENTS_KV` namespace
4. You'll see all keys listed
5. Delete keys that start with:
   - `/poems/` (comment pages)
   - `reactions:` (reaction counts)
   - `rate_limit:` (rate limit data)
   - `user_reaction:` (user reaction tracking)

## Method 2: Using the Script

1. **Get your Account ID:**
   - Cloudflare Dashboard → Right sidebar shows your Account ID

2. **Create API Token:**
   - Go to https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use "Edit Cloudflare Workers KV" template
   - Or manually: Account → Cloudflare Workers KV → Edit
   - Copy the token

3. **Run the script:**
   ```bash
   cd cloudflare-worker
   export CLOUDFLARE_ACCOUNT_ID="your-account-id"
   export CLOUDFLARE_API_TOKEN="your-api-token"
   node clear-comments.js
   ```

## Method 3: Delete Specific Page Comments

If you just want to clear comments for one poem page:

1. Cloudflare Dashboard → Workers & Pages → KV → COMMENTS_KV
2. Find the key matching your page path (e.g., `/poems/pyaar-ho-raha-hai/`)
3. Click delete

## Method 4: Quick Reset via Worker (Future)

You could add a `/reset` endpoint to your Worker, but that's less secure. The dashboard method is recommended.

