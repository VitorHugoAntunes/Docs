import ReactSVG from '@/assets/react.svg';
import { ArrowRight, ExternalLink, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden relative">
      <style jsx>{`
        .slow-spin {
          animation: spin 8s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>

      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <section className="relative flex flex-col justify-center items-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/20">
            <Star className="h-4 w-4" />
            <span>Documentação Pessoal</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Documentação Pessoal de {' '}
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">Front-end</span>
          </h1>

          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Uma plataforma simples e elegante para organizar suas anotações e documentos técnicos pessoais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href={"/docs/get-started/introducao"}>
              <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Começar Agora
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:border-white/50 hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2">
              Ver Github
              <ExternalLink className="h-5 w-5" />
            </button>
          </div>

          <div className="relative max-w-5xl mx-auto -mb-32">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white/10 rounded px-4 py-1 text-sm text-white/70 text-left backdrop-blur-sm">
                  localhost:3000/docs
                </div>
              </div>
              <div className="h-96 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center text-white/60">
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center slow-spin">
                    {/* React Logo SVG com animação lenta */}
                    <Image src={ReactSVG} alt="React Logo" className="w-12 h-12" />
                  </div>
                  <p className="text-lg font-medium">Documentação Pessoal</p>
                  <p className="text-sm">Organizada e sempre acessível</p>
                </div>
              </div>
            </div>

            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-3xl blur-xl -z-10"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;