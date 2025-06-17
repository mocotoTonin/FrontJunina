import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Trophy, Type } from 'lucide-react';
import { useDailyTicket } from '@/hooks/useDailyTicket';
import { useGameLimits } from '@/hooks/useGameLimits';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '@/hooks/useLoading';

interface WordGameProps {
  onClose: () => void;
}

const WordGame = ({ onClose }: WordGameProps) => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameActive, setIsGameActive] = useState(true);
  
  const { markGameAsPlayed } = useDailyTicket();
  const { recordGamePlay } = useGameLimits();
  const navigate = useNavigate();
  const { startLoading } = useLoading();

  const words = [
    'FOGUEIRA', 'QUADRILHA', 'MILHO', 'BANDEIRINHA', 'BALAO',
    'CHAPEU', 'CAIPIRA', 'FESTA', 'DANCA', 'PIPOCA',
    'FOGUETE', 'BONFIRE', 'ARRAIA', 'JUNINA', 'SANFONA'
  ];

  const scrambleWord = (word: string) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  const getNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setScrambledWord(scrambleWord(randomWord));
    setUserAnswer('');
  };

  useEffect(() => {
    getNewWord();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && isGameActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, isGameActive]);

  const checkAnswer = () => {
    if (userAnswer.toUpperCase() === currentWord) {
      setScore(score + 10);
      setRound(round + 1);
      if (round >= 5) {
        endGame();
      } else {
        getNewWord();
      }
    } else {
      setUserAnswer('');
    }
  };

  const endGame = () => {
    setIsGameActive(false);
    setGameOver(true);
    recordGamePlay('word');
    markGameAsPlayed('word');
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
            Pontuação: {score} pontos
          </p>
          <p className="text-white font-poppins">
            Rodadas completadas: {round - 1}/5
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
          <Type className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
          Forme a Palavra
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
          <span>Rodada: {round}/5</span>
          <span>Pontos: {score}</span>
        </div>

        <div className="text-center space-y-4">
          <div className="p-4 bg-junina-blue-800/50 rounded-lg">
            <p className="text-junina-yellow-400 font-semibold mb-2">Reorganize as letras:</p>
            <p className="text-2xl font-bold text-white tracking-wider">{scrambledWord}</p>
          </div>

          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Digite a palavra..."
            className="text-center bg-junina-blue-800 border-junina-yellow-400/30 text-white placeholder-gray-400"
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          />

          <Button 
            onClick={checkAnswer}
            disabled={!userAnswer.trim()}
            className="w-full bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold"
          >
            Verificar Resposta
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WordGame;