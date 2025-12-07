# Quick Reference Guide - StartupAI Platform

## 🚀 Quick Start

### Deploy
```bash
npm run build
# Deploy to your hosting platform
```

### Test Endpoint
```bash
curl https://{projectId}.supabase.co/functions/v1/make-server-6522a742/health
# Expected: {"status":"ok"}
```

---

## 🔑 Key Files

### Services (USE THESE)
- `/services/edgeFunctions.ts` - ✅ Edge Function calls (CORRECT)
- `/services/deckService.ts` - ✅ Deck CRUD operations
- `/components/crm/hooks.ts` - ✅ CRM data hooks
- `/utils/logger.ts` - ✅ Logging utility

### Components
- `/components/crm/PitchDeckWizard.tsx` - Deck creation wizard
- `/components/crm/PitchDeckEditor.tsx` - Deck editor
- `/components/editor/AIChatPanel.tsx` - AI Copilot
- `/components/ErrorBoundary.tsx` - Error handling

### Backend
- `/supabase/functions/server/index.tsx` - Main Hono server
- `/supabase/functions/server/generate-deck.ts` - Deck generation
- `/supabase/functions/server/slide-ai.ts` - Slide AI operations
- `/supabase/functions/server/image-ai.ts` - Image generation
- `/supabase/functions/server/research-ai.ts` - Research

---

## 🐛 Common Issues & Solutions

### Issue: AI Features Not Working
**Cause:** Using wrong service file  
**Solution:** Import from `/services/edgeFunctions.ts` NOT `/src/services/edgeFunctionService.ts`

### Issue: TypeScript Errors
**Cause:** Wrong import paths  
**Solution:** Check imports match the correct service files

### Issue: Edge Function Timeout
**Cause:** Slow AI response  
**Solution:** Already configured with 60s timeout

### Issue: Console Full of Logs
**Cause:** Development mode  
**Solution:** Production will auto-hide (logger utility)

---

## 📦 Edge Function Service API

### Deck Operations
```typescript
import { generateDeck } from '../../services/edgeFunctions';

await generateDeck({
  deckId: string,
  businessContext: string,
  deckType: 'investor_pitch' | 'sales_deck',
  template?: string,
  wizardData?: any
});
```

### AI Operations
```typescript
import { 
  analyzeSlideAI, 
  rewriteSlide, 
  chatWithSlide,
  researchTopic,
  generateSlideImage 
} from '../../services/edgeFunctions';

// Analyze
await analyzeSlideAI({ 
  slideId, 
  slideContent, 
  action: 'analyze' 
});

// Rewrite
await rewriteSlide({ 
  slideId, 
  action: 'rewrite', 
  prompt, 
  currentContent 
});

// Chat
await chatWithSlide({ 
  action: 'chat', 
  message, 
  slideTitle, 
  slideContent, 
  slideType 
});

// Research
await researchTopic({ 
  query, 
  slideType 
});

// Image
await generateSlideImage({ 
  slideId, 
  prompt, 
  style 
});
```

---

## 🗄️ Database Schema

### Main Tables
```sql
-- Decks
decks (id, user_id, title, template, status, meta, created_at, updated_at)

-- Slides
slides (id, deck_id, type, title, bullets, speaker_notes, image_url, position, layout)

-- CRM
crm_contacts (id, first_name, last_name, email, company, stage, score)
crm_deals (id, name, amount, stage, sector, probability)
crm_tasks (id, title, description, status, due, assigned_to)
crm_interactions (id, contact_id, type, notes, occurred_at)

-- Startups
startups (id, user_id, name, tagline, description, team_data, traction_data)
```

---

## 🎨 Using Logger

```typescript
import { logger } from '../utils/logger';

// Development only
logger.log('Info message');
logger.debug('Debug details');
logger.success('Operation succeeded');

// All environments
logger.error('Error message', error);
logger.warn('Warning message');

// Special
logger.api('POST', '/generate-deck', payload);
logger.db('INSERT', 'decks', data);
logger.time('Operation');
logger.timeEnd('Operation');
```

