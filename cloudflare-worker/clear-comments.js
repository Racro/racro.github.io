// Script to clear all comments from KV
// Run with: node clear-comments.js

// This script uses the Cloudflare API to delete all comment keys
// You'll need to set CLOUDFLARE_API_TOKEN environment variable

const NAMESPACE_ID = '07fbbf326b594ff2a40b2ad20c7bc2b3';
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID; // Get from Cloudflare Dashboard
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN; // Create at https://dash.cloudflare.com/profile/api-tokens

async function listKeys() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}/keys`,
    {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to list keys: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.result || [];
}

async function deleteKey(key) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}/values/${encodeURIComponent(key)}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    }
  );
  
  return response.ok;
}

async function clearComments() {
  if (!ACCOUNT_ID || !API_TOKEN) {
    console.error('Please set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN environment variables');
    console.error('Get Account ID from: Cloudflare Dashboard → Right sidebar');
    console.error('Create API Token at: https://dash.cloudflare.com/profile/api-tokens');
    console.error('Token needs: Account.Cloudflare Workers KV:Edit permissions');
    process.exit(1);
  }

  console.log('Fetching all keys...');
  const keys = await listKeys();
  
  console.log(`Found ${keys.length} keys`);
  
  // Filter to only comment-related keys (pages, reactions, rate limits)
  const commentKeys = keys
    .map(k => k.name)
    .filter(key => 
      key.startsWith('/poems/') || 
      key.startsWith('reactions:') || 
      key.startsWith('rate_limit:') ||
      key.startsWith('user_reaction:')
    );
  
  console.log(`Found ${commentKeys.length} comment-related keys to delete`);
  
  if (commentKeys.length === 0) {
    console.log('No comment keys to delete!');
    return;
  }
  
  console.log('\nDeleting keys...');
  let deleted = 0;
  let failed = 0;
  
  for (const key of commentKeys) {
    const success = await deleteKey(key);
    if (success) {
      deleted++;
      console.log(`✓ Deleted: ${key}`);
    } else {
      failed++;
      console.error(`✗ Failed: ${key}`);
    }
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\nDone! Deleted: ${deleted}, Failed: ${failed}`);
}

clearComments().catch(console.error);

