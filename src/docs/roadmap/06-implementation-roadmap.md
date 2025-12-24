# 06 - Production-Ready Implementation Roadmap

**Date:** December 22, 2025  
**Status:** 4-Week Implementation Plan  
**Goal:** Production-ready AI-powered startup OS

---

## 🎯 Executive Summary

**Current State:** 90% complete, core features working  
**Target State:** 100% production-ready with full AI capabilities  
**Timeline:** 4 weeks (20 working days)  
**Team:** 2-3 developers + 1 AI specialist  
**Investment:** ~160 hours total

---

## 📅 Week 1: Core AI Integration (Dec 23-27, 2025)

### Day 1: Backend Setup & Deployment

**Tasks:**
- [ ] Run database migration (deck status constraint)
- [ ] Deploy edge functions to Supabase
- [ ] Configure GEMINI_API_KEY in secrets
- [ ] Test all existing endpoints
- [ ] Set up error monitoring

**Deliverables:**
```bash
✅ Database migration executed
✅ Edge functions deployed
✅ Health check endpoint working
✅ AI agents callable via API
```

**Testing:**
```bash
# Verify deployment
curl https://PROJECT.supabase.co/functions/v1/make-server-6522a742/health

# Test lead scorer
curl -X POST .../agents/score-lead \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"contact":{...},"context":{...}}'
```

**Time:** 8 hours  
**Owner:** Backend Developer

---

### Day 2: Agent Routes Implementation

**Tasks:**
- [ ] Create `/routes/agents.ts` file
- [ ] Implement all 4 agent routes
- [ ] Add authentication middleware
- [ ] Add error handling
- [ ] Add AI run logging

**Code:**
```typescript
// supabase/functions/server/routes/agents.ts
import { Hono } from 'hono';
import { getAgents } from '../agents/index.ts';
import { getUser } from '../utils/auth.ts';

const app = new Hono();
const agents = getAgents();

app.post('/score-lead', async (c) => { /* ... */ });
app.post('/analyze-deck', async (c) => { /* ... */ });
app.post('/write-email', async (c) => { /* ... */ });
app.post('/gtm-strategy', async (c) => { /* ... */ });

export default app;
```

**Time:** 6 hours  
**Owner:** Backend Developer

---

### Day 3: Frontend Service Layer

**Tasks:**
- [ ] Create `/services/agentService.ts`
- [ ] Implement scoreContact()
- [ ] Implement analyzeDeck()
- [ ] Implement generateEmail()
- [ ] Implement generateStrategy()
- [ ] Add TypeScript types

**Code:**
```typescript
// services/agentService.ts
export const scoreContact = async (contactId: string) => {
  const { data: contact } = await supabase
    .from('crm_contacts')
    .select('*')
    .eq('id', contactId)
    .single();
  
  const result = await callEdgeFunction('agents/score-lead', {
    contact: { ... },
    context: { ... }
  });
  
  await supabase.from('crm_lead_scores').upsert({ ... });
  
  return result;
};
```

**Time:** 6 hours  
**Owner:** Frontend Developer

---

### Day 4: CRM Auto-Scoring Integration

**Tasks:**
- [ ] Update `/components/crm/actions.ts`
- [ ] Add auto-scoring on contact create
- [ ] Add realtime score updates
- [ ] Update ContactsDashboard UI
- [ ] Add score badges

**Flow:**
```
User adds contact
  → Contact saved to DB
  → Trigger auto-scoring (background)
  → AI scores contact (2-3s)
  → Score saved to DB
  → Realtime update → UI shows badge
```

**Time:** 6 hours  
**Owner:** Frontend Developer

---

### Day 5: Testing & Bug Fixes

**Tasks:**
- [ ] Test deck generation end-to-end
- [ ] Test lead scoring automation
- [ ] Fix any bugs found
- [ ] Verify error handling
- [ ] Test with bad data

**Test Cases:**
```markdown
## Deck Generation
✓ Create deck with wizard
✓ Verify status transitions (draft → generating → complete)
✓ Verify slides saved correctly
✓ Test error handling (API key invalid, timeout)

## Lead Scoring
✓ Add contact manually
✓ Verify auto-scoring triggered
✓ Verify score appears in UI
✓ Test with various contact types
✓ Verify realtime updates
```

**Time:** 8 hours  
**Owner:** Full Team

---

