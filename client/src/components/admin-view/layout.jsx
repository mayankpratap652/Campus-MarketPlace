import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './header';
import AdminSideBar from './sidebar';

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar} />

        <main className="flex-1 w-full bg-blue-200 text-white p-6 flex flex-col items-start justify-start">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
