
import React, { createContext, useContext, useState } from 'react';

export interface Match {
  id: string;
  title: string;
  game: 'BGMI' | 'FreeFire' | 'PUBG';
  type: 'Solo' | 'Duo' | 'Squad';
  entryFee: number;
  maxPlayers: number;
  currentPlayers: number;
  hostId: string;
  hostName: string;
  hostTrustScore: number;
  startTime: string;
  status: 'waiting' | 'ongoing' | 'completed';
  roomCode?: string;
  payoutStructure: { position: number; amount: number }[];
  participants: string[];
  winners?: { playerId: string; position: number; amount: number }[];
}

interface GameContextType {
  matches: Match[];
  createMatch: (matchData: Omit<Match, 'id' | 'currentPlayers' | 'participants' | 'status'>) => void;
  joinMatch: (matchId: string, playerId: string) => boolean;
  updateMatchWinners: (matchId: string, winners: { playerId: string; position: number; amount: number }[]) => void;
  getMatchById: (id: string) => Match | undefined;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>([
    // Sample data
    {
      id: 'match_1',
      title: 'Olympus Thunder Squad',
      game: 'BGMI',
      type: 'Squad',
      entryFee: 15,
      maxPlayers: 100,
      currentPlayers: 67,
      hostId: 'host_1',
      hostName: 'Zeus_Gaming',
      hostTrustScore: 4.8,
      startTime: '2024-07-10T20:00:00Z',
      status: 'waiting',
      roomCode: 'OLY2024',
      payoutStructure: [
        { position: 1, amount: 150 },
        { position: 2, amount: 100 },
        { position: 3, amount: 75 },
        { position: 4, amount: 50 },
        { position: 5, amount: 40 },
        { position: 6, amount: 30 },
        { position: 7, amount: 25 },
        { position: 8, amount: 20 },
        { position: 9, amount: 15 },
        { position: 10, amount: 10 }
      ],
      participants: []
    },
    {
      id: 'match_2',
      title: 'Titan Solo Championship',
      game: 'FreeFire',
      type: 'Solo',
      entryFee: 10,
      maxPlayers: 50,
      currentPlayers: 23,
      hostId: 'host_2',
      hostName: 'Athena_Pro',
      hostTrustScore: 4.6,
      startTime: '2024-07-10T21:30:00Z',
      status: 'waiting',
      payoutStructure: [
        { position: 1, amount: 75 },
        { position: 2, amount: 50 },
        { position: 3, amount: 35 },
        { position: 4, amount: 25 },
        { position: 5, amount: 20 },
        { position: 6, amount: 15 },
        { position: 7, amount: 12 },
        { position: 8, amount: 10 },
        { position: 9, amount: 8 },
        { position: 10, amount: 5 }
      ],
      participants: []
    }
  ]);

  const createMatch = (matchData: Omit<Match, 'id' | 'currentPlayers' | 'participants' | 'status'>) => {
    const newMatch: Match = {
      ...matchData,
      id: `match_${Date.now()}`,
      currentPlayers: 0,
      participants: [],
      status: 'waiting'
    };
    setMatches(prev => [newMatch, ...prev]);
  };

  const joinMatch = (matchId: string, playerId: string) => {
    setMatches(prev => prev.map(match => {
      if (match.id === matchId && match.currentPlayers < match.maxPlayers && !match.participants.includes(playerId)) {
        return {
          ...match,
          currentPlayers: match.currentPlayers + 1,
          participants: [...match.participants, playerId]
        };
      }
      return match;
    }));
    return true;
  };

  const updateMatchWinners = (matchId: string, winners: { playerId: string; position: number; amount: number }[]) => {
    setMatches(prev => prev.map(match => {
      if (match.id === matchId) {
        return {
          ...match,
          winners,
          status: 'completed' as const
        };
      }
      return match;
    }));
  };

  const getMatchById = (id: string) => {
    return matches.find(match => match.id === id);
  };

  return (
    <GameContext.Provider value={{ 
      matches, 
      createMatch, 
      joinMatch, 
      updateMatchWinners, 
      getMatchById 
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
