import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'AI Auto-Pilot CMS & Editorial Studio | Lumière Derma Journal',
  description: 'Manage automated content scheduling, trending news discovery, AI article drafting, monetization, and search engine optimization.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-sand-50/50 dark:bg-slate-950 font-sans antialiased text-slate-800 dark:text-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
