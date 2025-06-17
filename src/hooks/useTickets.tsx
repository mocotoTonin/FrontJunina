import { useState, useEffect } from 'react';

export const useTickets = () => {
  const [tickets, setTickets] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('userTickets');
    if (stored) {
      setTickets(parseInt(stored, 10));
    }
  }, []);

  const addTickets = (amount: number) => {
    const newAmount = tickets + amount;
    setTickets(newAmount);
    localStorage.setItem('userTickets', newAmount.toString());
  };

  const useTickets = (amount: number) => {
    if (tickets >= amount) {
      const newAmount = tickets - amount;
      setTickets(newAmount);
      localStorage.setItem('userTickets', newAmount.toString());
      return true;
    }
    return false;
  };

  return { tickets, addTickets, useTickets };
};