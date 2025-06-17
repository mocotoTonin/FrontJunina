import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Trophy, Target } from 'lucide-react';
import { useDailyTicket } from '@/hooks/useDailyTicket';
import { useGameLimits } from '@/hooks/useGameLimits';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '@/hooks/useLoading';

interface ShootingGameProps {
  onClose: () => void;
}

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const ShootingGame = ({ onClose }: ShootingGameProps) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [isGameActive, setIsGameActive] = useState(true);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  const { markGameAsPlayed } = useDailyTicket();
  const { recordGamePlay } = useGameLimits();
  const navigate = useNavigate();
  const { startLoading } = useLoading();

  const colors = ['#fbbf24', '#dc2626', '#3b82f6', '#22c55e', '#8b5cf6'];

  const createBalloon = () => {
    const newBalloon: Balloon = {
      id: Date.now() + Math.random(),
      x: Math.random() * 280,
      y: Math.random() * 200,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 30 + 20
    };
    setBalloons(prev => [...prev, newBalloon]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGameActive && balloons.length < 8) {
        createBalloon();
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isGameActive, balloons.length]);

  useEffect(() => {
    if (timeLeft > 0 && isGameActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, isGameActive]);

  const popBalloon = (id: number) => {
    setBalloons(prev => prev.filter(balloon => balloon.id !== id));
    setScore(score + 10);
  };

  const endGame = () => {
    setIsGameActive(false);
    setGameOver(true);
    recordGamePlay('shooting');
    markGameAsPlayed('shooting');
  };

  const handleClose = () => {
    startLoading();
    setTimeout(() => {
      onClose();
      navigate('/mini-jogos');
    }, 1000);
  };

  if (gameOver) {
    return (
      <Card className="w-full max-w-md mx-auto p-6 glass-effect border-junina-yellow-400/30">
        <div className="text-center space-y-4">
          <Trophy className="w-16 h-16 text-junina-yellow-400 mx-auto" />
          <h2 className="text-2xl font-bold text-junina-yellow-400 font-poetsen">
            Jogo Finalizado!
          </h2>
          <p className="text-white font-poppins">
            Balões estourados: {score / 10}
          </p>
          <p className="text-white font-poppins">
            Pontuação: {score} pontos
          </p>
          <Button 
            onClick={handleClose}
            className="w-full bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold"
          >
            Finalizar
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto p-4 sm:p-6 glass-effect border-junina-yellow-400/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-junina-yellow-400 font-poetsen flex items-center">
          <Target className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
          Estoure os Balões
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleClose}
          className="text-white hover:text-junina-yellow-400"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-white font-poppins text-sm">
          <span>Tempo: {timeLeft}s</span>
          <span>Pontos: {score}</span>
        </div>

        <div 
          ref={gameAreaRef}
          className="relative w-full h-64 bg-gradient-to-b from-blue-300 to-blue-500 rounded-lg overflow-hidden cursor-crosshair"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)' }}
        >
          {balloons.map((balloon) => (
            <div
              key={balloon.id}
              className="absolute cursor-pointer transition-transform hover:scale-110"
              style={{
                left: `${balloon.x}px`,
                top: `${balloon.y}px`,
                width: `${balloon.size}px`,
                height: `${balloon.size}px`,
              }}
              onClick={() => popBalloon(balloon.id)}
            >
              <div
                className="w-full h-full rounded-full shadow-lg"
                style={{
                  backgroundColor: balloon.color,
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${balloon.color})`
                }}
              />
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-600"
              />
            </div>
          ))}
        </div>

        <p className="text-center text-junina-yellow-100 font-poppins text-sm">
          Clique nos balões para estourá-los!
        </p>
      </div>
    </Card>
  );
};

export default ShootingGame;