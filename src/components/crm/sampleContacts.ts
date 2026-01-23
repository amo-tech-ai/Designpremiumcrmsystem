// Sample contact data for demo purposes
export const sampleContacts = [
  {
    first_name: 'Sofia',
    last_name: 'Ramirez',
    email: 'sofia@ecotechlabs.io',
    phone: '+1 (310) 555-1843',
    title: 'Head of Growth',
    account_name: 'EcoTech Labs',
    linkedin_url: 'https://linkedin.com/in/sofiaramirez',
    tags: ['Investor', 'High Priority', 'Warm Lead', 'Sustainability'],
    overall_score: 92,
    last_interaction_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    notes: 'Investor is evaluating climate-tech opportunities. Interested in pilots with startups that have strong traction.'
  },
  {
    first_name: 'Marcus',
    last_name: 'Chen',
    email: 'marcus.chen@techventures.com',
    phone: '+1 (415) 555-2901',
    title: 'Senior Partner',
    account_name: 'TechVentures Capital',
    linkedin_url: 'https://linkedin.com/in/marcuschen',
    tags: ['Investor', 'VC', 'Series A'],
    overall_score: 88,
    last_interaction_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    notes: 'Focused on B2B SaaS and fintech. Looking for strong unit economics.'
  },
  {
    first_name: 'Priya',
    last_name: 'Patel',
    email: 'priya@nextstep.ai',
    phone: '+1 (650) 555-7832',
    title: 'CEO & Founder',
    account_name: 'NextStep AI',
    linkedin_url: 'https://linkedin.com/in/priyapatel',
    tags: ['Founder', 'AI/ML', 'Partnership'],
    overall_score: 76,
    last_interaction_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    notes: 'Building enterprise AI solutions. Interested in co-marketing opportunities.'
  },
  {
    first_name: 'James',
    last_name: 'Rodriguez',
    email: 'j.rodriguez@innovatecorp.com',
    phone: '+1 (408) 555-4521',
    title: 'VP of Innovation',
    account_name: 'InnovateCorp',
    linkedin_url: 'https://linkedin.com/in/jamesrodriguez',
    tags: ['Enterprise', 'Sales Lead', 'Hot'],
    overall_score: 94,
    last_interaction_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    notes: 'Looking to pilot new solutions for Q1. Budget approved. Decision maker.'
  },
  {
    first_name: 'Aisha',
    last_name: 'Mohammed',
    email: 'aisha@globalimpact.org',
    phone: '+1 (212) 555-9087',
    title: 'Director of Programs',
    account_name: 'Global Impact Fund',
    linkedin_url: 'https://linkedin.com/in/aishamohammed',
    tags: ['Impact Investor', 'Sustainability', 'Warm Lead'],
    overall_score: 81,
    last_interaction_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    notes: 'Focus on social impact and sustainability. Evaluating early-stage opportunities.'
  },
  {
    first_name: 'David',
    last_name: 'Kim',
    email: 'david.kim@startuphub.io',
    phone: '+1 (617) 555-3421',
    title: 'Managing Director',
    account_name: 'Startup Hub Accelerator',
    linkedin_url: 'https://linkedin.com/in/davidkim',
    tags: ['Accelerator', 'Mentor', 'Network'],
    overall_score: 72,
    last_interaction_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
    notes: 'Runs top-tier accelerator program. Great for intros and partnerships.'
  },
  {
    first_name: 'Emily',
    last_name: 'Thompson',
    email: 'emily@futuretech.vc',
    phone: '+1 (512) 555-6754',
    title: 'Principal',
    account_name: 'FutureTech Ventures',
    linkedin_url: 'https://linkedin.com/in/emilythompson',
    tags: ['Investor', 'Seed Stage', 'Tech'],
    overall_score: 85,
    last_interaction_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    notes: 'Seed-stage investor. Strong network in SaaS and developer tools.'
  },
  {
    first_name: 'Carlos',
    last_name: 'Santos',
    email: 'carlos.santos@latamventures.com',
    phone: '+55 11 9555-8821',
    title: 'Investment Manager',
    account_name: 'LatAm Ventures',
    linkedin_url: 'https://linkedin.com/in/carlossantos',
    tags: ['Investor', 'International', 'LatAm'],
    overall_score: 68,
    last_interaction_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks ago
    notes: 'Focused on Latin American expansion. Looking for companies ready to scale internationally.'
  },
  {
    first_name: 'Nina',
    last_name: 'Larsen',
    email: 'nina@nordicangels.com',
    phone: '+47 555 12345',
    title: 'Angel Investor',
    account_name: 'Nordic Angels Network',
    linkedin_url: 'https://linkedin.com/in/ninalarsen',
    tags: ['Angel', 'Europe', 'Climate Tech'],
    overall_score: 79,
    last_interaction_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    notes: 'Active angel in climate tech and clean energy. Well-connected in Nordic ecosystem.'
  },
  {
    first_name: 'Ryan',
    last_name: 'Park',
    email: 'ryan@techcorp.com',
    phone: '+1 (206) 555-9912',
    title: 'Head of Business Development',
    account_name: 'TechCorp Solutions',
    linkedin_url: 'https://linkedin.com/in/ryanpark',
    tags: ['Sales Lead', 'Enterprise', 'Partnership'],
    overall_score: 73,
    last_interaction_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    notes: 'Exploring strategic partnerships. Mid-market enterprise with growth mindset.'
  },
  {
    first_name: 'Fatima',
    last_name: 'Al-Rashid',
    email: 'fatima@menatechfund.com',
    phone: '+971 4 555 7788',
    title: 'Investment Director',
    account_name: 'MENA Tech Fund',
    linkedin_url: 'https://linkedin.com/in/fatimaalrashid',
    tags: ['Investor', 'MENA', 'Growth Stage'],
    overall_score: 82,
    last_interaction_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    notes: 'Growth-stage investor focused on Middle East expansion. Strong corporate connections.'
  },
  {
    first_name: 'Alex',
    last_name: 'Johnson',
    email: 'alex@founderfirst.io',
    phone: '+1 (303) 555-4433',
    title: 'General Partner',
    account_name: 'Founder First Capital',
    linkedin_url: 'https://linkedin.com/in/alexjohnson',
    tags: ['Investor', 'Pre-Seed', 'Founder-Friendly'],
    overall_score: 90,
    last_interaction_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    notes: 'Pre-seed specialist. Very founder-friendly terms. Quick decision-making process.'
  },
  {
    first_name: 'Sarah',
    last_name: 'Williams',
    email: 'sarah.williams@techgrowth.com',
    phone: '+1 (617) 555-8392',
    title: 'Chief Marketing Officer',
    account_name: 'TechGrowth Media',
    linkedin_url: 'https://linkedin.com/in/sarahwilliams',
    tags: ['Sales Lead', 'Marketing', 'Medium Priority'],
    overall_score: 67,
    last_interaction_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    notes: 'Evaluating marketing automation solutions. Currently using legacy system.'
  },
  {
    first_name: 'Michael',
    last_name: 'O\'Brien',
    email: 'mobrien@atlanticvc.com',
    phone: '+353 1 555 4567',
    title: 'Partner',
    account_name: 'Atlantic Venture Capital',
    linkedin_url: 'https://linkedin.com/in/michaelobrien',
    tags: ['Investor', 'Europe', 'Series B'],
    overall_score: 86,
    last_interaction_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
    notes: 'Series B specialist. Looking for proven business models with European expansion potential.'
  },
  {
    first_name: 'Lisa',
    last_name: 'Nguyen',
    email: 'lisa@cloudscale.io',
    phone: '+1 (408) 555-2234',
    title: 'VP of Product',
    account_name: 'CloudScale Technologies',
    linkedin_url: 'https://linkedin.com/in/lisanguyen',
    tags: ['Sales Lead', 'Enterprise', 'Tech'],
    overall_score: 78,
    last_interaction_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    notes: 'Interested in integration partnerships. Looking for API-first solutions.'
  },
  {
    first_name: 'Mohammed',
    last_name: 'Hassan',
    email: 'mohammed@desertangels.ae',
    phone: '+971 50 555 9988',
    title: 'Angel Investor',
    account_name: 'Desert Angels',
    linkedin_url: 'https://linkedin.com/in/mohammedhassan',
    tags: ['Angel', 'MENA', 'E-commerce'],
    overall_score: 71,
    last_interaction_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(), // 11 days ago
    notes: 'Active in e-commerce and marketplace startups. Strong connections in Gulf region.'
  },
  {
    first_name: 'Jennifer',
    last_name: 'Martinez',
    email: 'jmartinez@globalreach.com',
    phone: '+1 (305) 555-7766',
    title: 'Director of Partnerships',
    account_name: 'GlobalReach Inc',
    linkedin_url: 'https://linkedin.com/in/jennifermartinez',
    tags: ['Partnership', 'Sales Lead', 'Distribution'],
    overall_score: 84,
    last_interaction_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    notes: 'Looking for channel partnership opportunities. Large distribution network in Latin America.'
  },
  {
    first_name: 'Kenji',
    last_name: 'Tanaka',
    email: 'kenji@tokyoventures.jp',
    phone: '+81 3 5555 1234',
    title: 'Investment Associate',
    account_name: 'Tokyo Ventures',
    linkedin_url: 'https://linkedin.com/in/kenjitanaka',
    tags: ['Investor', 'Asia', 'Early Stage'],
    overall_score: 69,
    last_interaction_at: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(), // 16 days ago
    notes: 'Focused on Japan market entry. Looking for startups with localization readiness.'
  },
  {
    first_name: 'Amanda',
    last_name: 'Foster',
    email: 'amanda@healthtechfund.com',
    phone: '+1 (415) 555-3344',
    title: 'Managing Partner',
    account_name: 'HealthTech Ventures',
    linkedin_url: 'https://linkedin.com/in/amandafoster',
    tags: ['Investor', 'Healthcare', 'Series A'],
    overall_score: 91,
    last_interaction_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 36 hours ago
    notes: 'Healthcare and digital health focus. Looking for regulatory-compliant solutions with clinical validation.'
  },
  {
    first_name: 'Robert',
    last_name: 'Anderson',
    email: 'randerson@corporatevc.com',
    phone: '+1 (212) 555-6677',
    title: 'Corporate Venture Capital Director',
    account_name: 'Fortune 500 Corp',
    linkedin_url: 'https://linkedin.com/in/robertanderson',
    tags: ['Corporate VC', 'Strategic', 'Late Stage'],
    overall_score: 87,
    last_interaction_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 hours ago
    notes: 'Corporate venture arm. Looking for strategic investments that align with core business.'
  },
  {
    first_name: 'Yuki',
    last_name: 'Sato',
    email: 'yuki@asiagrowth.sg',
    phone: '+65 6555 8899',
    title: 'Principal',
    account_name: 'Asia Growth Partners',
    linkedin_url: 'https://linkedin.com/in/yukisato',
    tags: ['Investor', 'Asia', 'Growth Stage'],
    overall_score: 75,
    last_interaction_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(), // 13 days ago
    notes: 'Growth-stage investor focused on Southeast Asia expansion. Strong portfolio of regional winners.'
  },
  {
    first_name: 'Daniel',
    last_name: 'Brown',
    email: 'dbrown@enterprisesales.com',
    phone: '+1 (646) 555-4455',
    title: 'Head of Procurement',
    account_name: 'Enterprise Solutions Ltd',
    linkedin_url: 'https://linkedin.com/in/danielbrown',
    tags: ['Sales Lead', 'Enterprise', 'Procurement'],
    overall_score: 80,
    last_interaction_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    notes: 'Evaluating vendors for enterprise software. Long sales cycle but high contract value.'
  },
  {
    first_name: 'Isabella',
    last_name: 'Rossi',
    email: 'isabella@europeangrowth.it',
    phone: '+39 02 555 7788',
    title: 'Investment Manager',
    account_name: 'European Growth Fund',
    linkedin_url: 'https://linkedin.com/in/isabellarossi',
    tags: ['Investor', 'Europe', 'Fintech'],
    overall_score: 83,
    last_interaction_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    notes: 'Fintech specialist. Looking for EU-compliant solutions with proven traction.'
  },
  {
    first_name: 'Thomas',
    last_name: 'Weber',
    email: 'thomas@germancapital.de',
    phone: '+49 30 555 9900',
    title: 'Senior Associate',
    account_name: 'German Innovation Capital',
    linkedin_url: 'https://linkedin.com/in/thomasweber',
    tags: ['Investor', 'Europe', 'Deep Tech'],
    overall_score: 74,
    last_interaction_at: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(), // 19 days ago
    notes: 'Deep tech and B2B SaaS focus. Values technical excellence and IP.'
  }
];

