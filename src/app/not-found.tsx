'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">

        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl font-bold text-gray-200 mb-4">
            404
          </h1>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Página não encontrada
          </h2>
          <p className="text-gray-600 leading-relaxed">
            A página que você está procurando não existe ou foi movida.
            Verifique a URL ou volte para a página inicial.
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/">
            <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <Home className="h-4 w-4" />
              Página Inicial
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;