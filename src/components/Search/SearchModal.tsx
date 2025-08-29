'use client';

import { SearchModalProps, SearchResult } from '@/types';
import { performSearch } from '@/utils/search';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SearchContent } from './SearchContent';
import { SearchFooter } from './SearchFooter';
import { SearchHeader } from './SearchHeader';

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const resultsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleCtrlK = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleCtrlK);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleCtrlK);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
      setIsLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
      if (selectedElement) {
        const container = resultsRef.current;
        const containerRect = container.getBoundingClientRect();
        const elementRect = selectedElement.getBoundingClientRect();

        const isAbove = elementRect.top < containerRect.top;
        const isBelow = elementRect.bottom > containerRect.bottom;

        if (isAbove || isBelow) {
          const elementOffsetTop = selectedElement.offsetTop;
          const containerHeight = container.clientHeight;

          if (isAbove) {
            container.scrollTo({
              top: Math.max(0, elementOffsetTop - 70),
            });
          } else if (isBelow) {
            container.scrollTo({
              top: elementOffsetTop - containerHeight + 40,
              behavior: 'smooth',
            });
          }
        }
      }
    }
  }, [selectedIndex, results]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement> | undefined;

      if (!focusableElements) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => {
            const newIndex = prev < results.length - 1 ? prev + 1 : prev;
            console.log('⬇️ Seta para baixo - Index anterior:', prev, '| Novo index:', newIndex);
            return newIndex;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => {
            const newIndex = prev > 0 ? prev - 1 : -1;
            console.log('⬆️ Seta para cima - Index anterior:', prev, '| Novo index:', newIndex);
            return newIndex;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          } else {
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement && 'click' in activeElement) {
              console.log('⌨️ ENTER pressionado - Clicando em elemento ativo:', activeElement);
              activeElement.click();
            }
          }
          break;
        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
            } else {
              const currentIndex = Array.from(focusableElements).indexOf(
                document.activeElement as HTMLElement
              );
              if (currentIndex > 0) {
                focusableElements[currentIndex - 1].focus();
              }
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
            } else {
              const currentIndex = Array.from(focusableElements).indexOf(
                document.activeElement as HTMLElement
              );
              if (currentIndex >= 0) {
                focusableElements[currentIndex + 1].focus();
              } else {
                firstElement.focus();
              }
            }
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  useEffect(() => {
    return performSearch(query, setResults, setIsLoading, setSelectedIndex);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    router.push(result.href);
    onClose();

    setTimeout(() => {
      if (result.href.includes('#')) {
        const hash = result.href.split('#')[1];
        const element = document.getElementById(hash);
        if (element) {
          const elementPosition = element.offsetTop;
          const offsetPosition = elementPosition - 100;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth',
          });
        }
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" />
      <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0">
        <div
          ref={modalRef}
          className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all sm:my-16"
        >
          <SearchHeader query={query} setQuery={setQuery} onClose={onClose} inputRef={inputRef} />
          <SearchContent
            query={query}
            results={results}
            selectedIndex={selectedIndex}
            isLoading={isLoading}
            setQuery={setQuery}
            handleResultClick={handleResultClick}
            resultsRef={resultsRef}
          />
          <SearchFooter results={results} />
        </div>
      </div>
    </div>
  );
}