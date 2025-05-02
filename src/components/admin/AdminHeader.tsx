
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { logoutAdmin } from '@/lib/api';
import { toast } from '@/components/ui/sonner';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      toast.success('Logged out successfully');
      navigate('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <header className="bg-black border-b border-event/30 py-4">
      <div className="container px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-event">BanditBoyzWorld Admin</h1>
        </div>
        <Button 
          variant="outline"
          onClick={handleLogout}
          className="border-event text-event hover:bg-event hover:text-black"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
