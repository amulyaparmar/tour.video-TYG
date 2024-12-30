import React from 'react';
import { Search, Filter, SortDesc, LayoutGrid, Table as TableIcon, MoreVertical } from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  dateCreated: string;
  lastUpdated: string;
  requesterName: string;
}

const tickets: Ticket[] = [
  {
    id: '1001',
    subject: 'Unable to login to account',
    status: 'Open',
    priority: 'High',
    dateCreated: '2024-12-08',
    lastUpdated: '2024-12-09',
    requesterName: 'John Doe'
  },
  {
    id: '1002',
    subject: 'Request for billing invoice',
    status: 'In Progress',
    priority: 'Medium',
    dateCreated: '2024-12-06',
    lastUpdated: '2024-12-09',
    requesterName: 'Jane Smith'
  },
  {
    id: '1003',
    subject: 'Request for billing invoice',
    status: 'Resolved',
    priority: 'Low',
    dateCreated: '2024-11-30',
    lastUpdated: '2024-12-07',
    requesterName: 'Michael Brown'
  },
  {
    id: '1004',
    subject: 'Request for billing invoice',
    status: 'Resolved',
    priority: 'Critical',
    dateCreated: '2024-12-09',
    lastUpdated: '2024-12-10',
    requesterName: 'Sarah Lee'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open':
      return 'text-red-500';
    case 'In Progress':
      return 'text-orange-500';
    case 'Resolved':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical':
      return 'text-red-500';
    case 'High':
      return 'text-orange-500';
    case 'Medium':
      return 'text-yellow-500';
    case 'Low':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};

export function TicketTable() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">Tickets</h2>
          <span className="bg-gray-200 px-2 py-0.5 rounded-full text-sm">48</span>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          + New
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <SortDesc size={18} />
            <span>Sort</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <LayoutGrid size={18} />
            <span>Group</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <TableIcon size={18} />
            <span>Table</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-8 px-4 py-3">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Subject</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Priority</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date Created</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Updated</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Requester Name</th>
              <th className="w-8 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-4 py-3 text-sm">{ticket.id}</td>
                <td className="px-4 py-3 text-sm">{ticket.subject}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{ticket.dateCreated}</td>
                <td className="px-4 py-3 text-sm">{ticket.lastUpdated}</td>
                <td className="px-4 py-3 text-sm">{ticket.requesterName}</td>
                <td className="px-4 py-3">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}