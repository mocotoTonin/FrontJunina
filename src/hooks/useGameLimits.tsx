
import { useState, useEffect } from 'react';

interface GameLimit {
  gameId: string;
  lastPlayed: string;
  timesPlayed: number;
}

export const useGameLimits = () => {
  const [gameLimits, setGameLimits] = useState<GameLimit[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('gamePlayLimits');
    if (stored) {
      setGameLimits(JSON.parse(stored));
    }
  }, []);

  const canPlayGame = (gameId: string): boolean => {
    const today = new Date().toDateString();
    const gameLimit = gameLimits.find(g => g.gameId === gameId);
    
    if (!gameLimit) return true;
    
    // If last played was not today, can play again
    if (gameLimit.lastPlayed !== today) return true;
    
    // If played today, cannot play again
    return false;
  };

  const recordGamePlay = (gameId: string) => {
    const today = new Date().toDateString();
    const newLimits = gameLimits.filter(g => g.gameId !== gameId);
    newLimits.push({
      gameId,
      lastPlayed: today,
      timesPlayed: 1
    });
    
    setGameLimits(newLimits);
    localStorage.setItem('gamePlayLimits', JSON.stringify(newLimits));
  };

  return { canPlayGame, recordGamePlay };
};
