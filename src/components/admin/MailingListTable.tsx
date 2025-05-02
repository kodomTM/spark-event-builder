
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MailingListEntry } from '@/types/mailingList';

interface MailingListTableProps {
  entries: MailingListEntry[];
  loading: boolean;
}

const MailingListTable: React.FC<MailingListTableProps> = ({ entries, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-event border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-center text-gray-500">No mailing list entries found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gradient-event">
          Mailing List ({entries.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-right hidden md:table-cell">Signup Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr 
                  key={entry.id} 
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-3">{entry.name}</td>
                  <td className="py-3 px-3">{entry.email}</td>
                  <td className="py-3 px-3 text-right hidden md:table-cell">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MailingListTable;
