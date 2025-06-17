
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Trophy, Ticket, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useGameLimits } from '@/hooks/useGameLimits';
import { useDailyTicket } from '@/hooks/useDailyTicket';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '@/hooks/useLoading';

const MemoryGame = ({ onClose }: { onClose: () => void }) => {
  const [cards, setCards] = useState<{ id: number; symbol: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [showTicketMessage, setShowTicketMessage] = useState(false);
  const { toast } = useToast();
  const { canPlayGame, recordGamePlay } = useGameLimits();
  const { markGameAsPlayed, hasPlayedGame } = useDailyTicket();
  const navigate = useNavigate();
  const { startLoading } = useLoading();

  const symbols = ['🌽', '🎪', '🎵', '🔥', '🎭', '🎯', '🎨', '⭐'];

  const initializeGame = () => {
    const gameCards = [...symbols, ...symbols].map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false,
    }));
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
    setShowTicketMessage(false);
  };

  useEffect(() => {
    if (hasPlayedGame('memory')) {
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

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);
      
      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isMatched: true } 
              : card
          ));
          setMatches(prev => prev + 1);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false } 
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matches === 8) {
      setIsWon(true);
      recordGamePlay('memory');
      
      // Try to earn daily ticket by marking game as played
      const earnedTicket = markGameAsPlayed('memory');
      if (earnedTicket) {
        setShowTicketMessage(true);
      }
    }
  }, [matches, moves]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || isWon) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  if (showTicketMessage) {
    return (
      <div className="glass-effect p-6 rounded-2xl max-w-md mx-auto text-center">
        <Gift className="w-16 h-16 text-junina-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-junina-yellow-400 mb-4 font-poetsen">
          🎉 Parabéns! Ticket Conquistado!
        </h3>
        <p className="text-lg text-white mb-4 font-poppins">
          Você jogou todos os mini games hoje e ganhou 1 ticket!
        </p>
        <div className="bg-junina-yellow-400/20 p-4 rounded-lg mb-6">
          <p className="text-junina-yellow-400 font-semibold font-poppins">
            🎫 Código do seu ticket: <strong>DAILY{new Date().getDate()}${new Date().getMonth() + 1}</strong>
          </p>
          <p className="text-sm text-gray-300 mt-2">
            Este código foi "enviado" para seu email fictício!
          </p>
        </div>
        <Button onClick={() => setShowTicketMessage(false)} className="bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold font-poppins">
          Continuar
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-effect p-4 sm:p-6 rounded-2xl max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-junina-yellow-400 mb-2 font-poetsen">
          Jogo da Memória
        </h3>
        <p className="text-white font-poppins mb-4">
          Encontre todos os pares! Tentativas: {moves} | Pares: {matches}/8
        </p>
        
        <div className="flex gap-2 justify-center mb-4">
          <Button
            onClick={() => {
              startLoading();
              setTimeout(() => {
                onClose();
                navigate('/mini-jogos');
              }, 1000);
            }}
            variant="outline"
            size="sm"
            className="border-junina-red-400 text-junina-red-400 hover:bg-junina-red-400 hover:text-white"
          >
            Fechar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              h-16 w-16 flex items-center justify-center rounded-lg cursor-pointer
              font-bold text-2xl transition-all duration-300 hover:scale-105
              ${card.isFlipped || card.isMatched 
                ? 'bg-junina-yellow-400 text-junina-blue-900' 
                : 'bg-junina-blue-800 hover:bg-junina-blue-700'
              }
              ${card.isMatched ? 'ring-2 ring-junina-green-400' : ''}
            `}
          >
            {(card.isFlipped || card.isMatched) ? card.symbol : '?'}
          </div>
        ))}
      </div>

      {isWon && !showTicketMessage && (
        <div className="text-center p-4 bg-junina-green-400/20 rounded-lg mb-4">
          <Trophy className="w-8 h-8 text-junina-green-400 mx-auto mb-2" />
          <p className="text-junina-green-400 font-bold font-poppins mb-4">
            Parabéns! Jogo completado em {moves} tentativas!
          </p>
          <Button
            onClick={() => {
              startLoading();
              setTimeout(() => {
                onClose();
                navigate('/mini-jogos');
              }, 1000);
            }}
            className="w-full bg-junina-yellow-400 hover:bg-junina-yellow-500 text-junina-blue-900 font-semibold"
          >
            Finalizar
          </Button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
