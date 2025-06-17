import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, MapPin, Zap, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useGameLimits } from '@/hooks/useGameLimits';
import { useDailyTicket } from '@/hooks/useDailyTicket';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '@/hooks/useLoading';

interface Cell {
  id: number;
  hasTreasure: boolean;
  isRevealed: boolean;
  emoji: string;
  points: number;
}

const TreasureHuntGame = ({ onClose }: { onClose: () => void }) => {
  const [grid, setGrid] = useState<Cell[]>([]);
  const [score, setScore] = useState(0);
  const [movesLeft, setMovesLeft] = useState(8);
  const [treasuresFound, setTreasuresFound] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();
  const { recordGamePlay } = useGameLimits();
  const { markGameAsPlayed, hasPlayedGame } = useDailyTicket();
  const navigate = useNavigate();
  const { startLoading } = useLoading();

  const treasures = [
    { emoji: '🌽', points: 15, name: 'Milho Dourado' },
    { emoji: '🎵', points: 20, name: 'Sanfona Mágica' },
    { emoji: '🔥', points: 25, name: 'Fogueira Sagrada' },
    { emoji: '🎭', points: 30, name: 'Máscara Especial' }
  ];

  const decoys = ['🪨', '🍂', '🌾', '💀', '🕳️', '🦗'];

  useEffect(() => {
    if (hasPlayedGame('treasure')) {
      toast({
        title: "⏰ Limite diário atingido",
        description: "Você já jogou este jogo hoje. Volte amanhã!",
        duration: 5000,
      });
      onClose();
      return;
    }
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newGrid: Cell[] = [];
    
    // Create 16 cells (4x4 grid)
    for (let i = 0; i < 16; i++) {
      newGrid.push({
        id: i,
        hasTreasure: false,
        isRevealed: false,
        emoji: '',
        points: 0
      });
    }

    // Place 4 treasures randomly
    const treasurePositions = [];
    while (treasurePositions.length < 4) {
      const pos = Math.floor(Math.random() * 16);
      if (!treasurePositions.includes(pos)) {
        treasurePositions.push(pos);
      }
    }

    treasurePositions.forEach((pos, index) => {
      const treasure = treasures[index];
      newGrid[pos] = {
        ...newGrid[pos],
        hasTreasure: true,
        emoji: treasure.emoji,
        points: treasure.points
      };
    });

    // Fill remaining cells with decoys
    newGrid.forEach((cell, index) => {
      if (!cell.hasTreasure) {
        newGrid[index] = {
          ...cell,
          emoji: decoys[Math.floor(Math.random() * decoys.length)],
          points: -5
        };
      }
    });

    setGrid(newGrid);
    setScore(0);
    setMovesLeft(8);
    setTreasuresFound(0);
    setIsWon(false);
    setGameStarted(false);
  };

  const revealCell = (cellId: number) => {
    if (!gameStarted) setGameStarted(true);
    
    const cell = grid[cellId];
    if (cell.isRevealed || movesLeft <= 0) return;

    const newGrid = [...grid];
    newGrid[cellId] = { ...cell, isRevealed: true };
    setGrid(newGrid);
    
    setScore(prev => prev + cell.points);
    setMovesLeft(prev => prev - 1);
    
    if (cell.hasTreasure) {
      setTreasuresFound(prev => prev + 1);
      
      toast({
        title: "🎉 Tesouro Encontrado!",
        description: `Você encontrou: ${cell.emoji} (+${cell.points} pontos)`,
        duration: 2000,
      });
      
      // Check win condition
      if (treasuresFound + 1 === 4) {
        setIsWon(true);
        recordGamePlay('treasure');
        markGameAsPlayed('treasure');
      }
    } else {
      toast({
        title: "😅 Que pena!",
        description: `Apenas ${cell.emoji} (${cell.points} pontos)`,
        duration: 1500,
      });
    }

    // Check lose condition
    if (movesLeft - 1 === 0 && treasuresFound < 4) {
      setTimeout(() => {
        toast({
          title: "⏰ Fim de Jogo!",
          description: `Suas tentativas acabaram! Pontuação final: ${score + cell.points}`,
          duration: 3000,
        });
        recordGamePlay('treasure');
        markGameAsPlayed('treasure');
      }, 1000);
    }
  };

  const handleClose = () => {
    startLoading();
    setTimeout(() => {
      onClose();
      navigate('/mini-jogos');
    }, 1000);
  };

  if (isWon) {
    return (
      <div className="glass-effect p-4 sm:p-6 rounded-2xl max-w-md mx-auto text-center">
        <Trophy className="w-12 sm:w-16 h-12 sm:h-16 text-junina-yellow-400 mx-auto mb-4" />
        <h3 className="text-xl sm:text-2xl font-bold text-junina-yellow-400 mb-4 font-poetsen">
          🏆 Caçador de Tesouros!
        </h3>
        <p className="text-white font-poppins mb-4">
          Parabéns! Você encontrou todos os 4 tesouros!
        </p>
        <div className="bg-junina-yellow-400/20 p-4 rounded-lg mb-4">
          <p className="text-junina-yellow-400 font-semibold">
            Pontuação Final: {score} pontos
          </p>
          <p className="text-sm text-gray-300 mt-1">
            Tesouros: {treasuresFound}/4 | Tentativas usadas: {8 - movesLeft}/8
          </p>
        </div>
        <Button
          onClick={handleClose}
          className="w-full bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold"
        >
          Finalizar
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-effect p-4 sm:p-6 rounded-2xl max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-junina-yellow-400 mb-2 font-poetsen flex items-center justify-center">
          <MapPin className="w-5 h-5 mr-2" />
          Caça ao Tesouro Junino
        </h3>
        <p className="text-white font-poppins mb-4 text-sm sm:text-base">
          Encontre os 4 tesouros escondidos! Cuidado com as armadilhas!
        </p>
        <div className="flex justify-between text-sm text-white font-poppins">
          <span>Pontos: {score}</span>
          <span>Tesouros: {treasuresFound}/4</span>
          <span>Tentativas: {movesLeft}/8</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6 max-w-xs mx-auto">
        {grid.map((cell) => (
          <div
            key={cell.id}
            onClick={() => !cell.isRevealed && revealCell(cell.id)}
            className={`
              h-16 w-16 flex items-center justify-center rounded-lg font-bold text-2xl
              transition-all duration-300 cursor-pointer
              ${cell.isRevealed 
                ? cell.hasTreasure 
                  ? 'bg-junina-yellow-400 text-junina-blue-900 ring-2 ring-junina-green-400' 
                  : 'bg-junina-red-400/30 text-white'
                : 'bg-junina-blue-800 hover:bg-junina-blue-700 hover:scale-105'
              }
              ${!cell.isRevealed ? 'animate-pulse' : ''}
            `}
          >
            {cell.isRevealed ? cell.emoji : '?'}
          </div>
        ))}
      </div>

      <div className="text-center space-y-3">
        <div className="bg-junina-blue-800/50 p-3 rounded-lg">
          <p className="text-junina-yellow-400 text-sm font-semibold mb-2">Tesouros para encontrar:</p>
          <div className="flex justify-center gap-2">
            {treasures.map((treasure, index) => (
              <span 
                key={index} 
                className={`text-lg ${treasuresFound > index ? 'opacity-50' : ''}`}
              >
                {treasure.emoji}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <Button
            onClick={initializeGame}
            variant="outline"
            size="sm"
            className="border-junina-yellow-400 text-junina-yellow-400 hover:bg-junina-yellow-400 hover:text-junina-blue-900"
          >
            <Zap className="w-4 h-4 mr-2" />
            Novo Jogo
          </Button>
          <Button
            onClick={handleClose}
            variant="outline"
            size="sm"
            className="border-junina-red-400 text-junina-red-400 hover:bg-junina-red-400 hover:text-white"
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TreasureHuntGame;