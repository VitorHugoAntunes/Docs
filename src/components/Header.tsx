'use client';
import { useSidebar } from '@/contexts/SidebarContext';
import { Github, Menu, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SearchCommandKey } from './Search/SearchCommandKey';
import SearchModal from './SearchModal';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toggle } = useSidebar()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-300 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 ">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center gap-24">
            <div className="flex items-center gap-4">
              <button
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg lg:hidden -ms-2.5 p-2"
                onClick={toggle}
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <Link href="/" className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600"></div>
                <span className="text-xl font-bold text-gray-900">DocSite</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:block">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="relative group"
              >
                <div className="flex items-center w-96 rounded-lg border border-gray-300 bg-gray-50 py-2 px-3 text-sm text-left transition-all group-hover:bg-gray-100 group-hover:border-gray-400">
                  <Search className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-500 flex-1 text-left truncate">
                    Buscar na documentação...
                  </span>
                  <SearchCommandKey />
                </div>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="p-2 text-gray-500 hover:text-gray-700 sm:hidden"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="https://github.com"
                className="p-2 text-gray-500 hover:text-gray-700 -me-2.5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}