import ReactSVG from '@/assets/nextjs.svg';
import { ArrowRight, ExternalLink, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden relative">
      <style jsx>{`
        .float-animation {
          animation: float 4s ease-in-out infinite;
        }
        
        .glow-pulse {
          animation: glowPulse 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.5), 0 0 60px rgba(59, 130, 246, 0.3);
          }
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>

      <div className="absolute top-1/4 left-1/6 w-48 h-48 sm:w-72 sm:h-72 sm:left-1/4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/6 w-64 h-64 sm:w-96 sm:h-96 sm:right-1/4 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <section className="relative flex flex-col justify-center items-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-white/20">
            <Star className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Simples e Eficiente</span>
          </div>


          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
            Documentação de {' '}
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent block sm:inline mt-2 sm:mt-0">
              Estrutura de Dados
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            Uma plataforma simples para reunir e acessar anotações sobre estruturas de dados e algoritmos.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4 sm:px-0">
            <Link href={"/docs/get-started/introducao"}>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:shadow-white/10 flex items-center justify-center gap-2 hover:scale-105 cursor-pointer text-sm sm:text-base">
                Começar Agora
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </Link>
            <a href='https://github.com/VitorHugoAntunes/Docs' target="_blank" rel="noopener noreferrer">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:border-white/50 hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base">
                Ver Github
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </a>
          </div>

          <div className="relative max-w-5xl mx-auto -mb-32">
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-white/5 px-3 py-2 sm:px-6 sm:py-4 border-b border-white/10 flex items-center gap-2 sm:gap-3">
                <div className="flex gap-1 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white/10 rounded px-2 py-1 sm:px-4 sm:py-1 text-xs sm:text-sm text-white/70 text-left backdrop-blur-sm">
                  <span className="hidden sm:inline">localhost:3000/docs</span>
                  <span className="sm:hidden">docs</span>
                </div>
              </div>

              <div className="h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center text-white/60 px-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full mx-auto mb-2 sm:mb-4 flex items-center justify-center float-animation glow-pulse bg-white">
                    <Image src={ReactSVG} alt="React Logo" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                  </div>
                  <p className="text-sm sm:text-base md:text-lg font-medium mb-1 sm:mb-2">Documentação de Estruturas de Dados</p>
                  <p className="text-xs sm:text-sm text-white/50">Organizada e sempre acessível</p>
                </div>
              </div>
            </div>

            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-2xl sm:rounded-3xl blur-xl -z-10"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;