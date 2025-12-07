import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const SERVER_URL = `${supabaseUrl}/functions/v1/make-server-6522a742`;

export const seedCRMData = async () => {
  try {
    toast.loading('Checking and seeding sample CRM data...');

    const response = await fetch(`${SERVER_URL}/seed-crm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to seed data');
    }

    toast.dismiss();
    
    if (data.message === 'Already seeded') {
       return true;
    }
    
    toast.success('Sample CRM data seeded!');
    return true;

  } catch (err: any) {
    console.error('Seeding error:', err);
    toast.dismiss();
    toast.error('Failed to seed data: ' + err.message);
    return false;
  }
};
