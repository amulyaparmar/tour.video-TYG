"use client"
import React, { useState, useEffect } from 'react';
import { Users, Phone, Mail, Calendar, ChevronDown, ChevronRight, Building } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import { useMagnetStore } from '@/store/useMagnetStore';

const LeadsTable = () => {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { magnet } = useMagnetStore();

  const filteredLeads = leads.filter((lead) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(searchLower) ||
      lead.email?.toLowerCase().includes(searchLower) ||
      lead.phone?.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    const fetchLeads = async () => {
      if (!magnet?.uuid) return;
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('Lead')
          .select(`
            id,
            name,
            email,
            phone,
            time,
            updated_at,
            magnet_uuid
          `)
          .order("updated_at", { ascending: false })
          .order("time", { ascending: false })
          .eq('magnet_uuid', magnet.uuid);

        if (error) {
          console.error('Error fetching leads:', error);
          return;
        }

        setLeads(data.map(lead => ({
          id: lead?.id,
          name: lead?.name,
          email: lead?.email,
          phone: lead?.phone || '(555) 000-0000',
          source: 'magnet',
          status: 'New',
          lastContact: new Date(lead?.time).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          nextAction: 'Initial contact pending'
        })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [magnet?.uuid]);

  const toggleRow = (id) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const getLeadSourceTag = (source) => {
    if (source === 'inbound') {
      return (
        <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-md">
          <span className="text-sm">↙</span>
          <span>Inbound</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 bg-orange-50 text-orange-700 px-3 py-1 rounded-md">
        <span className="text-sm">↗</span>
        <span>Outbound</span>
      </div>
    );
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'Active': 'bg-green-100 text-green-800',
      'New': 'bg-blue-100 text-blue-800',
      'Cold': 'bg-gray-100 text-gray-800',
      'Hot': 'bg-red-100 text-red-800'
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  const LoadingSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <tr key={i} className="animate-pulse">
          <td className="pl-4 sticky left-0 bg-white z-10">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap sticky left-8 bg-white z-10 relative">
            <div className="absolute right-0 top-0 h-full w-px bg-gray-200 z-20"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-48"></div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-5 bg-gray-200 rounded w-16"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 backdrop-blur-sm bg-white/70 border-b border-gray-200/50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Leads</h2>
          </div>
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xl font-medium bg-transparent focus:outline-none py-1 placeholder-gray-400 text-gray-600"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1024px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-8 sticky left-0 bg-gray-50 z-10"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-8 bg-gray-50 z-10 relative w-[300px]">
                <div className="absolute right-0 top-0 h-full w-px bg-gray-200 z-20"></div>
                Lead
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[200px]">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">Last Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              filteredLeads?.map((lead) => (
                <React.Fragment key={lead?.id}>
                  <tr 
                    className={`group hover:bg-gray-200/20 transition-colors cursor-pointer ${
                      expandedRows?.has(lead?.id) ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => toggleRow(lead?.id)}
                  >
                    <td className="pl-4 sticky left-0 bg-white group-hover:bg-gray-200/20 z-10">
                      {expandedRows?.has(lead?.id) ? 
                        <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap sticky left-8 bg-white group-hover:bg-gray-200/40 z-10 relative">
                      <div className="absolute right-0 top-0 h-full w-px bg-gray-200 z-20"></div>
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{lead?.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {lead?.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getLeadSourceTag(lead?.source)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        {lead?.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(lead?.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead?.lastContact}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead?.nextAction}
                    </td>
                  </tr>
                  {expandedRows?.has(lead?.id) && (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 bg-gray-50">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-900">Contact Details</h4>
                              <div className="mt-2 space-y-2 text-sm text-gray-600">
                                <p className="flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  {lead?.phone}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Mail className="w-4 h-4" />
                                  {lead?.email}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Notes</h4>
                              <p className="mt-2 text-sm text-gray-600">
                                Initial contact made. Interested in 2-3 bedroom units in downtown area.
                              </p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Communication History</h4>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>Last email sent on {lead?.lastContact}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;