---

## 🛡️ Error Boundaries

### Usage
```typescript
import { 
  AppErrorBoundary, 
  EditorErrorBoundary, 
  CRMErrorBoundary 
} from './components/ErrorBoundary';

// Wrap entire app
<AppErrorBoundary>
  <App />
</AppErrorBoundary>

// Wrap specific sections
<EditorErrorBoundary>
  <PitchDeckEditor />
</EditorErrorBoundary>
```

---

## 🔍 Debugging Checklist

### Frontend Issue
1. Check browser console for errors
2. Verify imports are from correct files
3. Check if data is loading (network tab)
4. Verify auth token is present

### Backend Issue
1. Check Edge Function logs in Supabase
2. Verify environment variables are set
3. Check endpoint URL is correct
4. Verify request format matches handler

### Database Issue
1. Check table exists
2. Verify RLS policies
3. Check column names match code
4. Verify data types are correct

---

## 📊 Testing Commands

### Build
```bash
npm run build
# Should pass with 0 errors
```

### Type Check
```bash
npm run type-check
# Should pass with 0 errors
```

### Health Check
```bash
curl https://{projectId}.supabase.co/functions/v1/make-server-6522a742/health
```

### Seed CRM
```bash
curl -X POST https://{projectId}.supabase.co/functions/v1/make-server-6522a742/seed-crm \
  -H "Authorization: Bearer {publicAnonKey}"
```

---

## 🎯 Critical Paths

### Path 1: Deck Generation
```
Wizard → Fill Form → Generate 
→ Edge Function → Gemini → Database 
→ Poll Status → Navigate to Editor
```

### Path 2: AI Rewrite
```
Editor → Select Slide → AI Chat 
→ Click Rewrite → Edge Function → Gemini 
→ Preview Modal → Apply → Auto-Save
```

### Path 3: Auto-Save
```
Editor → Edit Content → Wait 500ms 
→ Trigger Save → Update Database 
→ Show "Saved ✓"
```

---

## 🔐 Environment Variables

Required in deployment:
```bash
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
SUPABASE_DB_URL=postgresql://xxx
GEMINI_API_KEY=AIzaXxx...
```

---

## 📈 Performance Tips

### Reduce Bundle Size
- Implement code splitting
- Use React.lazy for routes
- Tree-shake unused code

### Improve Load Time
- Add loading skeletons
- Lazy load images
- Preload critical resources

### Optimize Database
- Add proper indexes
- Use select() to limit fields
- Enable RLS for security

---

## 🆘 Emergency Contacts

### If Everything Breaks
1. Check `/docs/FINAL_STATUS_REPORT.md`
2. Check `/docs/FIX_EXECUTION_LOG.md`
3. Check `/docs/troubleshooting.md`
4. Review error boundary screen
5. Check browser + server logs

### Rollback Plan
```bash
# Restore previous version
git revert HEAD
npm run build
# Deploy previous build
```

---

## ✅ Pre-Deployment Checklist

- [ ] `npm run build` passes
- [ ] All imports resolved
- [ ] Environment variables set
- [ ] Health check responds
- [ ] No console errors
- [ ] Error boundaries working
- [ ] Database tables exist
- [ ] Gemini API key valid

---

## 🎉 Success Indicators

### Everything is Working When:
- ✅ Wizard generates deck successfully
- ✅ Editor loads deck from database
- ✅ Auto-save persists changes
- ✅ AI rewrite provides suggestions
- ✅ AI analyze shows score
- ✅ Research returns market data
- ✅ Images generate correctly
- ✅ CRM loads contacts
- ✅ No critical errors in console

---

**Last Updated:** December 7, 2025  
**Version:** 2.0 (Post-Fix)  
**Status:** Production Ready
