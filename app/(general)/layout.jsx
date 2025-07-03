'use client';

import Footer from '@/components/general/footer';
import Nav from '@/components/general/nav';

export default function Layout({ children }) {

  return (
      <div className="flex h-screen bg-gray-100">
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Nav/>
          
          {/* Main content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-90">
            <div>
              {children}
            </div>
            <Footer />
          </main>
        </div>
      </div>
  );
}