export async function seedSampleContacts(supabase: any) {
  try {
    // Check if contacts already exist
    const { data: existingContacts, error: checkError } = await supabase
      .from('crm_contacts')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking existing contacts:', checkError);
      return { success: false, error: checkError };
    }

    // Only seed if no contacts exist
    if (existingContacts && existingContacts.length > 0) {
      console.log('Contacts already exist, skipping seed');
      return { success: true, skipped: true };
    }

    // Get or create startup_id
    let startupId = null;
    
    // Try to get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    
    // If no user (dev mode), try to find any startup or create a demo one
    if (!user) {
      console.log('No authenticated user (Dev Mode) - creating demo startup');
      
      // Try to find existing demo startup
      const { data: existingStartup } = await supabase
        .from('startups')
        .select('id')
        .eq('name', 'Demo Startup')
        .single();
      
      if (existingStartup) {
        startupId = existingStartup.id;
      } else {
        // Create a demo startup without user_id for dev mode
        const { data: demoStartup, error: demoError } = await supabase
          .from('startups')
          .insert({
            name: 'Demo Startup',
            tagline: 'AI-powered startup operating system',
            industry: 'Technology',
            stage: 'Pre-Seed'
          })
          .select()
          .single();
        
        if (demoError) {
          console.error('Error creating demo startup:', demoError);
          // In dev mode, continue without startup_id - contacts might still work
          console.log('Continuing without startup_id in dev mode');
        } else {
          startupId = demoStartup.id;
        }
      }
    } else {
      // User is authenticated - normal flow
      // Try to find startup
      const { data: startup } = await supabase
        .from('startups')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (startup) {
        startupId = startup.id;
      } else {
        // Create a default startup for the user
        const { data: newStartup, error: startupError } = await supabase
          .from('startups')
          .insert({
            user_id: user.id,
            name: 'My Startup',
            tagline: 'Add your tagline',
            industry: 'Technology',
            stage: 'Pre-Seed'
          })
          .select()
          .single();
        
        if (startupError) {
          console.error('Error creating startup:', startupError);
          return { success: false, error: startupError };
        }
        
        startupId = newStartup.id;
      }
    }

    // Prepare contacts with startup_id if available
    const contactsWithStartup = startupId 
      ? sampleContacts.map(contact => ({
          ...contact,
          startup_id: startupId
        }))
      : sampleContacts; // In dev mode without startup, use contacts as-is

    // Insert sample contacts
    const { data, error } = await supabase
      .from('crm_contacts')
      .insert(contactsWithStartup)
      .select();

    if (error) {
      console.error('Error seeding contacts:', error);
      return { success: false, error };
    }

    console.log(`Successfully seeded ${data?.length || 0} sample contacts`);
    return { success: true, count: data?.length || 0 };
  } catch (err) {
    console.error('Unexpected error seeding contacts:', err);
    return { success: false, error: err };
  }
}