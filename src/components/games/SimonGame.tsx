import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Trophy, Play, Pause } from 'lucide-react';
import { useDailyTicket } from '@/hooks/useDailyTicket';
import { useGameLimits } from '@/hooks/useGameLimits';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '@/hooks/useLoading';

interface SimonGameProps {
  onClose: () => void;
}

const SimonGame = ({ onClose }: SimonGameProps) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  
  const { markGameAsPlayed } = useDailyTicket();
  const { recordGamePlay } = useGameLimits();
  const navigate = useNavigate();
  const { startLoading } = useLoading();

  const colors = [
    { bg: 'bg-red-500', active: 'bg-red-300', id: 0 },
    { bg: 'bg-blue-500', active: 'bg-blue-300', id: 1 },
    { bg: 'bg-green-500', active: 'bg-green-300', id: 2 },
    { bg: 'bg-yellow-500', active: 'bg-yellow-300', id: 3 }
  ];

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    addToSequence();
  };

  const addToSequence = () => {
    const newNumber = Math.floor(Math.random() * 4);
    const newSequence = [...sequence, newNumber];
    setSequence(newSequence);
    setPlayerSequence([]);
    showSequence(newSequence);
  };

  const showSequence = async (seq: number[]) => {
    setIsShowingSequence(true);
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setActiveButton(seq[i]);
      await new Promise(resolve => setTimeout(resolve, 400));
      setActiveButton(null);
    }
    
    setIsShowingSequence(false);
  };

  const handleButtonClick = (buttonId: number) => {
    if (isShowingSequence || gameOver) return;

    const newPlayerSequence = [...playerSequence, buttonId];
    setPlayerSequence(newPlayerSequence);

    // Check if the player got it wrong
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      endGame();
      return;
    }

    // Check if the player completed the sequence
    if (newPlayerSequence.length === sequence.length) {
      setScore(score + 10);
      setTimeout(() => {
        addToSequence();
      }, 1000);
    }
  };

  const endGame = () => {
    setGameOver(true);
    recordGamePlay('simon');
    markGameAsPlayed('simon');
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
            Sequência alcançada: {sequence.length}
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
    <Card className="w-full max-w-md mx-auto p-4 sm:p-6 glass-effect border-junina-yellow-400/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-junina-yellow-400 font-poetsen flex items-center">
          <Play className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
          Simon Says
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
        {gameStarted && (
          <div className="text-center text-white font-poppins text-sm">
            <p>Sequência: {sequence.length} | Pontos: {score}</p>
            {isShowingSequence && <p className="text-junina-yellow-400">Memorize a sequência...</p>}
            {!isShowingSequence && playerSequence.length < sequence.length && (
              <p className="text-green-400">Sua vez! ({playerSequence.length + 1}/{sequence.length})</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 p-4">
          {colors.map((color) => (
            <button
              key={color.id}
              className={`
                w-20 h-20 mx-auto rounded-lg transition-all duration-200 transform
                ${activeButton === color.id ? color.active : color.bg}
                ${!isShowingSequence && gameStarted ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'}
                ${activeButton === color.id ? 'scale-110 shadow-lg' : ''}
              `}
              onClick={() => handleButtonClick(color.id)}
              disabled={isShowingSequence || !gameStarted}
            />
          ))}
        </div>

        {!gameStarted ? (
          <Button 
            onClick={startGame}
            className="w-full bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold"
          >
            <Play className="w-4 h-4 mr-2" />
            Iniciar Jogo
          </Button>
        ) : (
          <p className="text-center text-junina-yellow-100 font-poppins text-sm">
            Repita a sequência de cores na ordem correta!
          </p>
        )}
      </div>
    </Card>
  );
};

export default SimonGame;