import React from 'react';
import { MessageSquare, ArrowUpRight, User, DoorOpen } from 'lucide-react';
import moment from 'moment';
import { useMagnetStore } from '@/store/useMagnetStore';

export function TourPreview() {
  const [tours, setTours] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { magnet } = useMagnetStore();
    
  React.useEffect(() => {
    if (magnet?.uuid) {
      const fetchTours = async () => {
        const query = `SELECT _timestamp,location_city,location_region,location_country,location_zip,magnet_uuid, visit_uuid, details_lead_uuid from \`default.events\` WHERE magnet_uuid="${magnet.uuid}" AND event_type="open_tour" ORDER BY _timestamp DESC LIMIT 3`;
        try {
          const response = await fetch('https://api.leasemagnets.com/run_sqlquery_inbigquery', {
            method: 'POST',
            headers: {
              'accept': 'application/json, text/plain, */*',
              'accept-language': 'en-US,en;q=0.9',
              'content-type': 'application/json',
            },
            body: JSON.stringify({ querystring: query }),
            mode: 'cors',
            credentials: 'omit'
          });
          const data = await response.json();
          setTours(data.res.map(tour => ({
            _timestamp: tour[0],
            location_city: tour[1],
            location_region: tour[2],
            location_country: tour[3],
            location_zip: tour[4],
            magnet_uuid: tour[5],
            visit_uuid: tour[6],
            details_lead_uuid: tour[7]
          })));
        } catch (error) {
          console.error('Error fetching tours:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTours();
    }
  }, [magnet?.uuid]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold">Recent Tours</h3>
        <button className="text-blue-500 hover:text-blue-600 p-1 rounded-lg hover:bg-blue-50 transition-colors">
          <ArrowUpRight size={18} />
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="p-3 flex items-center">
              <div className="w-8 h-8 rounded-full mr-3 bg-gray-200 animate-pulse" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse" />
              </div>
              <div className="w-12">
                <div className="h-3 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))
        ) : (
          tours?.map((tour) => (
            <div key={tour?._timestamp} className="p-3 flex items-center hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-blue-100">
                {tour?.details_lead_uuid ? (
                  <User size={16} className="text-blue-600" />
                ) : (
                  <MessageSquare size={16} className="text-blue-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {tour?.location_city}, {tour?.location_region}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {tour?.location_zip} • {tour?.location_country}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">
                  {moment(tour?._timestamp).fromNow()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 