
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MailingListEntry } from '@/types/mailingList';
import { exportMailingListToCSV, exportMailingListToJSON, exportMailingListToTXT } from '@/lib/api';
import { Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MailingListTableProps {
  entries: MailingListEntry[];
  loading: boolean;
}

const MailingListTable: React.FC<MailingListTableProps> = ({ entries, loading }) => {
  // Function to trigger file download
  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExport = (format: 'csv' | 'json' | 'txt') => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    try {
      switch (format) {
        case 'csv':
          downloadFile(
            exportMailingListToCSV(entries),
            `mailing-list-${timestamp}.csv`,
            'text/csv'
          );
          break;
        case 'json':
          downloadFile(
            exportMailingListToJSON(entries),
            `mailing-list-${timestamp}.json`,
            'application/json'
          );
          break;
        case 'txt':
          downloadFile(
            exportMailingListToTXT(entries),
            `mailing-list-${timestamp}.txt`,
            'text/plain'
          );
          break;
      }
    } catch (error) {
      console.error('Export error:', error);
    }
  };

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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-gradient-event">
          Mailing List ({entries.length})
        </CardTitle>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport('csv')}>
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('json')}>
              Export as JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('txt')}>
              Export as Text
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
