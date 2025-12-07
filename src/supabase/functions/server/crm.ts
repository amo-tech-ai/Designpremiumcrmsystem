import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

export const seedCRM = async (c: any) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) return c.json({ error: "Unauthorized" }, 401);
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) return c.json({ error: "Unauthorized" }, 401);

    // Get Startup ID
    const { data: startup } = await supabase
      .from('startups')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!startup) {
      return c.json({ error: "No startup profile found. Please complete onboarding first." }, 400);
    }
    const startupId = startup.id;

    // Check if data exists (check contacts count)
    const { count } = await supabase
      .from('crm_contacts')
      .select('*', { count: 'exact', head: true })
      .eq('startup_id', startupId);

    if (count && count > 0) {
        return c.json({ message: 'Already seeded', success: true });
    }

    // 1. Create Contacts & Accounts
    // We'll insert accounts first to get IDs, or just insert contacts with account names if we don't care about normalization yet.
    // The schema has crm_accounts. Let's do it properly-ish.
    
    // Define sample accounts
    const accountNames = ['TechFlow AI', 'Nexus Corp', 'GreenEnergy Systems', 'Quantum Leap', 'Stark Industries', 'Wayne Enterprises', 'Sequoia Capital', 'Y Combinator'];
    const accountMap: Record<string, string> = {};

    for (const name of accountNames) {
        const { data: acc } = await supabase.from('crm_accounts').insert({
            startup_id: startupId,
            name: name,
            status: 'Active',
            segment: 'Enterprise'
        }).select('id').single();
        if (acc) accountMap[name] = acc.id;
    }

    const contacts = [
      {
        first_name: 'Sarah',
        last_name: 'Chen',
        email: 'sarah@techflow.ai',
        title: 'CTO',
        account_name: 'TechFlow AI',
        role: 'Decision Maker',
        linkedin_url: 'linkedin.com/in/sarahchen'
      },
      {
        first_name: 'Michael',
        last_name: 'Ross',
        email: 'mike@nexus.com',
        title: 'VP of Engineering',
        account_name: 'Nexus Corp',
        role: 'Influencer',
        linkedin_url: 'linkedin.com/in/mross'
      },
      {
        first_name: 'Jessica',
        last_name: 'Alba',
        email: 'jessica@greenenergy.io',
        title: 'Head of Product',
        account_name: 'GreenEnergy Systems',
        role: 'Champion',
        linkedin_url: 'linkedin.com/in/jalba'
      },
      {
        first_name: 'David',
        last_name: 'Kim',
        email: 'david@quantum.tech',
        title: 'Research Director',
        account_name: 'Quantum Leap',
        role: 'Researcher',
        linkedin_url: 'linkedin.com/in/dkim'
      },
      {
        first_name: 'Emily',
        last_name: 'Weiss',
        email: 'emily@techflow.ai',
        title: 'Product Manager',
        account_name: 'TechFlow AI',
        role: 'User',
        linkedin_url: 'linkedin.com/in/eweiss'
      }
    ];

    for (const cData of contacts) {
       const accountId = accountMap[cData.account_name];
       await supabase.from('crm_contacts').insert({
         startup_id: startupId,
         account_id: accountId,
         first_name: cData.first_name,
         last_name: cData.last_name,
         email: cData.email,
         title: cData.title,
         role: cData.role,
         linkedin_url: cData.linkedin_url
       });
    }

    // 2. Create Deals
    const deals = [
      {
        name: 'Skynet Systems Enterprise License',
        amount: 120000,
        stage: 'Qualified',
        probability: 20,
        expected_close: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
        account_name: 'Skynet Systems', // We missed creating this account above, let's just skip account linking for demo or mapped if exists
        sector: 'Sales'
      },
      {
        name: 'Wayne Enterprises Security Suite',
        amount: 450000,
        stage: 'Proposal',
        probability: 40,
        expected_close: new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
        account_name: 'Wayne Enterprises',
        sector: 'Sales'
      },
      {
        name: 'Stark Industries Arc Reactor Control',
        amount: 1000000,
        stage: 'Negotiation',
        probability: 70,
        expected_close: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        account_name: 'Stark Industries',
        sector: 'Sales'
      },
      {
        name: 'Sequoia Capital Series A',
        amount: 2000000,
        stage: 'Lead',
        probability: 50,
        expected_close: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
        account_name: 'Sequoia Capital',
        sector: 'Fundraising'
      },
      {
        name: 'Y Combinator W24',
        amount: 500000,
        stage: 'Closed Won',
        probability: 90,
        expected_close: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
        account_name: 'Y Combinator',
        sector: 'Fundraising'
      }
    ];

    for (const dData of deals) {
       const accountId = accountMap[dData.account_name];
       await supabase.from('crm_deals').insert({
         startup_id: startupId,
         account_id: accountId,
         name: dData.name,
         amount: dData.amount,
         stage: dData.stage,
         probability: dData.probability,
         expected_close: dData.expected_close,
         sector: dData.sector,
         owner_id: user.id
       });
    }

    return c.json({ success: true, message: 'Sample CRM data (Contacts & Deals) seeded (Postgres)!' });
  } catch (err: any) {
    console.error('Seeding error:', err);
    return c.json({ success: false, error: err.message }, 500);
  }
};