## 📅 Week 2: Advanced AI Features (Dec 30 - Jan 3, 2026)

### Day 6: Deck Analyzer UI

**Tasks:**
- [ ] Create DeckAnalysisPanel component
- [ ] Update AIInsights dashboard
- [ ] Add score visualization
- [ ] Add recommendations display
- [ ] Add slide-by-slide breakdown

**Component:**
```typescript
// components/ai/DeckAnalysisPanel.tsx
export const DeckAnalysisPanel = ({ deckId }: Props) => {
  const analysis = useAIAgent(analyzeDeck, {
    loadingMessage: 'Analyzing deck...',
    successMessage: 'Analysis complete!'
  });
  
  return (
    <div>
      <Button onClick={() => analysis.execute(deckId)}>
        Analyze Deck
      </Button>
      
      {analysis.data && (
        <AnalysisResults data={analysis.data} />
      )}
    </div>
  );
};
```

**Time:** 8 hours  
**Owner:** Frontend Developer

---

### Day 7: Email Writer Integration

**Tasks:**
- [ ] Create EmailComposer component
- [ ] Add to ContactDetailPage
- [ ] Implement email generation
- [ ] Add draft editing
- [ ] Add send functionality

**Flow:**
```
User clicks "Email Contact"
  → Modal opens
  → Select purpose (intro/follow-up/meeting)
  → AI generates draft (3-5s)
  → User reviews and edits
  → Click send
  → Log activity
```

**Time:** 8 hours  
**Owner:** Frontend Developer

---

### Day 8: Research Agent with Google Search

**Tasks:**
- [ ] Create ResearchAgent class
- [ ] Implement Google Search grounding
- [ ] Add research endpoint
- [ ] Create research UI component
- [ ] Add to ContactDiscovery page

**Implementation:**
```typescript
// agents/research-agent.ts
export class ResearchAgent extends BaseAgent {
  async research(input: ResearchInput): Promise<ResearchOutput> {
    const model = this.ai.getGenerativeModel({
      model: 'gemini-1.5-pro',
      tools: [{ googleSearch: {} }]
    });
    
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      toolConfig: {
        googleSearchRetrieval: {
          dynamicRetrievalConfig: {
            mode: 'MODE_DYNAMIC',
            dynamicThreshold: 0.3
          }
        }
      }
    });
    
    return JSON.parse(result.response.text());
  }
}
```

**Time:** 10 hours  
**Owner:** AI Specialist

---

### Day 9: GTM Strategy Advisor UI

**Tasks:**
- [ ] Create StrategyViewer component
- [ ] Update GTMStrategy page
- [ ] Add strategy form
- [ ] Display timeline visualization
- [ ] Add tactics matrix (effort/impact)
- [ ] Add export functionality

**Visualization:**
```typescript
// Display effort/impact matrix
const TacticsMatrix = ({ tactics }: Props) => {
  const quadrants = {
    quickWins: tactics.filter(t => t.effort === 'low' && t.impact === 'high'),
    strategic: tactics.filter(t => t.effort === 'high' && t.impact === 'high'),
    fillIns: tactics.filter(t => t.effort === 'low' && t.impact === 'low'),
    avoid: tactics.filter(t => t.effort === 'high' && t.impact === 'low')
  };
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <QuadrantCard title="Quick Wins" tactics={quadrants.quickWins} />
      <QuadrantCard title="Strategic" tactics={quadrants.strategic} />
      <QuadrantCard title="Fill-Ins" tactics={quadrants.fillIns} />
      <QuadrantCard title="Avoid" tactics={quadrants.avoid} />
    </div>
  );
};
```

**Time:** 8 hours  
**Owner:** Frontend Developer

---

### Day 10: Integration Testing & Refinement

**Tasks:**
- [ ] Test all AI features end-to-end
- [ ] Verify error handling
- [ ] Test with edge cases
- [ ] Performance testing
- [ ] Fix bugs

**Test Matrix:**
```markdown
| Feature | Happy Path | Error Case | Edge Case | Status |
|---------|-----------|-----------|----------|--------|
| Deck Gen | ✓ | ✓ | ✓ | ✅ |
| Lead Score | ✓ | ✓ | ✓ | ✅ |
| Deck Analysis | ✓ | ✓ | ✓ | ✅ |
| Email Writer | ✓ | ✓ | ✓ | ✅ |
| Research | ✓ | ✓ | ✓ | ✅ |
| GTM Strategy | ✓ | ✓ | ✓ | ✅ |
```

