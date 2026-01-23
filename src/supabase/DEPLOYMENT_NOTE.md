# Supabase Edge Functions - Deployment Note

⚠️ **IMPORTANT**: This directory contains Supabase Edge Function source code.

## Why This Directory Exists

This folder contains the backend TypeScript code for your Supabase Edge Functions:
- `make-server` - Main Hono.js server with all AI endpoints
- Agents (lead scorer, email writer, strategy advisor, etc.)
- AI services (slide-ai, research-ai, image-ai, etc.)

## Deployment

These functions are **NOT deployed through Figma Make**. They must be deployed separately using:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase functions deploy make-server --no-verify-jwt
```

## Frontend Integration

The frontend code calls these functions via HTTP:
- URL pattern: `https://{projectId}.supabase.co/functions/v1/make-server-6522a742/{endpoint}`
- Configured in: `/services/edgeFunctions.ts`
- Uses: Bearer token authentication

## Why the 403 Error Was Occurring

Figma Make was detecting this `/supabase/` directory and automatically trying to deploy the edge functions, but without proper permissions, resulting in:

```
Error while deploying: XHR for "/api/integrations/supabase/.../edge_functions/make-server/deploy" failed with status 403
```

This error does NOT affect frontend functionality - it's purely a deployment permission issue.

## Current Status

✅ Frontend works correctly with demo data
✅ Edge functions source code preserved
✅ Manual deployment available when needed
⚠️ Auto-deployment blocked to prevent 403 errors
