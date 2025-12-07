import { createClient } from "npm:@supabase/supabase-js@2";

export const seedCRM = async (c: any) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    // Check if data exists
    const { count, error: countError } = await supabase
      .from('crm_contacts')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;
    if (count !== null && count > 0) {
        return c.json({ message: 'Already seeded', success: true });
    }

    // 1. Create Accounts
    const accounts = [
      { name: 'TechFlow AI', domain: 'techflow.ai' },
      { name: 'Nexus Corp', domain: 'nexus.com' },
      { name: 'GreenEnergy Systems', domain: 'greenenergy.io' },
      { name: 'Quantum Leap', domain: 'quantum.tech' },
    ];

    const { data: createdAccounts, error: accountsError } = await supabase
      .from('crm_accounts')
      .insert(accounts)
      .select();

    if (accountsError) throw accountsError;

    // 2. Create Contacts
    const contacts = [
      {
        first_name: 'Sarah',
        last_name: 'Chen',
        email: 'sarah@techflow.ai',
        title: 'CTO',
        account_id: createdAccounts[0].id,
        tags: ['Decision Maker', 'Technical'],
        linkedin_url: 'linkedin.com/in/sarahchen',
        created_at: new Date(Date.now() - 2 * 86400000).toISOString()
      },
      {
        first_name: 'Michael',
        last_name: 'Ross',
        email: 'mike@nexus.com',
        title: 'VP of Engineering',
        account_id: createdAccounts[1].id,
        tags: ['Influencer'],
        linkedin_url: 'linkedin.com/in/mross',
        created_at: new Date(Date.now() - 5 * 86400000).toISOString()
      },
      {
        first_name: 'Jessica',
        last_name: 'Alba',
        email: 'jessica@greenenergy.io',
        title: 'Head of Product',
        account_id: createdAccounts[2].id,
        tags: ['Champion', 'Green Tech'],
        linkedin_url: 'linkedin.com/in/jalba',
        created_at: new Date(Date.now() - 1 * 86400000).toISOString()
      },
      {
        first_name: 'David',
        last_name: 'Kim',
        email: 'david@quantum.tech',
        title: 'Research Director',
        account_id: createdAccounts[3].id,
        tags: ['Researcher'],
        linkedin_url: 'linkedin.com/in/dkim',
        created_at: new Date(Date.now() - 10 * 86400000).toISOString()
      },
      {
        first_name: 'Emily',
        last_name: 'Weiss',
        email: 'emily@techflow.ai',
        title: 'Product Manager',
        account_id: createdAccounts[0].id,
        tags: ['User'],
        linkedin_url: 'linkedin.com/in/eweiss',
        created_at: new Date(Date.now() - 3 * 86400000).toISOString()
      }
    ];

    const { data: createdContacts, error: contactsError } = await supabase
      .from('crm_contacts')
      .insert(contacts)
      .select();

    if (contactsError) throw contactsError;

    // 3. Create Scores & Enrichment
    const scores = [];
    const enrichments = [];
    const interactions = [];

    for (const contact of createdContacts) {
      // Score
      scores.push({
        lead_id: contact.id,
        overall_score: Math.floor(Math.random() * 40) + 60, // 60-100
        industry_fit: Math.floor(Math.random() * 20) + 80,
        company_size_fit: Math.floor(Math.random() * 20) + 80,
        budget_fit: Math.floor(Math.random() * 20) + 80,
        risk_score: Math.floor(Math.random() * 20),
        match_reason: 'Strong alignment with ICP based on role and industry.',
        recommended_next_actions: ['Schedule Intro Call', 'Send Case Study']
      });

      // Enrichment
      enrichments.push({
        lead_id: contact.id,
        recent_news: [
          { title: 'Series B Funding Announced', url: '#', date: '2023-10-15' },
          { title: 'New Product Launch', url: '#', date: '2023-11-01' }
        ],
        funding_history: [
          { round: 'Series A', amount: '$10M', date: '2022-05-01' },
          { round: 'Seed', amount: '$2M', date: '2021-01-15' }
        ],
        hiring_trends: { engineering: '+15%', sales: '+5%' },
        gemini_summary: `Key decision maker at ${contact.account_id}. Recently active on LinkedIn regarding AI infrastructure.`
      });

      // Interactions
      interactions.push({
        account_id: contact.account_id,
        contact_id: contact.id,
        type: 'email',
        content: `Sent introductory email to ${contact.first_name}`,
        occurred_at: new Date(Date.now() - Math.random() * 100000000).toISOString()
      });
      
      interactions.push({
         account_id: contact.account_id,
         contact_id: contact.id,
         type: 'linkedin',
         content: `Connected on LinkedIn`,
         occurred_at: new Date(Date.now() - Math.random() * 200000000).toISOString()
       });
    }

    await supabase.from('crm_lead_scores').insert(scores);
    await supabase.from('crm_lead_enrichment').insert(enrichments);
    await supabase.from('crm_interactions').insert(interactions);

    return c.json({ success: true, message: 'Sample CRM data seeded!' });
  } catch (err: any) {
    console.error('Seeding error:', err);
    return c.json({ success: false, error: err.message }, 500);
  }
};