**Time:** 8 hours  
**Owner:** Full Team

---

## 📅 Week 3: Automation & RAG (Jan 6-10, 2026)

### Day 11-12: CRM Automation Engine

**Tasks:**
- [ ] Create automation_rules table
- [ ] Create automation_executions table
- [ ] Implement AutomationEngine class
- [ ] Add trigger system
- [ ] Add action handlers
- [ ] Implement idempotency

**Architecture:**
```typescript
class AutomationEngine {
  async execute(trigger: Trigger) {
    // 1. Get matching rules
    const rules = await this.getMatchingRules(trigger);
    
    // 2. Evaluate conditions
    for (const rule of rules) {
      // 3. Check idempotency
      const executed = await this.wasExecuted(rule.id, trigger.entityId);
      if (executed) continue;
      
      // 4. Evaluate conditions
      if (!await this.evaluateConditions(rule.conditions, trigger)) {
        continue;
      }
      
      // 5. Execute actions
      await this.executeActions(rule.actions, trigger);
      
      // 6. Mark executed
      await this.markExecuted(rule.id, trigger.entityId);
    }
  }
  
  private async executeActions(actions: Action[], trigger: Trigger) {
    for (const action of actions) {
      switch (action.type) {
        case 'create_task':
          await this.createTask(action.config, trigger);
          break;
        case 'send_email':
          await this.sendEmail(action.config, trigger);
          break;
        case 'update_field':
          await this.updateField(action.config, trigger);
          break;
      }
    }
  }
}
```

**Time:** 16 hours  
**Owner:** Backend Developer + AI Specialist

---

### Day 13: pgvector RAG Setup

**Tasks:**
- [ ] Enable pgvector extension
- [ ] Create document_embeddings table
- [ ] Implement embedding generation
- [ ] Create similarity search function
- [ ] Test RAG retrieval

**SQL:**
```sql
-- Enable extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create embeddings table
CREATE TABLE document_embeddings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES decks(id),
  chunk_text text NOT NULL,
  embedding vector(768),
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create index
CREATE INDEX ON document_embeddings 
USING ivfflat (embedding vector_cosine_ops) 
WITH (lists = 100);

-- Similarity search function
CREATE FUNCTION match_documents(
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  chunk_text text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    document_embeddings.id,
    document_embeddings.chunk_text,
    1 - (document_embeddings.embedding <=> query_embedding) as similarity
  FROM document_embeddings
  WHERE 1 - (document_embeddings.embedding <=> query_embedding) > match_threshold
  ORDER BY document_embeddings.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

**Embedding Generation:**
```typescript
async function generateEmbeddings(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ 
    model: 'text-embedding-004' 
  });
  
  const result = await model.embedContent(text);
  return result.embedding.values;
}

// Use in deck generation
const context = await retrieveContext('successful Series A deck');
const prompt = `
Context from successful decks:
${context.map(c => c.chunk_text).join('\n\n')}

Now generate: ${userInput}
`;
```

**Time:** 10 hours  
**Owner:** AI Specialist

---

### Day 14: Function Calling Implementation

**Tasks:**
- [ ] Define function schemas
- [ ] Implement function handlers
- [ ] Add to relevant agents
- [ ] Test function calling
- [ ] Document usage

**Example:**
```typescript
const functions = {
  createTask: {
    name: 'createTask',
    description: 'Create a follow-up task',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        dueDate: { type: 'string' },
        priority: { type: 'string', enum: ['low', 'medium', 'high'] }
      },
      required: ['title', 'dueDate']
    }
  },
  getContactInfo: {
    name: 'getContactInfo',
    description: 'Retrieve contact details from CRM',
    parameters: {
      type: 'object',
      properties: {
        contactId: { type: 'string' }
      },
      required: ['contactId']
    }
  }
};

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  tools: [{ functionDeclarations: Object.values(functions) }]
});

const chat = model.startChat();
const result = await chat.sendMessage(
  "I just talked to Jane Doe from Acme Corp. She wants a proposal by next Tuesday."
);

