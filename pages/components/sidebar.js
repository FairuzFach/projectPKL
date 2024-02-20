// components/sidebar.js
'use client'

import React from 'react';
import { HiDocumentReport, HiHome, HiFolderRemove, HiMenu, HiLogout, HiDocumentSearch, HiFolderOpen } from 'react-icons/hi';
import { Sidebar } from 'flowbite-react';

const CustomSidebar = () => {
  return (
    <Sidebar className="bg-gradient-to-b from-red-500 to-red-900 h-screen text-white" aria-label="Sidebar with logo branding example">
      <Sidebar.Logo href="/dashboard" img="/logo482.png" imgAlt="logo" className="text-2xl font-bold">
        E-Archive
      </Sidebar.Logo>
      <Sidebar.Items className="mt-5">
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/dashboard" icon={HiHome} className="mb-2">
            Home
          </Sidebar.Item>
          <Sidebar.Item href="/dokumen/masuk" icon={HiFolderOpen} className="mb-2">
            Dokumen Arsip Masuk
          </Sidebar.Item>
          {/* <Sidebar.Item href="#" icon={HiFolderRemove} className="mb-2">
            Dokumen Arsip Keluar
          </Sidebar.Item> */}
          <Sidebar.Item href="/dokumen/cari" icon={HiDocumentSearch} className="mb-2">
            Cari Dokumen
          </Sidebar.Item>
          <Sidebar.Item href="/dokumen/kategori" icon={HiMenu} className="mb-2">
            Kategori
          </Sidebar.Item>
          {/* <Sidebar.Item href="#" icon={HiDocumentReport} className="mb-2">
            Laporan
          </Sidebar.Item> */}
          <Sidebar.Item href="/login" icon={HiLogout} className="mb-2">
            Keluar
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default CustomSidebar;