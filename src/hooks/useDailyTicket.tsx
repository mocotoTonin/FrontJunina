import { useState, useEffect } from 'react';
import { useTickets } from './useTickets';
import TicketEarnedModal from '@/components/TicketEarnedModal';
import { Button } from '@/components/ui/button';
import { Ticket, X } from 'lucide-react';

interface DailyProgress {
  date: string;
  gamesPlayed: string[];
  ticketEarned: boolean;
}

export const useDailyTicket = () => {
  const { addTickets } = useTickets();
  const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showSpecialToast, setShowSpecialToast] = useState(false);
  const [isAcquireModalOpen, setIsAcquireModalOpen] = useState(false);
  
  const gameIds = ['quiz', 'memory', 'treasure', 'word'];
  
  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('dailyProgress');
    
    if (stored) {
      const progress = JSON.parse(stored);
      // Reset progress if it's a new day
      if (progress.date !== today) {
        const newProgress = {
          date: today,
          gamesPlayed: [],
          ticketEarned: false
        };
        setDailyProgress(newProgress);
        localStorage.setItem('dailyProgress', JSON.stringify(newProgress));
      } else {
        setDailyProgress(progress);
      }
    } else {
      const newProgress = {
        date: today,
        gamesPlayed: [],
        ticketEarned: false
      };
      setDailyProgress(newProgress);
      localStorage.setItem('dailyProgress', JSON.stringify(newProgress));
    }
  }, []);

  const markGameAsPlayed = (gameId: string) => {
    if (!dailyProgress) return false;
    
    const today = new Date().toDateString();
    if (dailyProgress.date !== today) return false;
    
    // If game already played today, don't mark again
    if (dailyProgress.gamesPlayed.includes(gameId)) return false;
    
    const updatedProgress = {
      ...dailyProgress,
      gamesPlayed: [...dailyProgress.gamesPlayed, gameId]
    };
    
    // Check if all games were played
    const allGamesPlayed = gameIds.every(id => updatedProgress.gamesPlayed.includes(id));
    
    if (allGamesPlayed && !dailyProgress.ticketEarned) {
      updatedProgress.ticketEarned = true;
      addTickets(1);
      setDailyProgress(updatedProgress);
      localStorage.setItem('dailyProgress', JSON.stringify(updatedProgress));
      
      // Show special toast with acquire button
      setTimeout(() => {
        setShowSpecialToast(true);
      }, 500);
      
      return true; // Return true to show ticket earned message
    }
    
    setDailyProgress(updatedProgress);
    localStorage.setItem('dailyProgress', JSON.stringify(updatedProgress));
    return false;
  };

  const hasPlayedGame = (gameId: string): boolean => {
    if (!dailyProgress) return false;
    return dailyProgress.gamesPlayed.includes(gameId);
  };

  const canEarnTicket = (): boolean => {
    if (!dailyProgress) return false;
    return !dailyProgress.ticketEarned;
  };

  const getRemainingGames = (): string[] => {
    if (!dailyProgress) return gameIds;
    return gameIds.filter(id => !dailyProgress.gamesPlayed.includes(id));
  };

  const handleCloseSpecialToast = () => {
    setShowSpecialToast(false);
  };

  const SpecialToast = () => {
    if (!showSpecialToast) return null;
    
    return (
      <div className="fixed top-4 right-4 z-[9999] bg-junina-blue-900 border border-junina-yellow-400/30 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <Ticket className="w-5 h-5 text-junina-yellow-400 mr-2" />
            <h4 className="font-bold text-junina-yellow-400 font-poetsen">🎉 Parabéns!</h4>
          </div>
          <Button
            onClick={handleCloseSpecialToast}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-white hover:text-junina-yellow-400"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm font-poppins mb-3">
          Você completou todos os jogos! Ganhou 1 ticket especial.
        </p>
        <Button
          onClick={() => {
            setIsAcquireModalOpen(true);
          }}
          className="w-full bg-junina-green-400 hover:bg-junina-green-500 text-white font-semibold text-sm font-poppins"
        >
          Adquirir Já
        </Button>
      </div>
    );
  };

  return {
    markGameAsPlayed,
    hasPlayedGame,
    canEarnTicket,
    getRemainingGames,
    ticketEarned: dailyProgress?.ticketEarned || false,
    showTicketModal,
    setShowTicketModal,
    SpecialToast,
    isAcquireModalOpen,
    setIsAcquireModalOpen,
    TicketEarnedModal: () => (
      <TicketEarnedModal 
        isOpen={showTicketModal} 
        onClose={() => setShowTicketModal(false)} 
      />
    )
  };
};