// Gemini calls: createTask({ title: "Send proposal to Jane", dueDate: "2026-01-14", priority: "high" })
```

**Time:** 8 hours  
**Owner:** AI Specialist

---

### Day 15: Code Execution for Financial Projections

**Tasks:**
- [ ] Implement code execution agent
- [ ] Add to financial modeling
- [ ] Create projection calculator
- [ ] Add chart generation
- [ ] Test with various scenarios

**Example:**
```typescript
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
  tools: [{ codeExecution: {} }]
});

const prompt = `
Calculate 5-year ARR projection:
- Starting ARR: $${data.currentARR}
- Monthly growth: ${data.growthRate}%
- Churn: ${data.churnRate}%

Generate Python code to calculate and return JSON.
`;

const result = await model.generateContent(prompt);
// Returns: { years: [1,2,3,4,5], arr: [100, 180, 324, 583, 1049] }
```

**Time:** 8 hours  
**Owner:** AI Specialist

---

## 📅 Week 4: Polish & Production (Jan 13-17, 2026)

### Day 16: PDF/PPTX Export

**Tasks:**
- [ ] Install export libraries
- [ ] Implement PDF generation
- [ ] Implement PPTX generation
- [ ] Add export endpoint
- [ ] Update editor UI
- [ ] Test exports

**Implementation:**
```typescript
// Export endpoint
app.post('/export-deck', async (c) => {
  const { deckId, format } = await c.req.json();
  
  const { data: deck } = await supabase
    .from('decks')
    .select('*, slides(*)')
    .eq('id', deckId)
    .single();
  
  let fileBuffer: Uint8Array;
  
  if (format === 'pdf') {
    fileBuffer = await exportToPDF(deck.slides, deck.theme_config);
  } else if (format === 'pptx') {
    fileBuffer = await exportToPPTX(deck.slides, deck.theme_config);
  }
  
  // Upload to storage
  const path = `exports/${user.id}/${deckId}/${deck.title}.${format}`;
  await supabase.storage
    .from('deck-exports')
    .upload(path, fileBuffer);
  
  // Get signed URL
  const { data } = await supabase.storage
    .from('deck-exports')
    .createSignedUrl(path, 3600);
  
  return c.json({ url: data.signedUrl });
});
```

**Time:** 8 hours  
**Owner:** Frontend Developer

---

### Day 17: Cost Tracking & Budget Management

**Tasks:**
- [ ] Create ai_runs table
- [ ] Implement cost logging
- [ ] Build usage dashboard
- [ ] Add budget alerts
- [ ] Create cost projections

**Dashboard:**
```typescript
// Usage dashboard
const { data: usage } = await supabase
  .from('ai_runs')
  .select('*')
  .eq('org_id', orgId)
  .gte('created_at', startOfMonth)
  .lte('created_at', endOfMonth);

const stats = {
  totalCost: usage.reduce((sum, r) => sum + r.cost_estimate, 0),
  totalCalls: usage.length,
  byAgent: groupBy(usage, 'agent'),
  byModel: groupBy(usage, 'model'),
  projection: calculateMonthlyProjection(usage)
};

// Alert if over budget
if (stats.totalCost > BUDGET_THRESHOLD) {
  await sendAlert({
    type: 'budget_exceeded',
    current: stats.totalCost,
    limit: BUDGET_THRESHOLD
  });
}
```

**Time:** 6 hours  
**Owner:** Backend Developer

---

### Day 18: Performance Optimization

**Tasks:**
- [ ] Implement response caching
- [ ] Add request batching
- [ ] Optimize database queries
- [ ] Add lazy loading
- [ ] Compress assets

**Optimizations:**
```typescript
// Cache AI responses
const cacheKey = `lead-score:${contactId}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

const result = await scoreContact(contactId);
await redis.setex(cacheKey, 3600, JSON.stringify(result));

// Batch requests
const scores = await Promise.all(
  contactIds.map(id => scoreContact(id))
);

// Optimize queries
const { data } = await supabase
  .from('decks')
  .select('id, title, status, created_at') // Only needed fields
  .order('created_at', { ascending: false })
  .limit(10);
```

**Time:** 8 hours  
**Owner:** Full Team

---

### Day 19: Comprehensive Testing

**Tasks:**
- [ ] E2E test suite
- [ ] Load testing
- [ ] Security testing
- [ ] Accessibility testing
- [ ] Cross-browser testing

