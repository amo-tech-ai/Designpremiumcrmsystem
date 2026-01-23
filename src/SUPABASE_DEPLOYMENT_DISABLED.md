# ⚠️ DEPLOYMENT CONFIGURATION - DO NOT DELETE

# This file explicitly disables Supabase Edge Function auto-deployment
# to prevent 403 errors during Figma Make deployment

## Problem
Figma Make detects /supabase/functions/ and tries to auto-deploy edge functions,
but lacks the necessary permissions, causing:
"Error while deploying: XHR for .../edge_functions/make-server/deploy failed with status 403"

## Solution
These files instruct Figma Make to skip Supabase deployments:
1. /.figmaignore - File ignore patterns
2. /figma-make.json - Deployment configuration  
3. This file - Deployment instructions

## Manual Deployment Only
Edge functions must be deployed manually via Supabase CLI:
```bash
npx supabase functions deploy make-server --no-verify-jwt
```

## Status
✅ Frontend works with demo data
✅ Edge function source preserved
⚠️ Auto-deployment disabled (by design)
