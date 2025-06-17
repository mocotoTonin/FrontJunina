
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Gamepad2, Trophy, Target, Brain, Puzzle, Type } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '@/components/ParticleBackground';
import MemoryGame from '@/components/games/MemoryGame';
import QuizGame from '@/components/games/QuizGame';
import TreasureHuntGame from '@/components/games/TreasureHuntGame';
import WordGame from '@/components/games/WordGame';
import { useGameLimits } from '@/hooks/useGameLimits';
import { useAuth } from '@/hooks/useAuth';

const MiniJogos = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const { canPlayGame } = useGameLimits();  

  const games = [
    {
      id: 'memory',
      name: 'Jogo da Memória',
      description: 'Encontre os pares e ganhe tickets',
      tickets: 'Jogue e Garanta seu Ticket Diário!',
      icon: Brain,
      difficulty: 'Fácil',
      component: MemoryGame
    },
    {
      id: 'quiz',
      name: 'Quiz Junino',
      description: 'Teste seus conhecimentos sobre festa junina',
      tickets: 'Jogue e Garanta seu Ticket Diário!',
      icon: Trophy,
      difficulty: 'Médio',
      component: QuizGame
    },
    {
      id: 'treasure',
      name: 'Caça ao Tesouro',
      description: 'Encontre os tesouros escondidos da festa junina!',
      tickets: 'Jogue e Garanta seu Ticket Diário!',
      icon: Puzzle,
      difficulty: 'Inovador',
      component: TreasureHuntGame
    },
    {
      id: 'word',
      name: 'Forme a Palavra',
      description: 'Reorganize as letras das palavras juninas',
      tickets: 'Jogue e Garanta seu Ticket Diário!',
      icon: Type,
      difficulty: 'Médio',
      component: WordGame
    }
  ];

  const handleGameClick = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (game && game.component) {
      setActiveGame(gameId);
    }
  };

  const ActiveGameComponent = activeGame ? games.find(g => g.id === activeGame)?.component : null;

  if (ActiveGameComponent) {
    return (
      <div className="min-h-screen relative">
        <ParticleBackground />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <ActiveGameComponent onClose={() => setActiveGame(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-junina-yellow-400/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src="/imagens-uploads/logoMilho.png" 
                  alt="Festa Junina" 
                  className="w-16 h-16"
                  loading="eager"
                />
                <span className="text-xl font-bold gradient-text font-poetsen">Festa Junina</span>
              </Link>
              
              <Link 
                to="/"
                className="flex items-center text-white hover:text-junina-yellow-400 transition-colors font-poppins"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </div>

            
          </div>
        </nav>

        <div className="pt-24 pb-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-junina-yellow-400 mb-4 font-poetsen">
                Mini Jogos
              </h1>
              <p className="text-lg md:text-xl text-white font-poppins">
                Jogue e acumule tickets especiais!
              </p>
              <p className="text-sm md:text-base text-junina-yellow-300 font-poppins mt-2">
                ⏰ Cada jogo pode ser jogado apenas uma vez por dia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {games.map((game) => {
                const Icon = game.icon;
                const canPlay = canPlayGame(game.id);
                
                return (
                  <div 
                    key={game.id} 
                    className={`glass-effect p-4 md:p-6 rounded-2xl transition-transform duration-300 ${
                      canPlay ? 'hover:scale-105 cursor-pointer' : 'opacity-75'
                    }`}
                    onClick={() => canPlay && handleGameClick(game.id)}
                  >
                    <div className="flex flex-col sm:flex-row items-center mb-4">
                      <div className="w-16 h-16 bg-junina-yellow-400/20 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                        <Icon className="w-8 h-8 text-junina-yellow-400" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl md:text-2xl font-bold text-junina-yellow-400 font-poetsen">
                          {game.name}
                        </h3>
                        <p className="text-white font-poppins text-sm md:text-base">{game.description}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                        <span className="text-junina-green-400 font-semibold font-poppins text-sm md:text-base">
                         {game.tickets}
                        </span>
                        <span className="text-junina-blue-300 font-poppins text-sm md:text-base">
                          {game.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full font-semibold font-poppins ${
                        canPlay 
                          ? 'bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900' 
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                      size="lg"
                      disabled={!canPlay}
                    >
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      {canPlay ? 'Jogar Agora' : 'Já Jogado Hoje'}
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="glass-effect p-4 md:p-6 rounded-2xl text-center">
              <h3 className="text-xl md:text-2xl font-bold text-junina-yellow-400 mb-4 font-poetsen">
                Como Funcionam os Tickets?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white font-poppins">
                <div className="flex flex-col items-center">
                  <Trophy className="w-6 h-6 md:w-8 md:h-8 text-junina-yellow-400 mx-auto mb-2" />
                  <p className="text-sm md:text-base">Jogue os mini games (1x por dia)</p>
                </div>
                <div className="flex flex-col items-center">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-junina-green-400 mx-auto mb-2" />
                  <p className="text-sm md:text-base">Jogue todos os 4 jogos por dia</p>
                </div>
                <div className="flex flex-col items-center">
                  <Calendar className="w-6 h-6 md:w-8 md:h-8 text-junina-red-400 mx-auto mb-2" />
                  <p className="text-sm md:text-base">Ganhe 1 ticket especial ao completar todos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniJogos;
