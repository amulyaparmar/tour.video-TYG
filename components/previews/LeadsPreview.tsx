import React, { useEffect, useState } from 'react';
import { User2, ArrowUpRight } from 'lucide-react';
import { formatRelativeTime } from '../../utils/dateUtils';
import { useMagnetStore } from '@/store/useMagnetStore';
import { supabase } from '@/utils/supabase';

interface Lead {
  name: string;
  email: string;
  status: string;
  timestamp: Date;
}

const leads: Lead[] = [
  { 
    name: 'Sarah Wilson', 
    email: 'sarah.w@example.com', 
    status: 'New',
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  { 
    name: 'Mike Johnson', 
    email: 'mike.j@example.com', 
    status: 'Contacted',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  { 
    name: 'Emma Davis', 
    email: 'emma.d@example.com', 
    status: 'New',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4) // 4 hours ago
  },
];

export function LeadsPreview() {
  const magnet = useMagnetStore((state) => state.magnet);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      if (!magnet?.uuid) return;
      
      try {
        const { data, error } = await supabase
          .from('Lead')
          .select(`
            name,
            email,
            time
          `)
          .order('time', { ascending: false })
          .eq('magnet_uuid', magnet.uuid)
          .limit(3);

        if (error) {
          console.error('Error fetching leads:', error);
          return;
        }

        setLeads(data.map(lead => ({
          name: lead.name,
          email: lead.email,
          status: 'New',
          timestamp: new Date(lead.time)
        })));
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchLeads();
  }, [magnet.uuid]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold">Recent Leads</h3>
        <button className="text-blue-500 hover:text-blue-600 p-1 rounded-lg hover:bg-blue-50 transition-colors">
          <ArrowUpRight size={18} />
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {leads.map((lead) => (
          <div key={lead.email} className="p-3 flex items-center hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <User2 size={16} className="text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium truncate">{lead.name}</p>
              </div>
              <p className="text-sm text-gray-500 truncate">{lead.email}</p>
            </div>
            <div className="ml-2 flex flex-col items-end space-y-1">
              <span className="text-xs text-gray-500">
                {formatRelativeTime(lead.timestamp)}
              </span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                lead.status === 'New' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {lead.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}