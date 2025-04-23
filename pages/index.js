import { useState, useEffect } from "react";
import { Code, Sparkles } from "lucide-react";

function Home() {
  const [loaded, setLoaded] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    // Efeito de entrada
    setTimeout(() => setLoaded(true), 300);

    // Efeito de glitch periódico
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);

    // CSS adicional para o efeito de grade no fundo
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0%, 100% {opacity: 0.2;}
        50% { opacity: 0.3; }
      }

      .bg-grid-pattern {
        background-image: linear-gradient(rgba(86, 61, 255, 0.2) 1px, transparent 1px), 
                          linear-gradient(90deg, rgba(86, 61, 255, 0.2) 1px, transparent 1px);
        background-size: 20px 20px;
      }

      @keyframes gradientText {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);

    // Limpeza
    return () => {
      clearInterval(glitchInterval);
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 overflow-hidden">
      {/* Background com efeito de grade digital */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-20 bg-grid-pattern" />
      </div>

      {/* Círculos luminosos animados - reposicionados para melhor visualização em mobile */}
      <div className="absolute top-0 left-0 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-purple-500 filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-40 sm:w-96 h-40 sm:h-96 rounded-full bg-blue-500 filter blur-3xl opacity-10 animate-pulse" />

      {/* Conteúdo principal */}
      <div
        className={`relative z-10 text-center transform transition-all duration-1000 ${loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        {/* Ícone com tamanho responsivo */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="relative">
            <Code size={48} className="sm:hidden text-blue-400" />
            <Code
              size={64}
              className="hidden sm:block md:hidden text-blue-400"
            />
            <Code size={80} className="hidden md:block text-blue-400" />
            <Sparkles
              size={20}
              className="absolute top-0 right-0 sm:hidden text-purple-400 animate-pulse"
            />
            <Sparkles
              size={26}
              className="absolute top-0 right-0 hidden sm:block md:hidden text-purple-400 animate-pulse"
            />
            <Sparkles
              size={32}
              className="absolute top-0 right-0 hidden md:block text-purple-400 animate-pulse"
            />
          </div>
        </div>

        {/* Título principal ajustado para mobile */}
        <h1
          className={`text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 transition-all ${glitch ? "text-red-400 skew-x-2" : "text-white"}`}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500">
            SITE EM
          </span>
        </h1>

        {/* Subtítulo com tamanho responsivo */}
        <div className="relative mb-8 sm:mb-12">
          <h2
            className={`text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter ${glitch ? "skew-x-2 scale-105" : ""} transition-all duration-200`}
          >
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400 animate-pulse">
                {/* Quebra de linha em telas muito pequenas */}
                <span className="sm:hidden">
                  DESEN-
                  <br />
                  VOLVIMENTO
                </span>
                <span className="hidden sm:inline">DESENVOLVIMENTO</span>
              </span>
              {/* Efeito de neon */}
              <span className="absolute -inset-1 block bg-gradient-to-r from-purple-500 to-blue-400 opacity-50 blur-xl animate-pulse" />
            </span>
          </h2>
          {/* Linha de neon pulsante */}
          <div className="mx-auto mt-4 h-1 w-24 sm:w-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 animate-pulse" />
        </div>

        {/* Elementos decorativos: linhas que parecem código - ajustados para mobile */}
        <div className="max-w-xs sm:max-w-lg mx-auto text-left font-mono text-xs md:text-sm space-y-2 opacity-60 overflow-x-auto">
          <div className="flex">
            <span className="text-green-400 mr-2 whitespace-nowrap">{">"}</span>
            <span className="text-blue-400 whitespace-nowrap">Loading</span>
            <span className="text-purple-400 ml-2 animate-pulse whitespace-nowrap">
              ...
            </span>
          </div>
          <div className="flex">
            <span className="text-green-400 mr-2 whitespace-nowrap">{">"}</span>
            <span className="text-blue-400 whitespace-nowrap">Building</span>
            <span className="text-yellow-400 ml-2 whitespace-nowrap">
              awesome_experience.js
            </span>
          </div>
          <div className="flex">
            <span className="text-green-400 mr-2 whitespace-nowrap">{">"}</span>
            <span className="text-blue-400 whitespace-nowrap">
              console.log(
            </span>
            <span className="text-purple-400 whitespace-nowrap">
              "Voltamos em breve!"
            </span>
            <span className="text-blue-400 whitespace-nowrap">);</span>
          </div>
        </div>
      </div>

      {/* Rodapé minimalista - ajustado para visualização em mobile */}
      <div
        className={`absolute bottom-4 text-center text-gray-500 text-xs sm:text-sm transition-all duration-1000 ${loaded ? "opacity-40" : "opacity-0"} w-full px-4`}
      >
        © {new Date().getFullYear()} |{" "}
        <span className="text-blue-400">Gabriel Carvalho</span>
      </div>
    </div>
  );
}

export default Home;