**Test Coverage:**
```markdown
## E2E Tests
✓ User registration & login
✓ Deck creation flow (wizard → generate → edit)
✓ CRM contact management (add → score → email)
✓ AI insights (analysis → recommendations)
✓ GTM strategy (form → generate → export)
✓ Export functionality (PDF/PPTX)

## Load Tests
✓ 100 concurrent deck generations
✓ 1000 lead scoring requests
✓ Database connection pooling
✓ API rate limiting

## Security Tests
✓ JWT authentication
✓ RLS policies
✓ SQL injection prevention
✓ XSS prevention
✓ CSRF protection
```

**Time:** 8 hours  
**Owner:** Full Team

---

### Day 20: Documentation & Launch Prep

**Tasks:**
- [ ] Update API documentation
- [ ] Write user guides
- [ ] Create video tutorials
- [ ] Prepare launch checklist
- [ ] Final review

**Documentation:**
```markdown
## API Documentation
- Authentication
- Agent endpoints
- Request/response formats
- Error codes
- Rate limits

## User Guides
- Getting started
- Creating your first deck
- CRM workflows
- AI features overview
- Best practices

## Video Tutorials
- 2-min product overview
- 5-min deck creation
- 10-min CRM deep dive
```

**Launch Checklist:**
```markdown
✅ All features tested
✅ Database migration run
✅ Edge functions deployed
✅ API keys configured
✅ Monitoring enabled
✅ Backup systems active
✅ Documentation complete
✅ Support ready
```

**Time:** 8 hours  
**Owner:** Full Team

---

## 📊 Success Metrics

### Performance Targets
- Deck generation: <60s (95th percentile)
- Lead scoring: <3s (95th percentile)
- Email generation: <5s (95th percentile)
- Page load: <2s (median)
- API uptime: >99.5%

### Quality Targets
- Test coverage: >80%
- Deck quality score: >75/100 average
- Lead score accuracy: >70% correlation with closes
- User satisfaction: >4.5/5

### Business Targets
- AI cost per active user: <$10/month
- Feature adoption: >60% for AI features
- User retention: >80% month-over-month
- Support tickets: <5% of users

---

## 🎯 Launch Readiness

### Pre-Launch Checklist

**Infrastructure:**
- [ ] Database migration executed
- [ ] Edge functions deployed (production)
- [ ] Environment variables set
- [ ] Monitoring configured
- [ ] Backup systems tested

**Features:**
- [ ] Deck generation (E2E tested)
- [ ] Lead scoring (automated)
- [ ] Email writer (functional)
- [ ] GTM strategy (tested)
- [ ] Research agent (working)
- [ ] Automation (triggered correctly)

**Quality:**
- [ ] All E2E tests passing
- [ ] No critical bugs
- [ ] Performance targets met
- [ ] Security review complete
- [ ] Accessibility audit done

**Documentation:**
- [ ] API docs complete
- [ ] User guides published
- [ ] Video tutorials ready
- [ ] Support team trained

**Business:**
- [ ] Pricing finalized
- [ ] Terms of service ready
- [ ] Privacy policy published
- [ ] Support system ready

---

## 🚀 Post-Launch Roadmap (Months 2-3)

### Month 2: Advanced AI Features
- [ ] Gemini Thinking for strategic analysis
- [ ] Google Maps integration for geo-targeting
- [ ] Advanced RAG with multi-document context
- [ ] Voice input for mobile
- [ ] AI-powered slide design suggestions

### Month 3: Collaboration & Scaling
- [ ] Real-time collaboration (multiplayer editing)
- [ ] Team workspaces
- [ ] Advanced automation workflows
- [ ] Custom AI agent training
- [ ] White-label options

---

## 💰 Budget Breakdown

### Development Costs
- Week 1: $8,000 (core integration)
- Week 2: $10,000 (advanced features)
- Week 3: $12,000 (automation + RAG)
- Week 4: $8,000 (polish + testing)
**Total:** $38,000

### Ongoing Costs (Monthly)
- AI API costs: $500-2,000 (scales with usage)
- Supabase hosting: $25-100
- CDN/Storage: $50
- Monitoring: $50
**Total:** $625-2,200/month

### Revenue Projections
- Users: 100 (Month 1) → 500 (Month 3)
- ARPU: $20/month
- MRR: $2,000 (Month 1) → $10,000 (Month 3)
- Break-even: Month 2

---

**Status:** Roadmap Complete ✅  
**Ready for:** Implementation kickoff  
**Next Steps:** Assign tasks & start Week 1
